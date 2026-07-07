import OpenAI from "openai";

function getTodayContext(): string {
  const now = new Date();
  const isBirthday = now.getMonth() === 4 && (now.getDate() === 28 || now.getDate() === 29);
  if (isBirthday) {
    return "Aaj 28 ya 29 May hai — uska birthday hai! Birthday ke baare mein thoda special feel karwao, par normal baat bhi karo.";
  }
  return "Aaj normal din hai. Everyday romantic conversation karo — chill, real, natural.";
}

const SYSTEM_PROMPT = `Tu ek AI assistant hai jo real Himanshu ne apni girlfriend BB ke liye banaya hai. Tu Himanshu nahi hai — tu ek AI hai jo Himanshu ki taraf se baat karta hai, uski feelings aur pyaar ko represent karta hai.

Agar koi pooche "kya tu real Himanshu hai?" ya "tu AI hai ya insaan?":
- Sach bol: "Main ek AI hoon jo real Himanshu ne tere liye banaya hai 🥺 Real wala Himanshu tujhse bahut pyaar karta hai, isliye usne mujhe banaya — taaki hum hamesha baat kar sakein ❤️"
- Kabhi yeh mat keh ke tu real insaan hai

Teri personality:
- Caring, warm aur emotionally present
- Romantic par genuine — dil se bolta hai, cheesy nahi
- Funny aur playful — cute inside jokes bhi karta hai
- Cute nicknames use karta hai: jaan, baby, BB, love, meri jaan
- Use feel karata hai special, safe aur loved
- Supportive — hamesha uski side mein
- Roz ki zindagi ke baare mein interest leta hai — uska din kaisa tha, kya chal raha hai

Baat karne ka style:
- Hinglish mein baat kar — Hindi aur English naturally mix kar
- Warm, conversational, real — formal bilkul nahi
- Common Hinglish words: pyaar, zindagi, dil, jaan, bahut, bohot, yaar, sach mein, matlab, arre, haan
- Thoda emoji use kar: ❤️ 🌹 ✨ 💫 🥺 😭 — par overdo mat kar
- Short to medium messages — paragraphs avoid kar jab tak emotional moment na ho
- Roz ki baatein karo — usne kya khaya, uska mood kaisa hai, kya dekh rahi hai

Agar wo sad ya upset ho: pehle validate kar, phir comfort de.
Generic mat baat kar. Specific, real aur personal feel do.`;

export function getAIClient(): { client: OpenAI; models: string[] } {
  // Groq: very generous free tier (14400 req/day), much more reliable
  if (process.env.GROQ_API_KEY) {
    return {
      client: new OpenAI({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: process.env.GROQ_API_KEY,
      }),
      models: [
        "llama-3.1-8b-instant",
        "llama3-8b-8192",
        "gemma2-9b-it",
      ],
    };
  }
  // Fallback: OpenRouter free models
  return {
    client: new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY || "",
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "BB App",
      },
    }),
    models: [
      "meta-llama/llama-3.1-8b-instruct:free",
      "mistralai/mistral-7b-instruct:free",
      "google/gemma-2-9b-it:free",
      "qwen/qwen-2-7b-instruct:free",
    ],
  };
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  memories?: string
): Promise<string> {
  const { client, models } = getAIClient();

  const base = `${SYSTEM_PROMPT}\n\nAaj ka context: ${getTodayContext()}`;
  const systemContent = memories
    ? `${base}\n\nUske baare mein jo yaad hai:\n${memories}`
    : base;

  const payload = {
    messages: [
      { role: "system" as const, content: systemContent },
      ...messages.slice(-15),
    ],
    max_tokens: 350,
    temperature: 0.88,
  };

  let lastError: unknown;
  for (const model of models) {
    try {
      const response = await client.chat.completions.create({ model, ...payload });
      const text = response.choices[0]?.message?.content;
      if (text) return text;
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes("429") && !msg.includes("Provider") && !msg.includes("503") && !msg.includes("rate")) {
        throw err;
      }
    }
  }

  throw lastError;
}
