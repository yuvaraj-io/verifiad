"use client";

import { Plus } from "lucide-react";
import { useState, DragEvent } from "react";

type VerificationValue = {
  file?: File;
  previewUrl?: string;
};

export default function CreatorStep2({
  value,
  onChange,
  onNext,
  onPrev,
}: {
  value: VerificationValue;
  onChange: (v: VerificationValue) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [attempted, setAttempted] = useState(false);

  const hasFile = !!value.file;
  const hasError = attempted && !hasFile;

  const handleFile = (file: File) => {
    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;

    onChange({ file, previewUrl });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleNext = () => {
    setAttempted(true);
    if (!hasFile) return;
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Upload */}
      <div>
        <label className="mb-2 block text-sm text-gray-600">
          Upload government ID (Image or PDF)
        </label>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`flex h-28 items-center justify-center rounded border-2 border-dashed cursor-pointer ${
            hasError
              ? "border-red-500"
              : "border-gray-400"
          }`}
          onClick={() =>
            document.getElementById("id-upload")?.click()
          }
        >
          <div className="flex flex-col items-center text-gray-600">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                hasError
                  ? "border-red-500 text-red-500"
                  : "border-purple-500 text-purple-500"
              }`}
            >
              <Plus size={20} />
            </div>
            <p className="mt-2 text-sm">
              Click or drag file here
            </p>
          </div>
        </div>

        <input
          id="id-upload"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFile(e.target.files[0])
          }
        />

        {hasError && (
          <p className="mt-2 text-sm text-red-500">
            Government ID is required
          </p>
        )}
      </div>

      {/* Preview */}
      {value.file && (
        <div className="rounded border p-4">
          <p className="mb-2 text-sm text-gray-600">
            Preview
          </p>

          {value.previewUrl ? (
            <img
              src={value.previewUrl}
              alt="ID preview"
              className="max-h-48 rounded"
            />
          ) : (
            <p className="text-sm text-gray-700">
              {value.file.name}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="rounded border border-gray-400 px-8 py-2 text-gray-700"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="rounded bg-purple-600 px-8 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
