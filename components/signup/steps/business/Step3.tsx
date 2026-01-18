"use client";

import { useMemo, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { BusinessVerification } from "../../SignupLayout";

type Errors = Partial<Record<keyof BusinessVerification, string>>;
type Touched = Partial<Record<keyof BusinessVerification, boolean>>;

export default function BusinessStep3({
  values,
  onChange,
  onNext,
  onPrev,
}: {
  values: BusinessVerification;
  onChange: (v: BusinessVerification) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Touched>({});

  /* ---------------- VALIDATION ---------------- */
  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
        values.gstNumber
      )
    ) {
      e.gstNumber = "Invalid GST number";
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(values.panNumber)) {
      e.panNumber = "Invalid PAN number";
    }

    if (!values.registrationCert) e.registrationCert = "Required";
    if (!values.addressProof) e.addressProof = "Required";
    if (!values.fssai) e.fssai = "Required";
    if (!values.ownerId) e.ownerId = "Required";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  /* ---------------- HELPERS ---------------- */
  const shouldShowError = (field: keyof BusinessVerification) =>
    attempted || touched[field];

  const handleBlur = (field: keyof BusinessVerification) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleFile = (
    field: keyof BusinessVerification,
    file?: File
  ) => {
    setTouched((t) => ({ ...t, [field]: true }));
    onChange({ ...values, [field]: file });
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
        {/* GST */}
        <Field
          label="GST Number"
          error={shouldShowError("gstNumber") && errors.gstNumber}
        >
          <input
            className="w-full rounded border px-4 py-3 uppercase"
            value={values.gstNumber}
            onChange={(e) =>
              onChange({
                ...values,
                gstNumber: e.target.value.toUpperCase(),
              })
            }
            onBlur={() => handleBlur("gstNumber")}
          />
        </Field>

        {/* PAN */}
        <Field
          label="PAN Number"
          error={shouldShowError("panNumber") && errors.panNumber}
        >
          <input
            className="w-full rounded border px-4 py-3 uppercase"
            value={values.panNumber}
            onChange={(e) =>
              onChange({
                ...values,
                panNumber: e.target.value.toUpperCase(),
              })
            }
            onBlur={() => handleBlur("panNumber")}
          />
        </Field>

        {/* Uploads */}
        <Upload
          label="Business Registration Certificate"
          file={values.registrationCert}
          error={shouldShowError("registrationCert") && errors.registrationCert}
          onFile={(f) => handleFile("registrationCert", f)}
        />

        <Upload
          label="Business Address Proof"
          file={values.addressProof}
          error={shouldShowError("addressProof") && errors.addressProof}
          onFile={(f) => handleFile("addressProof", f)}
        />

        <Upload
          label="FSSAI (for food)"
          file={values.fssai}
          error={shouldShowError("fssai") && errors.fssai}
          onFile={(f) => handleFile("fssai", f)}
        />

        <Upload
          label="Owner ID"
          file={values.ownerId}
          error={shouldShowError("ownerId") && errors.ownerId}
          onFile={(f) => handleFile("ownerId", f)}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-10">
        <button
          onClick={onPrev}
          className="rounded border px-10 py-3 text-gray-700"
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

/* ---------------- FIELD ---------------- */
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
      <label className="mb-2 block text-sm">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

/* ---------------- UPLOAD WITH PREVIEW ---------------- */
function Upload({
  label,
  file,
  error,
  onFile,
}: {
  label: string;
  file?: File;
  error?: string | false;
  onFile: (f?: File) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm">{label}</label>

      <label
        className={`flex h-20 cursor-pointer items-center justify-center gap-2 rounded border ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        {file ? (
          <>
            <FileText className="text-purple-600" size={18} />
            <span className="max-w-[140px] truncate text-sm">
              {file.name}
            </span>
          </>
        ) : (
          <Plus size={20} className="text-purple-600" />
        )}

        <input
          type="file"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
