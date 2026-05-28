"use client";

import { useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-20 right-4 z-40"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass rounded-2xl p-3 mb-2 min-w-[180px] shadow-card"
          >
            <p className="text-xs text-text-secondary mb-1">Now Playing</p>
            <p className="text-sm font-semibold text-white truncate">Perfect - Ed Sheeran</p>
            {playing && (
              <div className="music-bars mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="music-bar" />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setPlaying(!playing);
          setExpanded(true);
          setTimeout(() => setExpanded(false), 3000);
        }}
        className="w-12 h-12 rounded-full glass glow-pink flex items-center justify-center shadow-glow-pink"
      >
        {playing ? (
          <Pause size={18} className="text-rose-glow" />
        ) : (
          <Music2 size={18} className="text-rose-glow animate-bounce-soft" />
        )}
      </motion.button>
    </motion.div>
  );
}
