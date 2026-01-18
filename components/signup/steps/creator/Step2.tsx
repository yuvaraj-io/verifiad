"use client";

import { Plus } from "lucide-react";

export default function CreatorStep2({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Upload Government ID (UI only) */}
      <div>
        <label className="mb-2 block text-sm text-gray-600">
          Upload government ID
        </label>

        <div className="flex h-20 items-center justify-center rounded border border-gray-400">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-500">
            <Plus size={20} />
          </div>
        </div>
      </div>

      {/* Static Video Display */}
      <div>
        <div className="relative h-48 overflow-hidden rounded-lg">
          <img
            src="/assets/sample-proof.png"
            alt="Sample proof"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80">
              ▶
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 w-full rounded bg-gray-300">
          <div className="h-full w-1/3 rounded bg-yellow-400" />
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="rounded bg-purple-600 px-8 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
