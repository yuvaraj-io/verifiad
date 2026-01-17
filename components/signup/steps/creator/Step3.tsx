"use client";

export default function CreatorStep3({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Checklist */}
      <div className="space-y-6">
        <label className="flex items-start gap-4 text-gray-700">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I confirm that all content I upload is created by me
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I will clearly disclose if any content is paid, gifted, or sponsored
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I will not exaggerate, mislead, or hide conditions
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I understand that false or misleading proof can lead to permanent
            removal
          </span>
        </label>

        <label className="flex items-start gap-4 text-gray-700">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I accept that my real identity is accountable for my submissions
          </span>
        </label>
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
