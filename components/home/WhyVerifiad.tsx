import Image from "next/image";

const features = [
  {
    title: "100% Verified Advertisers",
    icon: "/assets/homepage/advertize.png",
  },
  {
    title: "Only True Product Information",
    icon: "/assets/homepage/community.png",
  },
  {
    title: "Community-Powered Ratings",
    icon: "/assets/homepage/verify.png",
  },
  {
    title: "Guaranteed Human Views",
    icon: "/assets/homepage/views.png",
  },
];

export default function WhyVerifiAd() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-medium text-gray-800">
          Why VerifiAd ?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          Today’s internet is full of fake promos, misleading offers, and scam ads.
          We are building a different world — where every ad is genuine and every
          business is verified.
        </p>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={64}
                height={64}
                className="object-contain"
              />

              <p className="mt-4 text-sm font-medium text-gray-700 text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
