"use client";

const colors = [
  "#F87171", // red
  "#FBBF24", // yellow
  "#60A5FA", // blue
  "#34D399", // green
  "#A78BFA", // purple
];

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 3;
        const size = 6 + Math.random() * 6;
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size * 1.8}px`,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}
