"use client";

export default function BusinessStep1({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Form */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {/* Business name */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business name
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Business name (second column as shown) */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business name
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Business type */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business type
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Business category */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Business Category
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Owner name */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Owner name
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
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
