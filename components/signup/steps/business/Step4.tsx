"use client";

export default function BusinessStep4({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Content */}
      <div className="space-y-12">
        {/* Phone number */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full rounded border border-gray-400 px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* OTP */}
        <div className="text-center">
          <p className="mb-6 text-sm font-medium text-gray-700">OTP</p>

          <div className="flex items-center justify-center gap-4">
            <input className="h-14 w-14 rounded border border-gray-400 text-center text-lg outline-none" />
            <span className="text-xl">–</span>
            <input className="h-14 w-14 rounded border border-gray-400 text-center text-lg outline-none" />
            <span className="text-xl">–</span>
            <input className="h-14 w-14 rounded border border-gray-400 text-center text-lg outline-none" />
            <span className="text-xl">–</span>
            <input className="h-14 w-14 rounded border border-gray-400 text-center text-lg outline-none" />
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
