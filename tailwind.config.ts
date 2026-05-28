import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core romantic dark palette
        "bg-primary": "#0a0a0f",
        "bg-secondary": "#111118",
        "bg-card": "#1a1a24",
        "bg-elevated": "#22222e",
        // Instagram-inspired gradient colors
        "insta-orange": "#F58529",
        "insta-pink": "#DD2A7B",
        "insta-purple": "#8134AF",
        // Romantic pink/purple palette
        "rose-glow": "#ff6b9d",
        "pink-soft": "#ff8fab",
        "purple-glow": "#c77dff",
        "purple-deep": "#7b2d8b",
        "lavender": "#e0aaff",
        // Text
        "text-primary": "#ffffff",
        "text-secondary": "#a8a8b3",
        "text-muted": "#6b6b7a",
        // Borders
        "border-subtle": "#2a2a38",
        "border-glass": "rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 30%, #1a0520 60%, #0a0a1a 100%)",
        "insta-gradient": "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)",
        "rose-gradient": "linear-gradient(135deg, #ff6b9d, #c77dff)",
        "card-gradient": "linear-gradient(135deg, rgba(255,107,157,0.1), rgba(199,125,255,0.1))",
        "glow-radial": "radial-gradient(ellipse at center, rgba(255,107,157,0.15) 0%, transparent 70%)",
        "hero-gradient": "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.8) 60%, rgba(10,10,15,1) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-delay": "float 4s ease-in-out infinite 1s",
        "float-delay2": "float 4s ease-in-out infinite 2s",
        "heart-rise": "heartRise 3s ease-in forwards",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "typing": "typing 1.2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "story-ring": "storyRing 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        heartRise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100vh) scale(0.5)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,107,157,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,107,157,0.6), 0 0 80px rgba(199,125,255,0.3)" },
        },
        typing: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        storyRing: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "glow-pink": "0 0 20px rgba(255,107,157,0.4), 0 0 60px rgba(255,107,157,0.1)",
        "glow-purple": "0 0 20px rgba(199,125,255,0.4), 0 0 60px rgba(199,125,255,0.1)",
        "glow-strong": "0 0 40px rgba(255,107,157,0.5), 0 0 80px rgba(199,125,255,0.3)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card": "0 4px 24px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        xs: "4px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
