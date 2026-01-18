"use client";

import { Plus } from "lucide-react";

export default function BusinessStep3({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Form */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {/* GST Number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            GST Number
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* PAN Number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            PAN number
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Business Registration Certificate */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business Registration Certificate
          </label>
          <div className="flex h-20 items-center justify-center rounded border border-gray-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-500">
              <Plus size={20} />
            </div>
          </div>
        </div>

        {/* Business address proof */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business address proof
          </label>
          <div className="flex h-20 items-center justify-center rounded border border-gray-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-500">
              <Plus size={20} />
            </div>
          </div>
        </div>

        {/* FSSAI */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            FSSAI (for food)
          </label>
          <div className="flex h-20 items-center justify-center rounded border border-gray-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-500">
              <Plus size={20} />
            </div>
          </div>
        </div>

        {/* Owner ID */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Owner ID
          </label>
          <div className="flex h-20 items-center justify-center rounded border border-gray-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-500">
              <Plus size={20} />
            </div>
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
