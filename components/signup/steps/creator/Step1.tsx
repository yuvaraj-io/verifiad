import { CreatorForm } from "../../SignupLayout";
import { useMemo, useState } from "react";

type Errors = {
  fullName?: string;
  location?: string;
  category?: string;
};

type Touched = {
  fullName?: boolean;
  location?: boolean;
  category?: boolean;
};

const PRIMARY_CONTENT_CATEGORIES = [
  "Digital & Online",
  "Business & Commerce",
  "Food & Lifestyle",
  "Fashion & Beauty",
  "Media & Entertainment",
  "Health & Fitness",
  "Professional Services",
  "Real Estate & Infrastructure",
  "Travel & Hospitality",
  "Gaming & Tech",
  "Education & Institutions",
  "Other",
];

export default function CreatorStep1({
  values,
  onChange,
  onNext,
}: {
  values: CreatorForm;
  onChange: (v: CreatorForm) => void;
  onNext: () => void;
}) {
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);

  /* ---------- VALIDATION ---------- */
  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (!values.fullName.trim()) {
      e.fullName = "Full name is required";
    } else if (values.fullName.trim().length < 2) {
      e.fullName = "Full name must be at least 2 characters";
    }

    if (!values.location.trim()) {
      e.location = "Address is required";
    }

    if (!values.category) {
      e.category = "Primary category is required";
    }

    return e;
  }, [values]);

  const showError = (field: keyof Errors) =>
    (touched[field] || submitted) && errors[field];

  const isValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    setSubmitted(true);
    if (!isValid) return;
    onNext();
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-4">
      {/* Full name */}
      <div>
        <input
          className={`w-full rounded border p-2 ${
            showError("fullName") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Full name"
          value={values.fullName}
          onChange={(e) =>
            onChange({ ...values, fullName: e.target.value })
          }
          onBlur={() =>
            setTouched((t) => ({ ...t, fullName: true }))
          }
        />
        {showError("fullName") && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <input
          className={`w-full rounded border p-2 ${
            showError("location") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Address"
          value={values.location}
          onChange={(e) =>
            onChange({ ...values, location: e.target.value })
          }
          onBlur={() =>
            setTouched((t) => ({ ...t, location: true }))
          }
        />
        {showError("location") && (
          <p className="mt-1 text-sm text-red-500">
            {errors.location}
          </p>
        )}
      </div>

      {/* Category dropdown */}
<div>
  <div className="relative">
    <select
      className={`w-full appearance-none rounded border bg-white px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 ${
        showError("category")
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
      }`}
      value={values.category}
      onChange={(e) =>
        onChange({ ...values, category: e.target.value })
      }
      onBlur={() =>
        setTouched((t) => ({ ...t, category: true }))
      }
    >
      <option value="" disabled className="text-gray-400">
        Select primary content category
      </option>

      {PRIMARY_CONTENT_CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Custom dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>

    {showError("category") && (
      <p className="mt-1 text-sm text-red-500">
        {errors.category}
      </p>
    )}
  </div>


      {/* Button */}
      <button
        onClick={handleNext}
        className="mt-4 w-full rounded bg-purple-600 py-2 text-white"
      >
        Next
      </button>
    </div>
  );
}
