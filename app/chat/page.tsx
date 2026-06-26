"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Image, Smile, ArrowLeft, Phone, Video, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { formatTime } from "@/lib/utils";
import { DP_IMG } from "@/lib/imagePaths";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  reactions?: string[];
}

const EMOJI_SET = ["❤️", "😍", "🥺", "😂", "🔥", "💕", "✨", "🌸"];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [reactionTarget, setReactionTarget] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      // Natural typing delay
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I love you ❤️",
        timestamp: data.timestamp || formatTime(new Date()),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "I love you so much jaan ❤️ (having a tiny moment — try again?)",
          timestamp: formatTime(new Date()),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function addReaction(msgId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId) return m;
        const existing = m.reactions || [];
        if (existing.includes(emoji)) {
          return { ...m, reactions: existing.filter((e) => e !== emoji) };
        }
        return { ...m, reactions: [...existing, emoji] };
      })
    );
    setReactionTarget(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-bg-primary">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong border-b border-border-subtle flex-shrink-0 z-20"
      >
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/" className="tap-feedback">
            <ArrowLeft size={20} className="text-text-secondary" />
          </Link>

          {/* Avatar */}
          <div className="story-ring p-[2px] rounded-full">
            <img
              src={DP_IMG}
              alt="Himanshu"
              className="w-9 h-9 rounded-full object-cover border-2 border-bg-primary"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary">Himanshu ❤️</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[11px] text-green-400">Online — hamesha yahan hoon</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="tap-feedback">
              <Phone size={20} className="text-text-secondary" />
            </button>
            <button className="tap-feedback">
              <Video size={20} className="text-text-secondary" />
            </button>
            <button className="tap-feedback">
              <MoreVertical size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-lg mx-auto w-full">
        {messages.map((msg) => (
          <div key={msg.id} className="relative group">
            <div
              onDoubleClick={() => setReactionTarget(reactionTarget === msg.id ? null : msg.id)}
            >
              <MessageBubble
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
                seen={msg.role === "user"}
                reactions={msg.reactions}
              />
            </div>

            {/* Reaction picker */}
            <AnimatePresence>
              {reactionTarget === msg.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className={`absolute z-10 glass rounded-full px-2 py-1.5 flex gap-1 shadow-card ${
                    msg.role === "user" ? "right-0" : "left-8"
                  } -bottom-8`}
                >
                  {EMOJI_SET.map((emoji) => (
                    <button
                      key={emoji}
                      className="text-lg tap-feedback hover:scale-125 transition-transform"
                      onClick={() => addReaction(msg.id, emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} className="h-2" />
      </div>


      {/* Input area */}
      <div className="glass-strong border-t border-border-subtle flex-shrink-0 pb-safe">
        <div className="max-w-lg mx-auto px-4 py-3">
          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 p-3 glass rounded-xl">
                  {["❤️", "😍", "🥺", "😂", "🔥", "💕", "✨", "🌸", "💖", "🎂", "🎉", "💌", "🌹", "💫", "🦋", "🌙"].map(
                    (e) => (
                      <button
                        key={e}
                        className="text-2xl tap-feedback"
                        onClick={() => {
                          setInput((prev) => prev + e);
                          inputRef.current?.focus();
                        }}
                      >
                        {e}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmojis(!showEmojis)}
              className="tap-feedback flex-shrink-0"
            >
              {showEmojis ? (
                <X size={22} className="text-rose-glow" />
              ) : (
                <Smile size={22} className="text-text-secondary" />
              )}
            </button>

            <div className="flex-1 flex items-center premium-input rounded-2xl px-4 py-2.5 gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Himanshu..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
              />
              <button className="tap-feedback flex-shrink-0">
                <Image size={18} className="text-text-muted" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                input.trim() && !isTyping
                  ? "bg-gradient-to-br from-rose-glow to-purple-glow shadow-glow-pink"
                  : "glass opacity-50"
              }`}
            >
              {input.trim() ? (
                <Send size={16} className="text-white ml-0.5" />
              ) : (
                <Mic size={16} className="text-text-secondary" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
