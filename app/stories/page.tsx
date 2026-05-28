"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface Story {
  id: number;
  label: string;
  emoji: string;
  color: string;
  slides: StorySlide[];
}

interface StorySlide {
  type: "text" | "quote" | "image";
  content: string;
  subtitle?: string;
  bg: string;
}

const STORIES: Story[] = [
  {
    id: 2,
    label: "Cute Moments",
    emoji: "💕",
    color: "from-purple-500 to-pink-500",
    slides: [
      {
        type: "quote",
        content: "The little things",
        subtitle: "That aren't little at all",
        bg: "linear-gradient(135deg, #0a0a2e 0%, #1a1060 100%)",
      },
      {
        type: "text",
        content: "The way you laugh with your whole body",
        subtitle: "Nothing in the world sounds better 🎵",
        bg: "linear-gradient(135deg, #1a0a40 0%, #2a1560 100%)",
      },
      {
        type: "text",
        content: "Those random 2am texts about absolutely nothing",
        subtitle: "Were always everything to me 🌙",
        bg: "linear-gradient(135deg, #200528 0%, #3a0a45 100%)",
      },
      {
        type: "text",
        content: "You stealing my hoodie and pretending you didn't",
        subtitle: "I noticed. I loved it. 🧡",
        bg: "linear-gradient(135deg, #250520 0%, #401035 100%)",
      },
    ],
  },
  {
    id: 3,
    label: "Future Dreams",
    emoji: "✨",
    color: "from-indigo-500 to-purple-600",
    slides: [
      {
        type: "quote",
        content: "Here's what I dream about",
        subtitle: "When I think about us",
        bg: "linear-gradient(135deg, #050a28 0%, #0d1545 100%)",
      },
      {
        type: "text",
        content: "Morning coffee, messy hair, soft music, and you",
        subtitle: "That's my perfect day ☕",
        bg: "linear-gradient(135deg, #0a0520 0%, #1a0a35 100%)",
      },
      {
        type: "text",
        content: "Road trips where we get completely lost",
        subtitle: "And somehow find the most beautiful places 🗺️",
        bg: "linear-gradient(135deg, #050a1a 0%, #0a1530 100%)",
      },
      {
        type: "text",
        content: "Watching you become everything you're meant to be",
        subtitle: "And being there for every chapter 📖",
        bg: "linear-gradient(135deg, #0a0528 0%, #150a40 100%)",
      },
    ],
  },
  {
    id: 4,
    label: "Secret Memories",
    emoji: "🔐",
    color: "from-rose-500 to-orange-500",
    slides: [
      {
        type: "quote",
        content: "Shhh... just us",
        subtitle: "Our little universe",
        bg: "linear-gradient(135deg, #280a0a 0%, #450f0f 100%)",
      },
      {
        type: "text",
        content: "That look you give me when you think I'm not watching",
        subtitle: "Baby, I'm always watching 👀❤️",
        bg: "linear-gradient(135deg, #280510 0%, #450a1e 100%)",
      },
      {
        type: "text",
        content: "The conversations that went until sunrise",
        subtitle: "I never wanted them to end 🌅",
        bg: "linear-gradient(135deg, #1e0510 0%, #38081e 100%)",
      },
      {
        type: "text",
        content: "The version of you nobody else gets to see",
        subtitle: "Is my absolute favorite version 🌸",
        bg: "linear-gradient(135deg, #250520 0%, #400a38 100%)",
      },
    ],
  },
  {
    id: 5,
    label: "Our Songs",
    emoji: "🎵",
    color: "from-blue-500 to-indigo-600",
    slides: [
      {
        type: "quote",
        content: "Every love story has a soundtrack",
        subtitle: "Ours is my favorite album",
        bg: "linear-gradient(135deg, #050a28 0%, #0a1445 100%)",
      },
      {
        type: "text",
        content: "Sitaare Ikkis",
        subtitle: "Yeh gaana sunke sirf tera chehra aata hai aankho ke saamne 🎶",
        bg: "linear-gradient(135deg, #080a30 0%, #101a50 100%)",
      },
      {
        type: "text",
        content: "Perfect — Ed Sheeran",
        subtitle: "Kyunki har line tere baare mein likhi lagti hai ✨",
        bg: "linear-gradient(135deg, #0a0528 0%, #1a1060 100%)",
      },
      {
        type: "text",
        content: "Tere Bina — AR Rahman",
        subtitle: "Kuch nahi hai tere bina... aur yeh sach mein kehta hoon 💕",
        bg: "linear-gradient(135deg, #0a0528 0%, #150a40 100%)",
      },
    ],
  },
];

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  function openStory(story: Story) {
    setActiveStory(story);
    setSlideIdx(0);
  }

  function nextSlide() {
    if (!activeStory) return;
    if (slideIdx < activeStory.slides.length - 1) {
      setSlideIdx((i) => i + 1);
    } else {
      closeStory();
    }
  }

  function prevSlide() {
    if (slideIdx > 0) setSlideIdx((i) => i - 1);
  }

  function closeStory() {
    setActiveStory(null);
    setSlideIdx(0);
  }

  return (
    <>
      {/* Story Viewer */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: activeStory.slides[slideIdx].bg }}
          >
            {/* Progress bars */}
            <div className="flex gap-1 px-4 pt-12 pb-4 z-10">
              {activeStory.slides.map((_, i) => (
                <div key={i} className="flex-1 story-progress">
                  <div
                    className="story-progress-fill"
                    style={{
                      animationDuration: i === slideIdx ? "5s" : "0s",
                      width: i < slideIdx ? "100%" : i === slideIdx ? undefined : "0%",
                    }}
                    onAnimationEnd={i === slideIdx ? nextSlide : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl glass">
                  {activeStory.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{activeStory.label}</p>
                  <p className="text-[11px] text-white/50">himanshu_official</p>
                </div>
              </div>
              <button onClick={closeStory} className="tap-feedback">
                <X size={22} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeStory.id}-${slideIdx}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col items-center justify-center px-8 text-center"
              >
                <div className="text-6xl mb-6">{activeStory.emoji}</div>
                <h2
                  className="font-display text-3xl font-bold italic text-white mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {activeStory.slides[slideIdx].content}
                </h2>
                {activeStory.slides[slideIdx].subtitle && (
                  <p className="text-white/70 text-base">
                    {activeStory.slides[slideIdx].subtitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom controls */}
            <div className="px-6 pb-12 flex items-center gap-4">
              <input
                className="flex-1 premium-input rounded-full px-4 py-2.5 text-sm text-white"
                placeholder="Send a reaction..."
                readOnly
              />
              <motion.button
                whileTap={{ scale: 1.3 }}
                onClick={() => {
                  const s = new Set(liked);
                  if (s.has(activeStory.id)) s.delete(activeStory.id);
                  else s.add(activeStory.id);
                  setLiked(s);
                }}
              >
                <Heart
                  size={28}
                  className={`transition-all ${
                    liked.has(activeStory.id) ? "text-rose-glow fill-rose-glow" : "text-white"
                  }`}
                />
              </motion.button>
            </div>

            {/* Tap areas */}
            <div className="absolute inset-0 flex" style={{ top: "120px" }}>
              <div className="flex-1" onClick={prevSlide} />
              <div className="flex-1" onClick={nextSlide} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <main className="min-h-screen pt-16 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-6 max-w-lg mx-auto"
        >
          <h1
            className="font-display text-3xl font-bold italic gradient-text mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Story Highlights
          </h1>
          <p className="text-text-secondary text-sm">Chapters of us ✨</p>
        </motion.div>

        {/* Stories grid */}
        <div className="max-w-lg mx-auto px-4">
          {/* Large featured story */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => openStory(STORIES[0])}
            className="w-full mb-4 rounded-3xl overflow-hidden relative aspect-[16/9] glass tap-feedback"
            style={{ background: "linear-gradient(135deg, #1a0528, #2d1040)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl mb-3">{STORIES[0].emoji}</div>
              <h3
                className="font-display text-2xl italic font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {STORIES[0].label}
              </h3>
              <p className="text-white/50 text-sm mt-1">{STORIES[0].slides.length} moments</p>
            </div>
            <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] text-white/70">
              Featured
            </div>
          </motion.button>

          {/* Grid of remaining stories */}
          <div className="grid grid-cols-2 gap-3">
            {STORIES.slice(1).map((story, i) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => openStory(story)}
                className="aspect-square rounded-2xl overflow-hidden relative glass tap-feedback flex flex-col items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #2a1a40)" }}
              >
                <span className="text-4xl">{story.emoji}</span>
                <span className="text-sm font-semibold text-white">{story.label}</span>
                <span className="text-[11px] text-text-muted">{story.slides.length} slides</span>

                {/* Animated ring */}
                <div
                  className="absolute inset-2 rounded-xl border opacity-20"
                  style={{
                    borderImage: "linear-gradient(45deg, #ff6b9d, #c77dff) 1",
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Stories row (horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 mb-4"
          >
            <h2 className="text-sm font-semibold text-text-secondary mb-3">All Highlights</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {STORIES.map((story) => (
                <button
                  key={story.id}
                  onClick={() => openStory(story)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 tap-feedback"
                >
                  <div className="story-ring p-[2.5px] rounded-full">
                    <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center text-2xl border-2 border-bg-primary">
                      {story.emoji}
                    </div>
                  </div>
                  <span className="text-[11px] text-text-secondary w-16 text-center truncate">
                    {story.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
