import CreatorStep1 from "./steps/creator/Step1";
// (other steps will follow same pattern)

import { CreatorForm, Role } from "./SignupLayout";

export default function StepRenderer({
  role,
  step,
  onNext,
  creatorForm,
  setCreatorForm,
}: {
  role: Role;
  step: number;
  onNext: () => void;
  creatorForm: CreatorForm;
  setCreatorForm: (v: CreatorForm) => void;
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
  }

  return <p className="text-gray-500">Step not implemented</p>;
}
