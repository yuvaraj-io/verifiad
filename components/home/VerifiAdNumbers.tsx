"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 112, label: "Proof based submissions" },
  { value: 234, label: "Verified claims submitted" },
  { value: 234, label: "Independent creators" },
  { value: 5000, label: "Business creators", suffix: "+" },
];

export default function VerifiAdNumbers() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect(); // ✅ trigger only once
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28"
    >
      {/* 🎉 Confetti plays only when visible */}
      {start && <Confetti />}

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-medium text-gray-700">
          VerifiAd in numbers
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          How fast we are growing
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item) => {
            const count = useCountUp(item.value, start);

            return (
              <div
                key={item.label}
                className="rounded-xl border border-gray-400 px-6 py-10"
              >
                <div className="text-5xl font-semibold text-[#6b5c7a]">
                  {count}
                  {item.suffix ?? ""}
                </div>
                <p className="mt-4 text-gray-600">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
