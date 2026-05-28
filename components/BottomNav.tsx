"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, BookHeart, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/stories", icon: Sparkles, label: "Stories" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/memories", icon: BookHeart, label: "Memories" },
  { href: "/secret", icon: Lock, label: "Secret" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed bottom-0 w-full z-50 glass-strong border-t border-border-subtle pb-safe"
    >
      <div className="max-w-lg mx-auto px-2 h-16 flex items-center justify-around">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="tap-feedback flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="relative">
                <Icon
                  size={22}
                  className={clsx(
                    "transition-all duration-200",
                    active
                      ? "text-rose-glow drop-shadow-[0_0_8px_rgba(255,107,157,0.8)]"
                      : "text-text-secondary"
                  )}
                  fill={active ? "currentColor" : "none"}
                />
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-glow"
                  />
                )}
              </div>
              <span
                className={clsx(
                  "text-[10px] font-medium transition-colors",
                  active ? "text-rose-glow" : "text-text-muted"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
