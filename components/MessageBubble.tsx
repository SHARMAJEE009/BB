"use client";

import { motion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import clsx from "clsx";
import { DP_IMG } from "@/lib/imagePaths";

interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
  seen?: boolean;
  reactions?: string[];
}

export default function MessageBubble({ content, role, timestamp, seen, reactions }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={clsx("flex items-end gap-2 max-w-[82%]", isUser ? "ml-auto flex-row-reverse" : "")}
    >
      {!isUser && (
        <img
          src={DP_IMG}
          alt="Himanshu"
          className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1 border border-border-subtle"
        />
      )}

      <div className={clsx("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div className={clsx(
          "relative px-4 py-2.5 rounded-2xl max-w-full",
          isUser
            ? "bg-gradient-to-br from-rose-glow to-purple-glow text-white rounded-br-sm shadow-glow-pink"
            : "bg-[#EFEFEF] text-text-primary rounded-bl-sm"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
        </div>

        {reactions && reactions.length > 0 && (
          <div className="flex gap-0.5 -mt-2">
            {reactions.map((r, i) => (
              <span key={i} className="text-sm bg-white rounded-full px-1 py-0.5 shadow-card border border-border-subtle">
                {r}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 px-1">
          {timestamp && <span className="text-[10px] text-text-muted">{timestamp}</span>}
          {isUser && seen !== undefined && (
            seen
              ? <CheckCheck size={12} className="text-rose-glow" />
              : <Check size={12} className="text-text-muted" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
