import Image from "next/image";

const ads = [
  {
    id: 1,
    brand: "Zomato",
    subtitle: "Zomato live",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ✈️",
    image: "/assets/burger.png",
    logo: "/assets/zomato.png",
  },
  {
    id: 2,
    brand: "Zomato",
    subtitle: "Zomato live",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ✈️",
    image: "/assets/burger.png",
    logo: "/assets/zomato.png",
  },
  {
    id: 3,
    brand: "Zomato",
    subtitle: "Zomato live",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ✈️",
    image: "/assets/burger.png",
    logo: "/assets/zomato.png",
  },
];

export default function VerifiedAds() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-4xl font-medium text-gray-700">
          See real Ads on verified ads
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Explore real, authentic ads published by verified and trusted advertisers.
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="overflow-hidden rounded-xl border border-gray-400 bg-white"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={ad.image}
                  alt="Ad image"
                  fill
                  className="object-cover"
                />

                {/* Verified badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
                  Verified
                  <span className="h-4 w-4 rounded-full bg-blue-500" />
                </div>
              </div>

              {/* Content */}
              <div className="flex gap-4 px-5 py-5">
                {/* Logo */}
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={ad.logo}
                    alt={`${ad.brand} logo`}
                    width={48}
                    height={48}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {ad.brand}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {ad.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-gray-600">
                    {ad.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
