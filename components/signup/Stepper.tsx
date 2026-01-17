export default function Stepper({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm text-gray-600">
        Step {step}/{total} &nbsp; Creator identity
      </p>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < step ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
