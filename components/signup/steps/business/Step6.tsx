"use client";

import { Check } from "lucide-react";

export default function BusinessThankYou({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Content */}
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-700">
            Thank you
          </h1>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
            <Check size={24} />
          </div>
        </div>

        <p className="max-w-xl text-gray-600 leading-relaxed">
          Your account has been submitted for verification. The verification
          process usually completes within one business day. Once verified, you
          will be able to use your account to publish ads.
        </p>
      </div>

      {/* Finish Button */}
      <div className="flex justify-end pt-10">
        <button
          onClick={onFinish}
          className="rounded bg-purple-600 px-10 py-3 text-white"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
