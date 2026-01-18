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

  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (!values.fullName.trim()) {
      e.fullName = "Full name is required";
    } else if (values.fullName.trim().length < 2) {
      e.fullName = "Full name must be at least 2 characters";
    }

    if (!values.location.trim()) {
      e.location = "Country & City is required";
    }

    if (!values.category.trim()) {
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

  return (
    <div className="space-y-4">
      {/* Full name */}
      <div>
        <input
          className={`w-full rounded border p-2 ${
            showError("fullName")
              ? "border-red-500"
              : "border-gray-300"
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
            showError("location")
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Country & City"
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

      {/* Category */}
      <div>
        <input
          className={`w-full rounded border p-2 ${
            showError("category")
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Primary content category"
          value={values.category}
          onChange={(e) =>
            onChange({ ...values, category: e.target.value })
          }
          onBlur={() =>
            setTouched((t) => ({ ...t, category: true }))
          }
        />
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
