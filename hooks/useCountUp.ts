"use client";

import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  start: boolean,
  duration = 1200
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      setValue(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return value;
}
