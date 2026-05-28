"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💕", "💖", "💗", "💓", "🌸", "✨", "💫"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(initial);

    const interval = setInterval(() => {
      setHearts((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = {
          ...next[idx],
          id: Date.now(),
          x: Math.random() * 100,
          duration: Math.random() * 8 + 6,
          delay: 0,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        };
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `heartRise ${heart.duration}s ease-in ${heart.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
