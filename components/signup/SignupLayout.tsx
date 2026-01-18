"use client";

import { useState } from "react";
import RoleToggle from "./RoleToggle";
import Stepper from "./Stepper";
import StepRenderer from "./StepRenderer";
import LeftPanel from "./LeftPanel";

export type Role = "creator" | "business";

export type CreatorForm = {
  fullName: string;
  location: string;
  category: string;
};

export default function SignupLayout() {
  const [role, setRole] = useState<Role>("creator");
  const [step, setStep] = useState(1);

  // 🔑 All creator data lives here
  const [creatorForm, setCreatorForm] = useState<CreatorForm>({
    fullName: "",
    location: "",
    category: "",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 px-6">
      <div className="grid min-h-[720px] w-full max-w-6xl grid-cols-[1fr_1.2fr]">
        {/* LEFT */}
        <LeftPanel role={role} />

        {/* RIGHT */}
        <div className="flex items-center rounded-3xl bg-white">
          <div className="w-full px-14 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-black px-4 py-2 text-sm text-white">
                Verifi<span className="text-purple-400">Ad.</span>
              </div>
              <h1 className="text-3xl font-semibold text-purple-500">
                Sign up
              </h1>
            </div>

            <RoleToggle
              role={role}
              onChange={(r) => {
                setRole(r);
                setStep(1);
              }}
            />

            <Stepper step={step} total={6} />

            <StepRenderer
              role={role}
              step={step}
              onNext={() => setStep((s) => s + 1)}
              creatorForm={creatorForm}
              setCreatorForm={setCreatorForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
