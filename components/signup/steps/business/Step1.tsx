"use client";

import { useMemo, useState } from "react";
import { BusinessForm } from "../../SignupLayout";

type Errors = Partial<Record<keyof BusinessForm, string>>;
type Touched = Partial<Record<keyof BusinessForm, boolean>>;

/* ---------- DROPDOWN DATA ---------- */
const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Private Limited",
  "Public Limited",
  "LLP",
  "Startup",
  "Freelancer",
];

const BUSINESS_CATEGORIES = [
  "Retail",
  "E-commerce",
  "Food & Beverage",
  "Healthcare",
  "Education",
  "Real Estate",
  "Finance",
  "Technology",
  "Marketing & Advertising",
  "Manufacturing",
  "Other",
];

export default function BusinessStep1({
  values,
  onChange,
  onNext,
}: {
  values: BusinessForm;
  onChange: (v: BusinessForm) => void;
  onNext: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Touched>({});

  /* ---------------- VALIDATION ---------------- */
  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    const min3 = (v: string) => v.trim().length >= 3;

    if (!min3(values.businessName))
      e.businessName = "Minimum 3 characters required";

    if (!values.businessType)
      e.businessType = "Business type is required";

    if (!values.category)
      e.category = "Business category is required";

    if (!min3(values.ownerName))
      e.ownerName = "Minimum 3 characters required";

    if (!/^[6-9][0-9]{9}$/.test(values.phone))
      e.phone = "Enter valid 10-digit mobile number";

    if (!values.website.trim()) {
      e.website = "Website is required";
    } else if (
      !/^https?:\/\/.+\..+/.test(values.website)
    ) {
      e.website = "Enter a valid website URL";
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  /* ---------------- HELPERS ---------------- */
  const shouldShowError = (field: keyof BusinessForm) =>
    attempted || touched[field];

  const inputClass = (field: keyof BusinessForm) =>
    `w-full rounded border px-4 py-3 text-sm outline-none ${
      shouldShowError(field) && errors[field]
        ? "border-red-500"
        : "border-gray-400 focus:border-purple-500"
    }`;

  const selectClass = (field: keyof BusinessForm) =>
    `w-full appearance-none rounded border bg-white px-4 py-3 pr-10 text-sm outline-none ${
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

  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {/* Business Name */}
        <Field
          label="Business name"
          error={shouldShowError("businessName") && errors.businessName}
        >
          <input
            className={inputClass("businessName")}
            value={values.businessName}
            onChange={(e) =>
              handleChange("businessName", e.target.value)
            }
            onBlur={() => handleBlur("businessName")}
          />
        </Field>

        {/* Website */}
        <Field
          label="Website"
          error={shouldShowError("website") && errors.website}
        >
          <input
            className={inputClass("website")}
            placeholder="https://example.com"
            value={values.website}
            onChange={(e) =>
              handleChange("website", e.target.value)
            }
            onBlur={() => handleBlur("website")}
          />
        </Field>

        {/* Business Type */}
        <Field
          label="Business type"
          error={shouldShowError("businessType") && errors.businessType}
        >
          <div className="relative">
            <select
              className={selectClass("businessType")}
              value={values.businessType}
              onChange={(e) =>
                handleChange("businessType", e.target.value)
              }
              onBlur={() => handleBlur("businessType")}
            >
              <option value="" disabled>
                Select business type
              </option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </Field>

        {/* Business Category */}
        <Field
          label="Business category"
          error={shouldShowError("category") && errors.category}
        >
          <div className="relative">
            <select
              className={selectClass("category")}
              value={values.category}
              onChange={(e) =>
                handleChange("category", e.target.value)
              }
              onBlur={() => handleBlur("category")}
            >
              <option value="" disabled>
                Select category
              </option>
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </Field>

        {/* Owner Name */}
        <Field
          label="Owner name"
          error={shouldShowError("ownerName") && errors.ownerName}
        >
          <input
            className={inputClass("ownerName")}
            value={values.ownerName}
            onChange={(e) =>
              handleChange("ownerName", e.target.value)
            }
            onBlur={() => handleBlur("ownerName")}
          />
        </Field>

        {/* Phone */}
        <Field
          label="Phone number"
          error={shouldShowError("phone") && errors.phone}
        >
          <input
            className={inputClass("phone")}
            value={values.phone}
            maxLength={10}
            onChange={(e) =>
              handleChange(
                "phone",
                e.target.value.replace(/\D/g, "")
              )
            }
            onBlur={() => handleBlur("phone")}
          />
        </Field>
      </div>

      {/* Next */}
      <div className="flex justify-end pt-10">
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

/* ---------------- FIELD WRAPPER ---------------- */
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
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
