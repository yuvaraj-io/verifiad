"use client";

const colors = [
  "#F87171",
  "#FBBF24",
  "#60A5FA",
  "#34D399",
  "#A78BFA",
];

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = i * 0.08; // 👈 gradual ramp-up
        const duration = 4 + Math.random() * 2;
        const size = 4 + (i / 30) * 10;
        const color =
          colors[Math.floor(Math.random() * colors.length)];

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
