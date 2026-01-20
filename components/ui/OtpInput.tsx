"use client";

import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
}: {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  disabled?: boolean;
}) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const otpArr = value.split("");
    otpArr[index] = val;
    const newOtp = otpArr.join("");
    onChange(newOtp);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pasted.length === 0) return;

    onChange(pasted.padEnd(length, ""));
    pasted.split("").forEach((_, i) => {
      inputsRef.current[i]?.focus();
    });
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-lg border text-center text-lg font-semibold outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 disabled:bg-gray-100"
        />
      ))}
    </div>
  );
}
