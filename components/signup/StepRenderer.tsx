import CreatorStep1 from "./steps/creator/Step1";
import CreatorStep2 from "./steps/creator/Step2";
import CreatorStep3 from "./steps/creator/Step3";
import CreatorStep4 from "./steps/creator/Step4";
import CreatorStep5 from "./steps/creator/Step5";
import CreatorStep6 from "./steps/creator/Step6";
import CreatorThankYou from "./steps/creator/ThankYou";
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
    if (step === 2) return <CreatorStep2 onNext={onNext} />;
    if (step === 3) return <CreatorStep3 onNext={onNext} />;
    if (step === 4) return <CreatorStep4 onNext={onNext} />;
    if (step === 5) return <CreatorStep5 onNext={onNext} />;
    if (step === 6) return <CreatorStep6 onVerify={onNext} />;
    if (step === 7) return <CreatorThankYou />;
  }

//   if (role === "business") {
//     if (step === 1) return <BusinessStep1 onNext={onNext} />;
//   }

  return <p>Step not implemented</p>;
}
