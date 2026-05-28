export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const ROMANTIC_GREETINGS = [
  "Hey jaan ❤️",
  "Hi love ✨",
  "Hey baby 🌸",
  "Hello, my favorite person 💕",
];

export function randomGreeting() {
  return ROMANTIC_GREETINGS[Math.floor(Math.random() * ROMANTIC_GREETINGS.length)];
}
