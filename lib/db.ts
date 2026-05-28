import { createClient } from "@libsql/client";

// Primary client (Turso) and fallback (in-memory)
let primaryDb: ReturnType<typeof createClient> | null = null;
let memoryDb: ReturnType<typeof createClient> | null = null;
let tursoFailed = false;

function getMemoryDb() {
  if (!memoryDb) {
    memoryDb = createClient({ url: ":memory:" });
  }
  return memoryDb;
}

function getDb() {
  if (tursoFailed) return getMemoryDb();

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    return getMemoryDb();
  }

  if (!primaryDb) {
    primaryDb = createClient({ url, authToken });
  }
  return primaryDb;
}

const CREATE_TABLES = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

let dbReady = false;

export async function initDb() {
  if (dbReady && !tursoFailed) return;

  try {
    const client = getDb();
    await client.executeMultiple(CREATE_TABLES);
    dbReady = true;
  } catch (err: unknown) {
    const isAuthError =
      tursoFailed ||
      (err instanceof Error && (err.message.includes("401") || err.message.includes("SERVER_ERROR")));

    if (isAuthError && !tursoFailed) {
      console.warn("⚠️  Turso auth failed — falling back to in-memory SQLite");
      tursoFailed = true;
      dbReady = false;
      primaryDb = null;
      // Retry with memory db
      const mem = getMemoryDb();
      await mem.executeMultiple(CREATE_TABLES);
      dbReady = true;
    } else {
      throw err;
    }
  }
}

async function safeExecute(
  sql: string,
  args: (string | number | null)[] = []
): Promise<ReturnType<ReturnType<typeof createClient>["execute"]>> {
  await initDb();
  try {
    return await getDb().execute({ sql, args });
  } catch (err: unknown) {
    const isAuthError =
      err instanceof Error &&
      (err.message.includes("401") || err.message.includes("SERVER_ERROR"));

    if (isAuthError && !tursoFailed) {
      console.warn("⚠️  Turso 401 — switching to in-memory SQLite");
      tursoFailed = true;
      dbReady = false;
      primaryDb = null;
      await initDb();
      return await getMemoryDb().execute({ sql, args });
    }
    throw err;
  }
}

export async function saveMessage(role: string, content: string, timestamp: string) {
  await safeExecute(
    "INSERT INTO messages (role, content, timestamp) VALUES (?, ?, ?)",
    [role, content, timestamp]
  );
}

export async function getRecentMessages(limit = 20) {
  const result = await safeExecute(
    "SELECT * FROM messages ORDER BY created_at DESC LIMIT ?",
    [limit]
  );
  return result.rows.reverse();
}

export async function saveMemory(key: string, value: string) {
  await safeExecute(
    `INSERT INTO memories (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [key, value]
  );
}

export async function getMemory(key: string) {
  const result = await safeExecute(
    "SELECT value FROM memories WHERE key = ?",
    [key]
  );
  return result.rows[0]?.value as string | null;
}

export async function getAllMemories() {
  const result = await safeExecute("SELECT key, value FROM memories");
  return result.rows;
}
