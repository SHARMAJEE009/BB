"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Send, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

interface Memory {
  id: number;
  title: string;
  caption: string;
  date: string;
  emoji: string;
  bg: string;
  likes: number;
  comments: Comment[];
  tag: string;
}

interface Comment {
  user: string;
  text: string;
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    title: "The Night Sky 🌟",
    caption:
      "Remember lying under the stars, talking about everything and nothing? You pointed at a star and said 'that one's ours.' And I believed you completely.",
    date: "A beautiful night",
    emoji: "🌙",
    bg: "linear-gradient(135deg, #050a28 0%, #0d1545 60%, #1a0a2e 100%)",
    likes: 847,
    tag: "Magical",
    comments: [
      { user: "himanshu", text: "I still look at that star every night 🌟" },
      { user: "you", text: "I know you do ❤️" },
    ],
  },
  {
    id: 2,
    title: "First Coffee Date ☕",
    caption:
      "Two hours turned into five. The coffee went cold but the conversation never did. You laughed at all my terrible jokes. That's when I was done for.",
    date: "The beginning of everything",
    emoji: "☕",
    bg: "linear-gradient(135deg, #200a10 0%, #400f20 60%, #280510 100%)",
    likes: 1203,
    tag: "First Times",
    comments: [
      { user: "himanshu", text: "Still my favorite afternoon of all time 💕" },
    ],
  },
  {
    id: 3,
    title: "Rain Dance 🌧️",
    caption:
      "We got caught in the rain and instead of running, you started dancing. In the middle of the street. I stood there watching you, completely in love.",
    date: "A rainy afternoon",
    emoji: "🌧️",
    bg: "linear-gradient(135deg, #0a1020 0%, #151e38 60%, #0d1528 100%)",
    likes: 692,
    tag: "Spontaneous",
    comments: [
      { user: "himanshu", text: "You looked like a movie scene I never wanted to end 🎬" },
      { user: "you", text: "You were just standing there like a statue 😂" },
      { user: "himanshu", text: "I was frozen in a good way 🥺" },
    ],
  },
  {
    id: 4,
    title: "Sunday Morning 🌅",
    caption:
      "Lazy morning, your voice still sleepy, telling me about a dream you had. Those are the moments I want to bottle up and keep forever.",
    date: "A slow, perfect Sunday",
    emoji: "🌅",
    bg: "linear-gradient(135deg, #280a05 0%, #451508 60%, #301005 100%)",
    likes: 1089,
    tag: "Everyday Magic",
    comments: [
      { user: "himanshu", text: "My favorite version of you is half-asleep you 😍" },
    ],
  },
  {
    id: 5,
    title: "Inside Jokes 😂",
    caption:
      "We have so many inside jokes that sometimes I laugh at nothing and have to explain myself. You're the funniest person I know and you don't even try.",
    date: "Always",
    emoji: "😂",
    bg: "linear-gradient(135deg, #1a0528 0%, #2d1545 60%, #1a0a30 100%)",
    likes: 2341,
    tag: "Just Us",
    comments: [
      { user: "you", text: "STOP 😭" },
      { user: "himanshu", text: "Never 🤣❤️" },
    ],
  },
  {
    id: 6,
    title: "Your Birthday Today 🎂",
    caption:
      "Today, on your birthday, I want you to know: you are the best thing that's ever happened to me. Every memory we make is my favorite one. Here's to a thousand more.",
    date: "Today — May 28",
    emoji: "🎂",
    bg: "linear-gradient(135deg, #2d0a20 0%, #4a1535 60%, #2d0a28 100%)",
    likes: 9999,
    tag: "Today ❤️",
    comments: [
      { user: "himanshu", text: "Happy Birthday, my everything ❤️🎂✨" },
    ],
  },
];

export default function MemoriesPage() {
  const [likes, setLikes] = useState<Record<number, boolean>>(
    Object.fromEntries(MEMORIES.map((m) => [m.id, m.id === 6]))
  );
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [openComments, setOpenComments] = useState<number | null>(null);

  const toggleLike = (id: number) =>
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleBookmark = (id: number) =>
    setBookmarks((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-20 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-6"
        >
          <h1
            className="font-display text-3xl font-bold italic gradient-text mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Memories
          </h1>
          <p className="text-text-secondary text-sm">A collection of beautiful moments 💕</p>
        </motion.div>

        {/* Filter tags */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto hide-scrollbar">
          {["All", "Magical", "First Times", "Just Us", "Today ❤️"].map((tag, i) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium tap-feedback transition-all ${
                i === 0
                  ? "bg-gradient-to-r from-rose-glow to-purple-glow text-white"
                  : "glass text-text-secondary border border-border-glass"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Memory posts */}
        <div className="space-y-0">
          {MEMORIES.map((memory, i) => (
            <motion.article
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="border-b border-border-subtle"
            >
              {/* Post header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="story-ring p-[2px] rounded-full">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 border-bg-primary"
                      style={{ background: memory.bg }}
                    >
                      {memory.emoji}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">himanshu_official</p>
                    <p className="text-[11px] text-text-muted">{memory.date}</p>
                  </div>
                </div>
                <span className="glass rounded-full px-2.5 py-1 text-[10px] text-text-secondary">
                  {memory.tag}
                </span>
              </div>

              {/* Visual card */}
              <div
                className="mx-4 rounded-2xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center px-6 text-center relative mb-3"
                style={{ background: memory.bg }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)",
                  }}
                />
                <div className="text-5xl mb-4 relative z-10">{memory.emoji}</div>
                <h3
                  className="font-display text-xl font-bold italic text-white relative z-10 mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {memory.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed relative z-10">
                  {memory.caption.slice(0, 80)}...
                </p>
              </div>

              {/* Actions */}
              <div className="px-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 1.4 }}
                      onClick={() => toggleLike(memory.id)}
                    >
                      <Heart
                        size={22}
                        className={`transition-all ${
                          likes[memory.id] ? "text-rose-glow fill-rose-glow" : "text-white"
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setOpenComments(openComments === memory.id ? null : memory.id)
                      }
                    >
                      <MessageCircle size={22} className="text-white" />
                    </motion.button>
                    <Link href="/chat">
                      <motion.button whileTap={{ scale: 0.9 }}>
                        <Send size={22} className="text-white" />
                      </motion.button>
                    </Link>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleBookmark(memory.id)}
                  >
                    <Bookmark
                      size={22}
                      className={`transition-all ${
                        bookmarks.has(memory.id) ? "text-white fill-white" : "text-white"
                      }`}
                    />
                  </motion.button>
                </div>

                <p className="text-sm font-semibold text-white mb-1">
                  {(memory.likes + (likes[memory.id] ? 1 : 0)).toLocaleString()} likes
                </p>

                <p className="text-sm text-white leading-relaxed">
                  <span className="font-semibold mr-1">himanshu_official</span>
                  {memory.caption}
                </p>

                {/* Comments toggle */}
                <button
                  onClick={() =>
                    setOpenComments(openComments === memory.id ? null : memory.id)
                  }
                  className="text-[12px] text-text-muted mt-1"
                >
                  View all {memory.comments.length} comments
                </button>

                {/* Comments section */}
                <AnimatePresence>
                  {openComments === memory.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-1.5 overflow-hidden"
                    >
                      {memory.comments.map((c, ci) => (
                        <p key={ci} className="text-sm text-white">
                          <span className="font-semibold mr-1">{c.user}</span>
                          {c.text}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-[11px] text-text-muted mt-1">{memory.date.toUpperCase()}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
