import { createClient } from "@libsql/client";

let db: ReturnType<typeof createClient> | null = null;

function getDb() {
  if (!db) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      // Fallback to in-memory SQLite for local dev without Turso
      db = createClient({ url: ":memory:" });
    } else {
      db = createClient({ url, authToken });
    }
  }
  return db;
}

export async function initDb() {
  const client = getDb();

  await client.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      item TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function saveMessage(role: string, content: string, timestamp: string) {
  const client = getDb();
  await initDb();
  await client.execute({
    sql: "INSERT INTO messages (role, content, timestamp) VALUES (?, ?, ?)",
    args: [role, content, timestamp],
  });
}

export async function getRecentMessages(limit = 20) {
  const client = getDb();
  await initDb();
  const result = await client.execute({
    sql: "SELECT * FROM messages ORDER BY created_at DESC LIMIT ?",
    args: [limit],
  });
  return result.rows.reverse();
}

export async function saveMemory(key: string, value: string) {
  const client = getDb();
  await initDb();
  await client.execute({
    sql: `INSERT INTO memories (key, value) VALUES (?, ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    args: [key, value],
  });
}

export async function getMemory(key: string) {
  const client = getDb();
  await initDb();
  const result = await client.execute({
    sql: "SELECT value FROM memories WHERE key = ?",
    args: [key],
  });
  return result.rows[0]?.value as string | null;
}

export async function getAllMemories() {
  const client = getDb();
  await initDb();
  const result = await client.execute("SELECT key, value FROM memories");
  return result.rows;
}
