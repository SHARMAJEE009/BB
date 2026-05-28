import { NextRequest, NextResponse } from "next/server";
import { saveMemory, getMemory, getAllMemories } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { key, value } = await req.json();
    if (!key || !value) {
      return NextResponse.json({ error: "Key and value required" }, { status: 400 });
    }
    await saveMemory(key, value);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Memory save error:", error);
    return NextResponse.json({ error: "Failed to save memory" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const value = await getMemory(key);
      return NextResponse.json({ value });
    }

    const memories = await getAllMemories();
    return NextResponse.json({ memories });
  } catch (error) {
    console.error("Memory get error:", error);
    return NextResponse.json({ memories: [] });
  }
}
