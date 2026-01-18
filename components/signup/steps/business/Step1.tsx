"use client";

import { useMemo, useState } from "react";
import { BusinessForm } from "../../SignupLayout";

type Errors = Partial<Record<keyof BusinessForm, string>>;
type Touched = Partial<Record<keyof BusinessForm, boolean>>;

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

  // ---------------- VALIDATION ----------------
  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    const min3 = (v: string) => v.trim().length >= 3;

    if (!min3(values.businessName))
      e.businessName = "Minimum 3 characters required";

    if (!min3(values.legalName))
      e.legalName = "Minimum 3 characters required";

    if (!min3(values.businessType))
      e.businessType = "Minimum 3 characters required";

    if (!min3(values.category))
      e.category = "Minimum 3 characters required";

    if (!min3(values.ownerName))
      e.ownerName = "Minimum 3 characters required";

    if (!/^[6-9][0-9]{9}$/.test(values.phone)) {
      e.phone = "Enter valid 10-digit mobile number";
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
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
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

        <Field
          label="Legal name"
          error={shouldShowError("legalName") && errors.legalName}
        >
          <input
            className={inputClass("legalName")}
            value={values.legalName}
            onChange={(e) =>
              handleChange("legalName", e.target.value)
            }
            onBlur={() => handleBlur("legalName")}
          />
        </Field>

        <Field
          label="Business type"
          error={shouldShowError("businessType") && errors.businessType}
        >
          <input
            className={inputClass("businessType")}
            value={values.businessType}
            onChange={(e) =>
              handleChange("businessType", e.target.value)
            }
            onBlur={() => handleBlur("businessType")}
          />
        </Field>

        <Field
          label="Business category"
          error={shouldShowError("category") && errors.category}
        >
          <input
            className={inputClass("category")}
            value={values.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            onBlur={() => handleBlur("category")}
          />
        </Field>

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
