"use client";

import Spinner from "./Spinner";

export default function LoaderOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-8 py-6 shadow-xl">
        <Spinner size={36} />
        <p className="text-sm text-gray-600">Please wait...</p>
      </div>
    </div>
  );
}
