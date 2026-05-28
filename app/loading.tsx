export default function Loading() {
  return (
    <div className="fixed inset-0 bg-bg-primary flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl heartbeat">❤️</div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-rose-glow"
              style={{ animation: `typing-bounce 1.4s ease-in-out infinite ${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
