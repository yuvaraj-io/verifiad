export default function CreatorStep1({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <input className="w-full rounded border p-2" placeholder="Full name" />
      <input className="w-full rounded border p-2" placeholder="Country & City" />
      <input className="w-full rounded border p-2" placeholder="Primary content category" />

      <button
        onClick={onNext}
        className="mt-4 w-full rounded bg-purple-600 py-2 text-white"
      >
        Next
      </button>
    </div>
  );
}
