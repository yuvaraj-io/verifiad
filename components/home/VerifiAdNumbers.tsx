import Confetti from "./Confetti";

const stats = [
  { value: "112", label: "Proof based submissions" },
  { value: "234", label: "Verified claims submitted" },
  { value: "234", label: "Independent creators" },
  { value: "5K+", label: "Business creators" },
];

export default function VerifiAdNumbers() {
  return (
    <section className="relative bg-white py-28">
      <Confetti />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-medium text-gray-700">
          VerifiAd in numbers
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          How fast we are growing
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-400 px-6 py-10"
            >
              <div className="text-5xl font-semibold text-[#6b5c7a]">
                {item.value}
              </div>
              <p className="mt-4 text-gray-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
