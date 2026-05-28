export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-glow to-purple-glow flex items-center justify-center text-xs font-bold flex-shrink-0">
        H
      </div>
      <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="typing-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
