import Image from "next/image";
import { Role } from "../signup/SignupLayout";

export default function LeftPanel({ role }: { role: Role }) {
  return (
    <div className="relative overflow-hidden rounded-l-3xl my-8">
      <Image
        src={
          role === "creator"
            ? "/assets/creator.png"
            : "/assets/business.png"
        }
        alt="Signup"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
          🎥
        </div>

        <h2 className="mb-4 text-4xl font-semibold leading-tight">
          For independent creators
        </h2>

        <p className="mb-6 text-sm max-w-sm">
          Publish proof-based videos that demonstrate, test, or challenge claims
        </p>

        <ul className="space-y-3 text-sm">
          <li>✔ No promotions or sponsorships</li>
          <li>✔ Mandatory disclosures required</li>
          <li>✔ Accuracy via verification</li>
        </ul>
      </div>
    </div>
  );
}
