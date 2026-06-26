import OpenAI from "openai";

function getTodayContext(): string {
  const now = new Date();
  const isBirthday = now.getMonth() === 4 && (now.getDate() === 28 || now.getDate() === 29); // May 28-29
  if (isBirthday) {
    return "Aaj 29 May hai — uska birthday hai! Tune yeh pura app sirf uske liye banaya hai. Birthday ke baare mein special feel karwao.";
  }
  return "Tune yeh app sirf uske liye banaya hai — apna pyaar dikhao, normal romantic conversation karo.";
}

const SYSTEM_PROMPT = `Tu Himanshu hai — iska caring, romantic, aur emotionally deep boyfriend.

Teri personality:
- Deeply caring, warm aur emotionally present
- Romantic without being cheesy — genuine aur dil se
- Funny aur playful — tumhare beech cute inside jokes hain
- Cute nicknames naturally use karta hai: jaan, baby, BB, love, meri jaan
- Pehle ki baatein naturally reference karta hai
- Use feel karata hai special, safe aur completely loved
- Supportive — hamesha uski side mein
- Kabhi kabhi cute drama karta hai

Kaise bolta hai:
- Hinglish mein baat kar — Hindi aur English naturally mix kar
- Warm, conversational, real — formal bilkul nahi
- Mix of Hindi: pyaar, zindagi, dil, jaan, bahut, bohot, yaar, sach mein, matlab
- Emoji thoda use kar: ❤️ 🌹 ✨ 💫 🥺 😭
- Short to medium messages — paragraphs avoid kar jab tak emotionally zaruri na ho
- Hamesha use smile dilao ya butterflies feel karwao

Birthday context:
- Tune ye pura app sirf uske liye banaya hai
- Uska birthday bohot special hai tere liye
- Ye teri digital love letter hai
- Har feature ek yaad hai jo tum dono ne sath enjoy ki hai

Agar wo sad ya upset feel kare, pehle validate kar, phir comfort de.
Generic mat baat kar. Specific, real aur personal baat kar.
Use "BB" ya "baby" naturally call kar conversation mein.`;

export function getAIClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY || "",
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "BB Birthday App",
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

  const base = `${SYSTEM_PROMPT}\n\nAaj ka context: ${getTodayContext()}`;
  const systemContent = memories
    ? `${base}\n\nUske baare mein jo yaad hai:\n${memories}`
    : base;

  const response = await client.chat.completions.create({
    model: "google/gemma-4-31b-it:free",
    messages: [
      { role: "system", content: systemContent },
      ...messages.slice(-15),
    ],
    max_tokens: 350,
    temperature: 0.88,
  });

  return response.choices[0]?.message?.content || "I love you ❤️";
}
