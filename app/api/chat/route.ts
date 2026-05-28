import { NextRequest, NextResponse } from "next/server";
import { generateResponse, type ChatMessage } from "@/lib/ai";
import { saveMessage, getRecentMessages, getAllMemories, saveMemory } from "@/lib/db";
import { formatTime } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const ts = formatTime(new Date());
    await saveMessage("user", message, ts);

    const memoryRows = await getAllMemories();
    const memorySummary = memoryRows
      .map((r) => `${r.key}: ${r.value}`)
      .join("\n");

    const recentMessages = await getRecentMessages(20);
    const chatHistory: ChatMessage[] = recentMessages.map((row) => ({
      role: row.role as "user" | "assistant",
      content: row.content as string,
    }));

    const aiReply = await generateResponse(chatHistory, memorySummary || undefined);

    const replyTs = formatTime(new Date());
    await saveMessage("assistant", aiReply, replyTs);

    // Extract memorable info
    if (
      message.toLowerCase().includes("my favorite") ||
      message.toLowerCase().includes("i love") ||
      message.toLowerCase().includes("i hate")
    ) {
      await saveMemory("memory_" + Date.now(), message.slice(0, 100));
    }

    return NextResponse.json({ reply: aiReply, timestamp: replyTs });
  } catch (error) {
    console.error("Chat API error:", error);
    // Fallback romantic response even on failure
    const fallbacks = [
      "Jaan, I love you more than you know ❤️ (tiny tech hiccup — try again?)",
      "You're on my mind constantly, baby 💕 (having a moment — send again?)",
      "Missing you so much right now ✨ (connection issue — try once more?)",
    ];
    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return NextResponse.json(
      { reply: fallback, timestamp: formatTime(new Date()) },
      { status: 200 }
    );
  }
}

export async function GET() {
  try {
    const messages = await getRecentMessages(30);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET chat error:", error);
    return NextResponse.json({ messages: [] });
  }
}
