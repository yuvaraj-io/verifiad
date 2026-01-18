"use client";

import { useMemo, useState } from "react";
import { Plus, FileText } from "lucide-react";

type BusinessLiveVerification = {
  placeImage?: File;
};

type Errors = {
  placeImage?: string;
};

type Touched = {
  placeImage?: boolean;
};

export default function BusinessStep5({
  value,
  onChange,
  onNext,
  onPrev,
}: {
  value: BusinessLiveVerification;
  onChange: (v: BusinessLiveVerification) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Touched>({});

  /* ---------------- VALIDATION ---------------- */
  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (!value.placeImage) {
      e.placeImage = "Business place capture is required";
    }
    return e;
  }, [value]);

  const isValid = Object.keys(errors).length === 0;

  /* ---------------- HELPERS ---------------- */
  const shouldShowError = attempted || touched.placeImage;

  const handleFile = (file?: File) => {
    onChange({ placeImage: file });
  };

  const handleNext = () => {
    setAttempted(true);
    if (!isValid) return;
    onNext();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        <label className="block text-sm text-gray-700">
          Show business place on camera (board or license visible)
        </label>

        {/* Upload / Capture */}
        <label
          className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded border ${
            shouldShowError && errors.placeImage
              ? "border-red-500"
              : "border-gray-400"
          }`}
          onBlur={() =>
            setTouched((t) => ({ ...t, placeImage: true }))
          }
        >
          {!value.placeImage ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500 text-purple-500">
                <Plus size={22} />
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Click to capture or upload image
              </p>
            </>
          ) : (
            <>
              <FileText
                size={36}
                className="text-purple-600"
              />
              <p className="mt-2 max-w-[90%] truncate text-sm text-gray-700">
                {value.placeImage.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Click to replace file
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={(e) =>
              handleFile(e.target.files?.[0])
            }
          />
        </label>

        {shouldShowError && errors.placeImage && (
          <p className="text-sm text-red-500">
            {errors.placeImage}
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
          submit
        </button>
      </div>
    </div>
  );
}
