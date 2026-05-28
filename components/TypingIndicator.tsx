import { DP_IMG } from "@/lib/imagePaths";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-1">
      <img
        src={DP_IMG}
        alt="Himanshu"
        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
      />
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
