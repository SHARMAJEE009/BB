import { NextRequest, NextResponse } from "next/server";
import { generateResponse, type ChatMessage } from "@/lib/ai";
import { saveMessage, getRecentMessages, getAllMemories, saveMemory } from "@/lib/db";
import { formatTime } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const ts = formatTime(new Date());

  // 1. Parse request
  let message: string;
  try {
    const body = await req.json();
    message = body.message?.trim();
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 2. Check API key is present
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY is not set");
    return NextResponse.json(
      { reply: "API key missing — please check Vercel environment variables.", timestamp: ts },
      { status: 200 }
    );
  }

  // 3. Save user message (DB errors won't crash the request)
  let chatHistory: ChatMessage[] = [];
  let memorySummary = "";
  try {
    await saveMessage("user", message, ts);
    const recentMessages = await getRecentMessages(20);
    chatHistory = recentMessages.map((row) => ({
      role: row.role as "user" | "assistant",
      content: row.content as string,
    }));
    const memoryRows = await getAllMemories();
    memorySummary = memoryRows.map((r) => `${r.key}: ${r.value}`).join("\n");
  } catch (dbErr) {
    // DB failure is non-fatal — proceed with empty history
    console.warn("DB error (non-fatal):", dbErr);
  }

  // 4. Call AI — this is the critical step
  let aiReply: string;
  try {
    aiReply = await generateResponse(chatHistory, memorySummary || undefined);
  } catch (aiErr) {
    console.error("OpenRouter AI error:", aiErr instanceof Error ? aiErr.message : aiErr);
    return NextResponse.json(
      { reply: "Jaan, ek second — dobara bhejo ❤️", timestamp: ts },
      { status: 200 }
    );
  }

  // 5. Save AI reply (non-fatal)
  const replyTs = formatTime(new Date());
  try {
    await saveMessage("assistant", aiReply, replyTs);
    if (
      message.toLowerCase().includes("my favorite") ||
      message.toLowerCase().includes("i love") ||
      message.toLowerCase().includes("mujhe pasand")
    ) {
      await saveMemory("memory_" + Date.now(), message.slice(0, 100));
    }
  } catch (dbErr) {
    console.warn("DB save error (non-fatal):", dbErr);
  }

  return NextResponse.json({ reply: aiReply, timestamp: replyTs });
}

export async function GET() {
  try {
    const messages = await getRecentMessages(30);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
