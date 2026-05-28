"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";

const SECRET_PASSWORD = "iloveyou";

const LETTER_CONTENT = [
  {
    paragraph:
      "My love,\n\nI've been trying to write this letter for weeks. Every time I started, it felt like the words weren't big enough — like no sentence could hold everything I feel.",
  },
  {
    paragraph:
      "You came into my life and rearranged everything, in the most beautiful way. The kind of way that makes you wonder how you ever existed before.",
  },
  {
    paragraph:
      "I love the way your face changes when you're excited about something. I love how you overthink things and then laugh at yourself for it. I love that you're both soft and incredibly strong.",
  },
  {
    paragraph:
      "I love that you make ordinary moments feel like the best scenes in a movie. That you can turn any bad day into something bearable just by being there.",
  },
  {
    paragraph:
      "On your birthday, I want you to know this: everything I've built, everything I dream about, every version of the future I imagine — you're in all of it.",
  },
  {
    paragraph:
      "Not because you're perfect. But because you're perfectly mine. And I'm completely, irrevocably, happily yours.",
  },
  {
    paragraph:
      "Happy Birthday, jaan. You deserve the world and then some.\n\nForever yours,\nHimanshu ❤️",
  },
];

export default function SecretPage() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function tryUnlock() {
    if (password.toLowerCase() === SECRET_PASSWORD) {
      setUnlocked(true);
      setError(false);
      // Reveal paragraphs one by one
      LETTER_CONTENT.forEach((_, i) => {
        setTimeout(() => {
          setRevealedParagraphs(i + 1);
        }, i * 800);
      });
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-romantic-gradient relative overflow-hidden">
      <FloatingHearts />

      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-full p-2.5 tap-feedback"
          >
            <ChevronLeft size={20} className="text-white" />
          </motion.button>
        </Link>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,107,157,0.12) 0%, transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          /* Lock Screen */
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={shaking ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Lock icon */}
              <motion.div
                animate={unlocked ? { scale: [1, 1.3, 1], rotate: [-20, 0] } : {}}
                className="mb-8"
              >
                <div className="w-24 h-24 rounded-full glass flex items-center justify-center glow-pink shadow-glow-pink">
                  <Lock size={40} className="text-rose-glow" />
                </div>
              </motion.div>

              <h1
                className="font-display text-3xl italic font-bold gradient-text mb-2 text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Secret Letter
              </h1>
              <p className="text-text-secondary text-sm text-center mb-8 max-w-xs">
                This letter was written only for you. Enter the password to unlock it 💌
              </p>

              {/* Password hint */}
              <div className="glass rounded-2xl px-4 py-2 mb-6 flex items-center gap-2">
                <Heart size={14} className="text-rose-glow" />
                <p className="text-[12px] text-text-secondary">
                  Hint: It&apos;s what I say to you every single day
                </p>
              </div>

              {/* Input */}
              <div className="w-full max-w-xs space-y-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                    placeholder="Enter password..."
                    className={`w-full premium-input rounded-2xl px-5 py-4 text-sm text-white pr-12 ${
                      error ? "border-red-500/50 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]" : ""
                    }`}
                    autoComplete="off"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted tap-feedback"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-red-400 text-center"
                    >
                      That&apos;s not it... (hint: 3 words, starts with &apos;i&apos;) 💭
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={tryUnlock}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-glow to-purple-glow text-white font-semibold shadow-glow-pink"
                >
                  Unlock Letter 💌
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Letter Content */
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen py-16 px-6 flex flex-col items-center"
          >
            {/* Unlock success animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-8 text-6xl"
            >
              💌
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl italic font-bold gradient-text mb-2 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              For Your Eyes Only
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px w-32 bg-gradient-to-r from-rose-glow to-purple-glow mb-10 origin-center"
            />

            {/* Letter */}
            <div className="max-w-sm w-full space-y-6">
              {LETTER_CONTENT.map((section, i) => (
                <AnimatePresence key={i}>
                  {i < revealedParagraphs && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.7,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                    >
                      <p
                        className="text-white/90 leading-8 text-[15px] whitespace-pre-line"
                        style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                      >
                        {section.paragraph}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* Seal */}
              {revealedParagraphs >= LETTER_CONTENT.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center gap-4 pt-6"
                >
                  <div className="text-5xl heartbeat">❤️</div>
                  <p className="text-text-muted text-xs text-center">
                    Sealed with love — Himanshu
                  </p>

                  <Link href="/chat">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 py-3 px-8 rounded-2xl bg-gradient-to-r from-rose-glow to-purple-glow text-white font-semibold text-sm shadow-glow-pink"
                    >
                      Reply to Himanshu 💬
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
