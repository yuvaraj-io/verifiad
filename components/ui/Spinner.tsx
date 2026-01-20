"use client";

export default function Spinner({
  size = 32,
  color = "border-purple-600",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
