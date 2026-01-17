import Image from "next/image";

export default function SuccessStories() {
  return (
    <section
      className="relative bg-cover bg-center py-32"
      style={{ 
        backgroundImage: "url('/assets/success-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-center text-4xl font-medium text-white">
          Our success stories
        </h2>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          <StoryCard />
          <StoryCard />
          <StoryCard showArrow />
        </div>
      </div>
    </section>
  );
}

function StoryCard({ showArrow = false }: { showArrow?: boolean }) {
  return (
    <div className="relative rounded-2xl bg-white px-6 py-6 shadow-md">
      {/* Content */}
      <p className="text-sm leading-relaxed text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      </p>

      <hr className="my-6" />

      {/* Author */}
      <div className="flex items-center gap-4">
        <Image
          src="/assets/user.png"
          alt="User"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div>
          <p className="font-semibold text-gray-800">Vijay</p>
          <p className="text-sm text-gray-500">
            Owner – Enchanto farm stay
          </p>
          <p className="text-sm text-gray-500">Mysore</p>
        </div>
      </div>

      {/* Arrow button */}
      {showArrow && (
        <button className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6b8f] text-white">
          →
        </button>
      )}
    </div>
  );
}
