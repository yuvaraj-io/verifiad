"use client";

import { useState } from "react";
import RoleToggle from "./RoleToggle";
import Stepper from "./Stepper";
import StepRenderer from "./StepRenderer";
import LeftPanel from "./LeftPanel";

export type Role = "creator" | "business";

export default function SignupLayout() {
  const [role, setRole] = useState<Role>("creator");
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 px-6">
      {/* ONE unified card */}
      <div className="grid min-h-[720px] w-full max-w-6xl grid-cols-[1fr_1.2fr]">
        {/* LEFT */}
          <LeftPanel role={role} />
        {/* RIGHT */}
        <div className="flex items-center bg-white rounded-3xl">
          <div className="w-full px-14 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-black px-4 py-2 text-white text-sm">
                Virifi<span className="text-purple-400">Ad.</span>
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
              onNext={() => setStep(step + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
