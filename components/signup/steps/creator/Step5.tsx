"use client";

import { useMemo, useState } from "react";
import { CreatorContact } from "../../SignupLayout";

type Errors = {
  email?: string;
  phone?: string;
};

export default function CreatorStep5({
  value,
  onChange,
  onNext,
  onPrev,
}: {
  value: CreatorContact;
  onChange: (v: CreatorContact) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [attempted, setAttempted] = useState(false);

  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    // Email validation
    if (!value.email.trim()) {
      e.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
    ) {
      e.email = "Enter a valid email address";
    }

    // Phone validation
    if (!value.phone.trim()) {
      e.phone = "Mobile number is required";
    } else if (!/^[6-9][0-9]{9}$/.test(value.phone)) {
      e.phone =
        "Mobile number must be 10 digits and start with 6–9";
    }

    return e;
  }, [value]);

  const isValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    setAttempted(true);
    if (!isValid) return;
    onNext();
  };

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Form */}
      <div className="space-y-10">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email address"
            value={value.email}
            onChange={(e) =>
              onChange({ ...value, email: e.target.value })
            }
            className={`w-full rounded border px-4 py-3 text-sm outline-none ${
              attempted && errors.email
                ? "border-red-500"
                : "border-gray-400 focus:border-purple-500"
            }`}
          />
          {attempted && errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Mobile number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Mobile number
          </label>
          <input
            type="tel"
            placeholder="Mobile number"
            value={value.phone}
            onChange={(e) =>
              onChange({
                ...value,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            maxLength={10}
            className={`w-full rounded border px-4 py-3 text-sm outline-none ${
              attempted && errors.phone
                ? "border-red-500"
                : "border-gray-400 focus:border-purple-500"
            }`}
          />
          {attempted && errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>
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
