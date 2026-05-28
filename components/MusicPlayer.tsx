"use client";

import { useState, useRef, useEffect } from "react";
import { Music2, Pause, Play, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SONG_SRC, SONG_TITLE, SONG_ARTIST } from "@/lib/imagePaths";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audio.loop = true;
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      setExpanded(true);
      setTimeout(() => setExpanded(false), 4000);
    }
    setPlaying(!playing);
  }

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
            className="glass rounded-2xl p-3 mb-2 min-w-[190px] shadow-card"
          >
            <div className="flex items-center gap-2 mb-1">
              <Volume2 size={12} className="text-rose-glow" />
              <p className="text-[10px] text-text-secondary uppercase tracking-wide">Now Playing</p>
            </div>
            <p className="text-sm font-semibold text-white truncate">{SONG_TITLE}</p>
            <p className="text-[11px] text-text-muted">{SONG_ARTIST}</p>
            {playing && (
              <>
                <div className="music-bars mt-2 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="music-bar" />
                  ))}
                </div>
                {/* Progress bar */}
                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-rose-glow to-purple-glow rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={togglePlay}
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
