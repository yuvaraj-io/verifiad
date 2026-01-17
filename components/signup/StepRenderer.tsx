import CreatorStep1 from "./steps/creator/Step1";
// import BusinessStep1 from "./steps/business/Step1";

export default function StepRenderer({
  role,
  step,
  onNext,
}: {
  role: "creator" | "business";
  step: number;
  onNext: () => void;
}) {
  if (role === "creator") {
    if (step === 1) return <CreatorStep1 onNext={onNext} />;
  }

//   if (role === "business") {
//     if (step === 1) return <BusinessStep1 onNext={onNext} />;
//   }

  return <p>Step not implemented</p>;
}
