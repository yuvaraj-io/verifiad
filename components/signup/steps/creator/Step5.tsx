"use client";

export default function CreatorStep5({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Form */}
      <div className="space-y-10">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        {/* Mobile number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Mobile number
          </label>
          <input
            type="tel"
            placeholder="Mobile number"
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
