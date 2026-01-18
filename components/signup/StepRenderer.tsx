import CreatorStep1 from "./steps/creator/Step1";
import CreatorStep2 from "./steps/creator/Step2";
import CreatorStep3 from "./steps/creator/Step3";
import CreatorStep4 from "./steps/creator/Step4";

import {
  CreatorForm,
  CreatorVerification,
  Role,
} from "./SignupLayout";

export default function StepRenderer({
  role,
  step,
  onNext,
  onPrev,
  creatorForm,
  setCreatorForm,
  creatorVerification,
  setCreatorVerification,
}: {
  role: Role;
  step: number;
  onNext: () => void;
  onPrev: () => void;
  creatorForm: CreatorForm;
  setCreatorForm: (v: CreatorForm) => void;
  creatorVerification: CreatorVerification;
  setCreatorVerification: (v: CreatorVerification) => void;
}) {
  if (role === "creator") {
    if (step === 1)
      return (
        <CreatorStep1
          values={creatorForm}
          onChange={setCreatorForm}
          onNext={onNext}
        />
      );

    if (step === 2)
      return (
        <CreatorStep2
          value={creatorVerification}
          onChange={setCreatorVerification}
          onNext={onNext}
          onPrev={onPrev}
        />
      );

    if (step === 3)
      return (
        <CreatorStep3
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    if (step === 4)
      return (
        <CreatorStep4
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    
  }

  return <p className="text-gray-500">Step not implemented</p>;
}
