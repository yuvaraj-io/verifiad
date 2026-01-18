"use client";

import { useMemo, useState } from "react";
import { BusinessForm } from "../../SignupLayout";

type Errors = Partial<Record<keyof BusinessForm, string>>;
type Touched = Partial<Record<keyof BusinessForm, boolean>>;

export default function BusinessStep2({
  values,
  onChange,
  onNext,
  onPrev,
}: {
  values: BusinessForm;
  onChange: (v: BusinessForm) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Touched>({});

  // ---------------- VALIDATION ----------------
  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    const min3 = (v: string) => v.trim().length >= 3;

    // Email
    if (!values.email.trim()) {
      e.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      e.email = "Invalid email address";
    }

    // Address
    if (!min3(values.address)) {
      e.address = "Minimum 3 characters required";
    }

    // Country
    if (!min3(values.country)) {
      e.country = "Minimum 3 characters required";
    }

    // Website (MANDATORY + FORMAT)
    if (!values.website.trim()) {
      e.website = "Website is required";
    } else if (
      !/^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(
        values.website
      )
    ) {
      e.website =
        "Enter a valid website (https://example.com)";
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  // ---------------- HELPERS ----------------
  const shouldShowError = (field: keyof BusinessForm) =>
    attempted || touched[field];

  const inputClass = (field: keyof BusinessForm) =>
    `w-full rounded border px-4 py-3 text-sm outline-none ${
      shouldShowError(field) && errors[field]
        ? "border-red-500"
        : "border-gray-400 focus:border-purple-500"
    }`;

  const handleChange = (
    field: keyof BusinessForm,
    value: string
  ) => {
    onChange({ ...values, [field]: value });
  };

  const handleBlur = (field: keyof BusinessForm) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleNext = () => {
    setAttempted(true);
    if (!isValid) return;
    onNext();
  };

  // ---------------- UI ----------------
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-8">
        <Field
          label="Email"
          error={shouldShowError("email") && errors.email}
        >
          <input
            type="email"
            className={inputClass("email")}
            value={values.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            onBlur={() => handleBlur("email")}
          />
        </Field>

        <Field
          label="Address"
          error={shouldShowError("address") && errors.address}
        >
          <input
            className={inputClass("address")}
            value={values.address}
            onChange={(e) =>
              handleChange("address", e.target.value)
            }
            onBlur={() => handleBlur("address")}
          />
        </Field>

        <Field
          label="Country"
          error={shouldShowError("country") && errors.country}
        >
          <input
            className={inputClass("country")}
            value={values.country}
            onChange={(e) =>
              handleChange("country", e.target.value)
            }
            onBlur={() => handleBlur("country")}
          />
        </Field>

        <Field
          label="Website"
          error={shouldShowError("website") && errors.website}
        >
          <input
            type="url"
            placeholder="https://example.com"
            className={inputClass("website")}
            value={values.website}
            onChange={(e) =>
              handleChange("website", e.target.value)
            }
            onBlur={() => handleBlur("website")}
          />
        </Field>
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

// ---------------- FIELD WRAPPER ----------------
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
