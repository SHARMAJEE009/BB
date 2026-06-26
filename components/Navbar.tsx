"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-border-subtle"
    >
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 tap-feedback">
          <Sparkles size={18} className="text-rose-glow animate-bounce-soft" />
          <span
            className="text-xl italic font-bold gradient-text"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Celebration
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/chat" className="tap-feedback">
            <div className="relative">
              <Send size={22} className="text-text-secondary hover:text-rose-glow transition-colors" />
              {pathname !== "/chat" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-glow rounded-full" />
              )}
            </div>
          </Link>
          <button className="tap-feedback">
            <Heart size={22} className="text-text-secondary hover:text-rose-glow transition-colors" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
