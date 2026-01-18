"use client";

import { useMemo, useState } from "react";
import { BusinessForm } from "../../SignupLayout";

type Errors = Partial<Record<keyof BusinessForm, string>>;

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

  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (!values.businessName.trim()) e.businessName = "Required";
    if (!values.legalName.trim()) e.legalName = "Required";
    if (!values.businessType.trim()) e.businessType = "Required";
    if (!values.category.trim()) e.category = "Required";
    if (!values.ownerName.trim()) e.ownerName = "Required";

    if (!/^[6-9][0-9]{9}$/.test(values.phone)) {
      e.phone = "Enter valid 10-digit mobile number";
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    setAttempted(true);
    if (!isValid) return;
    onNext();
  };

  const inputClass = (err?: string) =>
    `w-full rounded border px-4 py-3 text-sm outline-none ${
      attempted && err ? "border-red-500" : "border-gray-400 focus:border-purple-500"
    }`;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        <Field label="Business name" error={attempted && errors.businessName}>
          <input
            className={inputClass(errors.businessName)}
            value={values.businessName}
            onChange={(e) =>
              onChange({ ...values, businessName: e.target.value })
            }
          />
        </Field>

        <Field label="Legal name" error={attempted && errors.legalName}>
          <input
            className={inputClass(errors.legalName)}
            value={values.legalName}
            onChange={(e) =>
              onChange({ ...values, legalName: e.target.value })
            }
          />
        </Field>

        <Field label="Business type" error={attempted && errors.businessType}>
          <input
            className={inputClass(errors.businessType)}
            value={values.businessType}
            onChange={(e) =>
              onChange({ ...values, businessType: e.target.value })
            }
          />
        </Field>

        <Field label="Business category" error={attempted && errors.category}>
          <input
            className={inputClass(errors.category)}
            value={values.category}
            onChange={(e) =>
              onChange({ ...values, category: e.target.value })
            }
          />
        </Field>

        <Field label="Owner name" error={attempted && errors.ownerName}>
          <input
            className={inputClass(errors.ownerName)}
            value={values.ownerName}
            onChange={(e) =>
              onChange({ ...values, ownerName: e.target.value })
            }
          />
        </Field>

        <Field label="Phone number" error={attempted && errors.phone}>
          <input
            className={inputClass(errors.phone)}
            value={values.phone}
            maxLength={10}
            onChange={(e) =>
              onChange({
                ...values,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
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
      <label className="mb-2 block text-sm text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
