import CreatorStep1 from "./steps/creator/Step1";
import CreatorStep2 from "./steps/creator/Step2";
import CreatorStep3 from "./steps/creator/Step3";
import CreatorStep4 from "./steps/creator/Step4";
import CreatorStep5 from "./steps/creator/Step5";
import CreatorStep6 from "./steps/creator/Step6";
import CreatorThankYou from "./steps/creator/ThankYou";

import BusinessStep1 from "./steps/business/Step1";

import {
  CreatorForm,
  CreatorVerification,
  CreatorContact,
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
  creatorContact,
  setCreatorContact,
  finish,
}: {
  role: Role;
  step: number;
  onNext: () => void;
  onPrev: () => void;
  creatorForm: CreatorForm;
  setCreatorForm: (v: CreatorForm) => void;
  creatorVerification: CreatorVerification;
  setCreatorVerification: (v: CreatorVerification) => void;
  creatorContact: CreatorContact;
  setCreatorContact: (v: CreatorContact) => void;
  finish: () => void;
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

    if (step === 5)
      return (
        <CreatorStep5
          value={creatorContact}
          onChange={setCreatorContact}
          onNext={onNext}
          onPrev={onPrev}
        />
      );

      if (step === 6)
      return (
        <CreatorStep6
          contact={creatorContact}
          onVerified={onNext}
          onPrev={onPrev}
        />
      );
      if (step === 7)
      return (
        <CreatorThankYou
        onFinish={finish}
        />
      );
  }
  if(role === "business"){
    if(step === 1){
      return <BusinessStep1 onNext={onNext}/>
    }
  }

  return <p className="text-gray-500">Step not implemented</p>;
}
