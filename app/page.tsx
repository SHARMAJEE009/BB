"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart, MessageCircle, Sparkles, ChevronDown, Play, Volume2, VolumeX } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import MusicPlayer from "@/components/MusicPlayer";
import { HER_SOLO_PICS, WITH_ME_PICS, DP_IMG } from "@/lib/imagePaths";

const STORIES = [
  { id: 2, label: "Cute Moments", emoji: "💕", color: "from-purple-500 to-pink-500" },
  { id: 3, label: "Future Dreams", emoji: "✨", color: "from-indigo-500 to-purple-500" },
  { id: 4, label: "Secret Memories", emoji: "🔐", color: "from-rose-500 to-orange-400" },
  { id: 5, label: "Our Songs", emoji: "🎵", color: "from-blue-500 to-indigo-500" },
];

// May 29 check (month is 0-indexed, so May = 4)
function isBirthday() {
  const now = new Date();
  return now.getMonth() === 4 && (now.getDate() === 28 || now.getDate() === 29);
}

const BIRTHDAY_PHRASES = [
  "Happy Birthday, BB ❤️",
  "Aaj ka din sirf tera hai ✨",
  "Tu meri duniya hai 🌸",
  "Tujhse pyaar hai, hamesha 💕",
];

const NORMAL_PHRASES = [
  "Tu meri duniya hai 🌸",
  "Tujhse pyaar hai, hamesha 💕",
  "Har pal tera intezaar karta hoon ✨",
  "Sirf tera hoon, hamesha ❤️",
];

function useTypingAnimation(phrases: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}

const FEED_POSTS_BIRTHDAY = [
  {
    id: 1,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "Just now",
    image: WITH_ME_PICS[0],
    caption: "Aaj ke din se zyada khoobsurat koi din nahi — Happy Birthday jaan ❤️ 🎂",
    likes: "2,847",
    comments: "142",
    hearts: true,
  },
  {
    id: 2,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "2 hours ago",
    image: HER_SOLO_PICS[0],
    caption: "Duniya mein sabse sundar cheez kya hai? Tu. Happy Birthday BB 🌸✨",
    likes: "1,293",
    comments: "87",
    hearts: false,
  },
  {
    id: 3,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "4 hours ago",
    image: WITH_ME_PICS[1],
    caption: "Tere saath bita har pal meri sabse pyaari yaad hai 💕",
    likes: "987",
    comments: "54",
    hearts: false,
  },
];

const FEED_POSTS_NORMAL = [
  {
    id: 1,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "Just now",
    image: WITH_ME_PICS[0],
    caption: "Tere saath bita har pal meri sabse pyaari yaad hai 💕",
    likes: "2,847",
    comments: "142",
    hearts: true,
  },
  {
    id: 2,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "2 hours ago",
    image: HER_SOLO_PICS[0],
    caption: "Duniya mein sabse sundar cheez kya hai? Tu. Bas tu ❤️",
    likes: "1,293",
    comments: "87",
    hearts: false,
  },
  {
    id: 3,
    user: "himanshu_official",
    avatar: DP_IMG,
    time: "4 hours ago",
    image: WITH_ME_PICS[1],
    caption: "Sirf tujhse pyaar hai — yeh baat keh deta hoon baar baar 🌸",
    likes: "987",
    comments: "54",
    hearts: false,
  },
];

export default function HomePage() {
  const birthday = isBirthday();
  const FEED_POSTS = birthday ? FEED_POSTS_BIRTHDAY : FEED_POSTS_NORMAL;
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([1]));
  const [showWelcome, setShowWelcome] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const typedText = useTypingAnimation(birthday ? BIRTHDAY_PHRASES : NORMAL_PHRASES);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Welcome splash */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              className="text-8xl mb-6 heartbeat"
            >
              ❤️
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-3xl italic gradient-text text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {birthday ? "HAPPY Birthday BB ❤️" : "Sirf Tera Hoon ❤️"}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 2, ease: "linear" }}
              className="mt-8 h-0.5 w-48 bg-gradient-to-r from-rose-glow to-purple-glow origin-left rounded"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingHearts />
      <Navbar />

      <main className="min-h-screen pb-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={heroRef}>
          {/* Animated background */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-romantic-gradient" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,107,157,0.25) 0%, transparent 70%)",
              }}
            />
            {/* Bokeh orbs */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
                className="absolute rounded-full blur-3xl opacity-20"
                style={{
                  width: `${150 + i * 80}px`,
                  height: `${150 + i * 80}px`,
                  background: i % 2 === 0 ? "#ff6b9d" : "#c77dff",
                  left: `${10 + i * 18}%`,
                  top: `${10 + i * 15}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Date badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-full px-4 py-1.5 mb-6 flex items-center gap-2"
            >
              <Sparkles size={12} className="text-rose-glow" />
              <span className="text-xs text-text-secondary tracking-wider uppercase">
                Your Special Day
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-4"
            >
              <h1
                className="font-display text-6xl md:text-7xl font-bold italic leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {birthday ? (
                  <>
                    <span className="gradient-text">Happy</span>
                    <br />
                    <span className="text-white text-glow-pink">Birthday</span>
                    <br />
                    <span className="gradient-text">BABY ❤️</span>
                  </>
                ) : (
                  <>
                    <span className="gradient-text">Meri</span>
                    <br />
                    <span className="text-white text-glow-pink">Jaan</span>
                    <br />
                    <span className="gradient-text">BB ❤️</span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="h-8 mb-8"
            >
              <p className="text-text-secondary text-lg">
                {typedText}
                <span className="animate-pulse ml-0.5 text-rose-glow">|</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
            >
              <Link href="/chat" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm
                             bg-gradient-to-r from-rose-glow to-purple-glow text-white
                             shadow-glow-pink flex items-center justify-center gap-2
                             relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MessageCircle size={16} />
                  Chat with Himanshu ❤️
                </motion.button>
              </Link>
              <Link href="/memories" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm
                             glass border border-border-glass text-text-primary
                             flex items-center justify-center gap-2"
                >
                  <Heart size={16} className="text-rose-glow" />
                  Our Memories
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="text-[11px] text-text-muted tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={16} className="text-text-muted" />
            </motion.div>
          </motion.div>
        </section>

        {/* Stories Section */}
        <section className="py-6 border-b border-border-subtle">
          <div className="max-w-lg mx-auto">
            <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar">
              {STORIES.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                >
                  <Link href={`/stories?highlight=${story.id}`}>
                    <div className="story-ring p-[2.5px] rounded-full">
                      <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center text-2xl border-2 border-bg-primary tap-feedback">
                        {story.emoji}
                      </div>
                    </div>
                  </Link>
                  <span className="text-[11px] text-text-secondary text-center w-16 truncate">
                    {story.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feed Posts */}
        <section className="max-w-lg mx-auto">
          {FEED_POSTS.map((post, i) => (
            <FeedPost
              key={post.id}
              post={post}
              liked={likedPosts.has(post.id)}
              onLike={() => toggleLike(post.id)}
              delay={i * 0.1}
            />
          ))}

          {/* Special birthday card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-4 my-4 rounded-3xl overflow-hidden bg-card-gradient border border-border-glass"
          >
            <div
              className="relative p-8 flex flex-col items-center text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,157,0.15) 0%, rgba(199,125,255,0.15) 100%)",
              }}
            >
              <div className="text-5xl mb-4 animate-float">🎂</div>
              <h2
                className="font-display text-2xl italic font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Making a Wish?
              </h2>
              <p className="text-text-secondary text-sm mb-6 max-w-xs">
                Close your eyes, take a deep breath, and make a wish. I hope it comes true — you deserve every single thing you dream of.
              </p>
              <Link href="/secret">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-rose-glow to-purple-glow text-white font-semibold text-sm shadow-glow-pink"
                >
                  Open Secret Letter 💌
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <MusicPlayer />
      <BottomNav />
    </>
  );
}

function FeedPost({
  post,
  liked,
  onLike,
  delay,
}: {
  post: (typeof FEED_POSTS_NORMAL)[0];
  liked: boolean;
  onLike: () => void;
  delay: number;
}) {
  const [showReactions, setShowReactions] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const likeCount = parseInt(post.likes.replace(",", "")) + (liked ? 1 : 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="border-b border-border-subtle bg-bg-secondary/50"
    >
      {/* Post header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="story-ring p-[2px] rounded-full">
            <img
              src={post.avatar}
              alt="Himanshu"
              className="w-9 h-9 rounded-full object-cover border-2 border-bg-primary"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{post.user}</p>
            <p className="text-[11px] text-text-muted">{post.time}</p>
          </div>
        </div>
        <button className="text-text-secondary tap-feedback p-1">
          <span className="text-xl leading-none">···</span>
        </button>
      </div>

      {/* Post image */}
      <div className="relative aspect-square overflow-hidden bg-bg-card">
        <img
          src={post.image}
          alt="Memory"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Double tap heart overlay */}
        <motion.button
          className="absolute inset-0"
          onDoubleClick={onLike}
          aria-label="Double tap to like"
        />
      </div>

      {/* Actions */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 1.4 }}
              onClick={onLike}
              className="tap-feedback"
            >
              <Heart
                size={24}
                className={`transition-all duration-200 ${liked ? "text-rose-glow fill-rose-glow" : "text-white"}`}
              />
            </motion.button>
            <Link href="/chat">
              <motion.button whileTap={{ scale: 0.9 }} className="tap-feedback">
                <MessageCircle size={24} className="text-white" />
              </motion.button>
            </Link>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setBookmarked(!bookmarked)}
            className="tap-feedback"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={bookmarked ? "white" : "none"}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        </div>

        <p className="text-sm font-semibold text-white mb-1">
          {likeCount.toLocaleString()} likes
        </p>
        <p className="text-sm text-white">
          <span className="font-semibold mr-1">{post.user}</span>
          {post.caption}
        </p>
        <Link href="/chat">
          <p className="text-[12px] text-text-muted mt-1">View all {post.comments} comments</p>
        </Link>
      </div>
    </motion.article>
  );
}
