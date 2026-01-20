export default function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-[380px_1fr_1fr_1fr] gap-x-5 gap-y-14">
          {/* PHONE COLUMN */}
          <div className="row-span-3 flex flex-col items-center">
            {/* <div className="h-[720px] w-[360px] rounded-[44px] border-4 border-black bg-white" /> */}

            <img src="./assets/howWorks.png" />
            

            <div className="mt-4 flex gap-4 ">
              <p className="text-center text-gray-600">
                Download VirifiAd app now
              </p>
              <img src="/assets/icons/google_play.svg" />
              <img src="/assets/icons/app_store.svg" />
              <img />
            </div>
          </div>

          {/* STEP 1 */}
          <Step
            number="1"
            title="Create Your Business Account"
            description={
              <>
                Choose business type → <br />
                Complete KYC → Verify contact details
              </>
            }
          />

          {/* STEP 2 */}
          <Step
            number="2"
            title="Upload Your Ad"
            description="Add title, pricing, photos/videos, product description, and category."
          />

          {/* STEP 3 */}
          <Step
            number="3"
            title="Verification Begins"
            description="Our team checks product details, authenticity, and legal compliance."
          />

          {/* STEP 4 */}
          <Step
            number="4"
            title="Your Ad Goes Live"
            description="Appears in user feeds under relevant categories."
          />

          {/* STEP 5 */}
          <Step
            number="5"
            title="Track Engagement"
            description="See views, upvotes, comments, and audience insights in your dashboard."
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl border border-gray-400 bg-white px-6 py-6">
      {/* Number */}
      <div className="absolute -top-6 -left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#9b90b6] text-lg font-semibold text-white">
        {number}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}
