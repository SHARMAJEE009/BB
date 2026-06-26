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
        // Instagram light palette
        "bg-primary": "#FAFAFA",
        "bg-secondary": "#FFFFFF",
        "bg-card": "#FFFFFF",
        "bg-elevated": "#F3F3F3",
        // Romantic pink/purple accents (kept vibrant)
        "rose-glow": "#E1306C",
        "pink-soft": "#F9658A",
        "purple-glow": "#8134AF",
        "purple-deep": "#6A1A7A",
        "lavender": "#C77DFF",
        // Text — Instagram style
        "text-primary": "#262626",
        "text-secondary": "#737373",
        "text-muted": "#AEAEAE",
        // Borders — Instagram style
        "border-subtle": "#DBDBDB",
        "border-glass": "rgba(0,0,0,0.08)",
        // Insta gradient colors
        "insta-orange": "#F58529",
        "insta-pink": "#DD2A7B",
        "insta-purple": "#8134AF",
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(135deg, #FFF0F5 0%, #F8F0FF 50%, #FFF5F8 100%)",
        "insta-gradient": "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)",
        "rose-gradient": "linear-gradient(135deg, #E1306C, #8134AF)",
        "card-gradient": "linear-gradient(135deg, rgba(225,48,108,0.06), rgba(129,52,175,0.06))",
        "glow-radial": "radial-gradient(ellipse at center, rgba(225,48,108,0.08) 0%, transparent 70%)",
        "hero-gradient": "linear-gradient(180deg, rgba(250,240,245,0) 0%, rgba(250,240,245,0.6) 60%, rgba(250,240,245,1) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-delay": "float 4s ease-in-out infinite 1s",
        "heart-rise": "heartRise 3s ease-in forwards",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(225,48,108,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(225,48,108,0.4), 0 0 80px rgba(129,52,175,0.15)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-pink": "0 0 16px rgba(225,48,108,0.25)",
        "glow-purple": "0 0 16px rgba(129,52,175,0.25)",
        "glow-strong": "0 0 30px rgba(225,48,108,0.3), 0 0 60px rgba(129,52,175,0.15)",
        "glass": "0 2px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        "card": "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        "card-md": "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
