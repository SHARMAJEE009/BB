"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { HER_SOLO_PICS, WITH_ME_PICS } from "@/lib/imagePaths";

interface Memory {
  id: number;
  title: string;
  caption: string;
  date: string;
  emoji: string;
  bg: string;
  photo?: string;
  objectPosition?: string;
  likes: number;
  comments: Comment[];
  tag: string;
}

interface Comment {
  user: string;
  text: string;
}

// Resolved below after import — defined as a function to pick real photos
function buildMemories(herPics: string[], withMePics: string[]): Memory[] {
  return [
    {
      id: 1,
      title: "Meri Jaan 🌸",
      caption:
        "Teri yeh photo dekh ke dil garden garden ho jaata hai. Tu kitni sundar hai yaar — aur yeh sach mein kehta hoon, compliment nahi. 😍",
      date: "Hamesha",
      emoji: "🌸",
      bg: "linear-gradient(135deg, #1a0528 0%, #2d1040 60%, #1a0528 100%)",
      photo: herPics[0],
      objectPosition: "top",
      likes: 2847,
      tag: "My Favorite",
      comments: [
        { user: "himanshu", text: "Har photo mein tu aur bhi sundar lagti hai 😭❤️" },
        { user: "bb", text: "Shut up 🙈" },
        { user: "himanshu", text: "Never 🥺💕" },
      ],
    },
    {
      id: 2,
      title: "Humari Duniya 💕",
      caption:
        "Tere saath bita har pal meri sabse pyaari yaad hai. Is photo ko dekhta hoon toh sirf ek hi khayal aata hai — kitna pyaar karta hoon tujhse.",
      date: "Ek khoobsurat din",
      emoji: "💕",
      bg: "linear-gradient(135deg, #200a10 0%, #400f20 60%, #280510 100%)",
      photo: withMePics[0],
      likes: 1893,
      tag: "Us ❤️",
      comments: [
        { user: "himanshu", text: "Yeh wala moment mere dil ke bahut paas hai 🌹" },
      ],
    },
    {
      id: 3,
      title: "Tu Aur Main 🌙",
      caption:
        "Kuch log zindagi mein aate hain aur sab kuch badal dete hain — tu mere liye wahi hai. Tere saath wali yeh photo dekh ke smile aata hai automatically.",
      date: "Ek yaadgaar raat",
      emoji: "🌙",
      bg: "linear-gradient(135deg, #050a28 0%, #0d1545 60%, #1a0a2e 100%)",
      photo: withMePics[1],
      likes: 1204,
      tag: "Magical",
      comments: [
        { user: "himanshu", text: "Tere saath toh raat bhi subah jaisi lagti hai ✨" },
        { user: "bb", text: "Uff yaar 🥺" },
      ],
    },
    {
      id: 4,
      title: "Teri Muskaan 😊",
      caption:
        "Teri yeh smile — teri natural, unfiltered wali smile — duniya ki sabse pyaari cheez hai mere liye. Koi bhi badal nahi sakta isko.",
      date: "Ek random afternoon",
      emoji: "☀️",
      bg: "linear-gradient(135deg, #280a05 0%, #451508 60%, #301005 100%)",
      photo: herPics[2],
      likes: 3102,
      tag: "My Sunshine",
      comments: [
        { user: "himanshu", text: "Yahi wali smile ke liye jeeta hoon 😍" },
      ],
    },
    {
      id: 5,
      title: "Sirf Teri Teri 💫",
      caption:
        "Sach kehta hoon — main tujhe dekh ke bhool jaata hoon ke duniya mein aur bhi kuch hai. Sirf tu. Sirf tera chehra. Sirf tujhse pyaar.",
      date: "Hamesha se, hamesha tak",
      emoji: "💫",
      bg: "linear-gradient(135deg, #1a0528 0%, #2d1545 60%, #1a0a30 100%)",
      photo: herPics[4],
      objectPosition: "top",
      likes: 4721,
      tag: "Just Us",
      comments: [
        { user: "bb", text: "Main ro dungi sach mein 😭" },
        { user: "himanshu", text: "Rona mat — yeh toh sirf sach hai 🥺❤️" },
      ],
    },
    {
      id: 6,
      title: "Happy Birthday BABY 🎂",
      caption:
        "Aaj tere birthday par sirf yeh kehna chahta hoon — tu meri zindagi ki sabse khoobsurat cheez hai. Har yaad meri favorite hai. Yahan hoon, hamesha ❤️",
      date: "Aaj — 28 May",
      emoji: "🎂",
      bg: "linear-gradient(135deg, #2d0a20 0%, #4a1535 60%, #2d0a28 100%)",
      photo: withMePics[2] || herPics[1],
      likes: 9999,
      tag: "Today ❤️",
      comments: [
        { user: "himanshu", text: "Happy Birthday jaan, meri puri duniya ❤️🎂✨" },
      ],
    },
  ];
}

export default function MemoriesPage() {
  const MEMORIES = buildMemories(HER_SOLO_PICS, WITH_ME_PICS);
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
              <div className="mx-4 rounded-2xl overflow-hidden aspect-[4/3] relative mb-3">
                {memory.photo ? (
                  <img
                    src={memory.photo}
                    alt={memory.title}
                    className={`w-full h-full object-cover ${memory.objectPosition === "top" ? "object-top" : ""}`}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center px-6 text-center"
                    style={{ background: memory.bg }}
                  >
                    <div className="text-5xl mb-4">{memory.emoji}</div>
                    <h3
                      className="font-display text-xl font-bold italic text-white mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {memory.title}
                    </h3>
                    <p className="text-white/70 text-sm">{memory.caption.slice(0, 80)}...</p>
                  </div>
                )}
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
