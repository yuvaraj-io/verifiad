"use client";

import { useState } from "react";

export default function CreatorStep3({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [checks, setChecks] = useState({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
  });

  const [attempted, setAttempted] = useState(false);

  const allChecked = Object.values(checks).every(Boolean);
  const showError = attempted && !allChecked;

  const handleNext = () => {
    setAttempted(true);
    if (!allChecked) return;
    onNext();
  };

  const toggle = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Checklist */}
      <div className="space-y-6">
        <label className="flex items-start gap-4 text-gray-700">
          <input
            type="checkbox"
            checked={checks.c1}
            onChange={() => toggle("c1")}
            className="mt-1 h-4 w-4"
          />
          <span>
            I confirm that all content I upload is created by me
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input
            type="checkbox"
            checked={checks.c2}
            onChange={() => toggle("c2")}
            className="mt-1 h-4 w-4"
          />
          <span>
            I will clearly disclose if any content is paid, gifted, or sponsored
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input
            type="checkbox"
            checked={checks.c3}
            onChange={() => toggle("c3")}
            className="mt-1 h-4 w-4"
          />
          <span>
            I will not exaggerate, mislead, or hide conditions
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input
            type="checkbox"
            checked={checks.c4}
            onChange={() => toggle("c4")}
            className="mt-1 h-4 w-4"
          />
          <span>
            I understand that false or misleading proof can lead to permanent
            removal
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input
            type="checkbox"
            checked={checks.c5}
            onChange={() => toggle("c5")}
            className="mt-1 h-4 w-4"
          />
          <span>
            I accept that my real identity is accountable for my submissions
          </span>
        </label>

        {showError && (
          <p className="text-sm text-red-500">
            You must accept all confirmations to proceed
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-10">
        <button
          onClick={onPrev}
          className="rounded border border-gray-400 px-10 py-3 text-gray-700"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="rounded bg-purple-600 px-10 py-3 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
