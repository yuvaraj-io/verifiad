"use client";

import { Plus } from "lucide-react";

export default function BusinessStep5({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Content */}
      <div className="space-y-4">
        <label className="block text-sm text-gray-700">
          Show business place on camera (Business board or license visible)
        </label>

        <div className="flex h-48 items-center justify-center rounded border border-gray-400">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500 text-purple-500">
            <Plus size={22} />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-10">
        <button
          onClick={onNext}
          className="rounded bg-purple-600 px-10 py-3 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
