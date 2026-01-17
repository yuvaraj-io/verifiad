"use client";

export default function CreatorStep4({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Content */}
      <div className="space-y-8">
        <p className="text-lg font-semibold text-black">
          Violations may result in -
        </p>

        <ul className="space-y-6 pl-2 text-gray-700">
          <li className="flex items-start gap-4">
            <span className="mt-2 h-2 w-2 rounded-full bg-black" />
            <span>Loss of verifier reputation</span>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-2 h-2 w-2 rounded-full bg-black" />
            <span>Content removal</span>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-2 h-2 w-2 rounded-full bg-black" />
            <span>Account suspension or ban</span>
          </li>
        </ul>
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
