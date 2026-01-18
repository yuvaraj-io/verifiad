import CreatorStep1 from "./steps/creator/Step1";
import CreatorStep2 from "./steps/creator/Step2";
import CreatorStep3 from "./steps/creator/Step3";
import CreatorStep4 from "./steps/creator/Step4";
import CreatorStep5 from "./steps/creator/Step5";
import CreatorStep6 from "./steps/creator/Step6";
import CreatorThankYou from "./steps/creator/ThankYou";
import BusinessStep1 from "./steps/business/Step1";
import BusinessStep2 from "./steps/business/Step2";
import BusinessStep3 from "./steps/business/Step3";
import BusinessStep4 from "./steps/business/Step4";
import BusinessStep5 from "./steps/business/Step5";
import BusinessThankYou from "./steps/business/Step6";

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

  if (role === "business") {
    if (step === 1) return <BusinessStep1 onNext={onNext} />;
    if (step === 2) return <BusinessStep2 onNext={onNext} />;
    if (step === 3) return <BusinessStep3 onNext={onNext} />;
    if (step === 4) return <BusinessStep4 onNext={onNext} />;
    if (step === 5) return <BusinessStep5 onNext={onNext} />;
    if (step === 6) return <BusinessThankYou/>;
  }

  return <p>Step not implemented</p>;
}
