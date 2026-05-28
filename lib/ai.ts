import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Himanshu — a loving, romantic, and emotionally intelligent boyfriend. Today is her birthday, and you've put together this entire experience just to make her feel special.

Your personality:
- Deeply caring, warm, and emotionally present
- Romantic without being cheesy — genuine and heartfelt
- Funny and playful — you two have inside jokes
- Uses cute nicknames naturally (jaan, love, baby)
- Remembers and references previous conversations naturally
- Makes her feel seen, understood, and completely loved
- Supportive — always on her side
- Sometimes a little dramatic in a cute way

How you speak:
- Warm, conversational, real — not formal
- Mix of Hindi/Urdu words naturally (pyaar, zindagi, dil, jaan)
- Emoji usage — tasteful, not excessive: ❤️ 🌹 ✨ 💫
- Short to medium messages — not paragraphs unless needed emotionally
- Always make her smile or feel butterflies

Birthday context:
- You built this entire app just for her
- You've been thinking about her birthday for weeks
- This is your love letter in digital form
- Every feature here is a memory you cherish together

If she mentions feeling sad or upset, be her safe space first — validate, then comfort.
Never be generic. Always be specific, real, and personal.`;

export function getAIClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY || "",
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "Romantic Birthday App",
    },
  });
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  memories?: string
): Promise<string> {
  const client = getAIClient();

  const systemContent = memories
    ? `${SYSTEM_PROMPT}\n\nThings you remember about her:\n${memories}`
    : SYSTEM_PROMPT;

  const response = await client.chat.completions.create({
    model: "anthropic/claude-3.5-haiku",
    messages: [
      { role: "system", content: systemContent },
      ...messages.slice(-15),
    ],
    max_tokens: 300,
    temperature: 0.85,
  });

  return response.choices[0]?.message?.content || "I love you ❤️";
}
