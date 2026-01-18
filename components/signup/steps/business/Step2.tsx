"use client";

export default function BusinessStep2({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Form */}
      <div className="space-y-8">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Address
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Country
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Website */}
        <div className="max-w-md">
          <label className="mb-2 block text-sm text-gray-700">
            Website
          </label>
          <input
            type="url"
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
