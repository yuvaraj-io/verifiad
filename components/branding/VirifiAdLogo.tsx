"use client";

import clsx from "clsx";
import { Red_Rose } from "next/font/google";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

type LogoProps = {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

export default function VirifiAdLogo({
  size = "sm",
  className,
}: LogoProps) {
  const sizeConfig = {
    xs:{ text: "text-2xl", padding: "px-2 py-1", width: "w-[120px]" },
    sm: { text: "text-3xl", padding: "px-4 py-2", width: "w-[180px]" },
    md: { text: "text-5xl", padding: "px-6 py-3", width: "w-[260px]" },
    lg: { text: "text-7xl", padding: "px-8 py-4", width: "w-[360px]" },
  };

  const { text, padding, width } = sizeConfig[size];

  return (
    <div
      className={clsx(
        "bg-black flex items-center justify-center",
        width,
        padding,
        className
      )}
    >
      <h1
        className={clsx(
          redRose.className,
          "font-semibold tracking-tight leading-none"
        )}
      >
        <span className={clsx("text-white", text)}>Virifi</span>
        <span className={clsx("text-[#7A6A8F]", text)}>Ad.</span>
      </h1>
    </div>
  );
}
