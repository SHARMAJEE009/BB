import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">💔</div>
      <h1 className="font-display text-3xl italic gradient-text font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}>
        Lost in Love
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        This page doesn&apos;t exist — but our love does ❤️
      </p>
      <Link href="/">
        <button className="py-3 px-8 rounded-2xl bg-gradient-to-r from-rose-glow to-purple-glow text-white font-semibold text-sm shadow-glow-pink">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
