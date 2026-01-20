"use client";

import VirifiAdLogo from "../branding/VirifiAdLogo";
import LeftPanel from "./LeftPanel";
import RoleToggle from "./RoleToggle";

type Props = {
  role: "creator" | "business";
  setRole?: (r: "creator" | "business") => void;
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  role,
  setRole,
  title,
  children,
}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid min-h-[720px] w-full grid-cols-[1fr_1.2fr]">
        <LeftPanel role={role} />

        <div className="flex items-center rounded-3xl bg-white">
          <div className="w-full px-14 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <VirifiAdLogo />
              <h1 className="text-3xl font-semibold text-purple-500">
                {title}
              </h1>
            </div>

            {/* Role Toggle (optional) */}
            {setRole && (
              <RoleToggle
                role={role}
                onChange={(r) => setRole(r)}
              />
            )}

            {children}

            <div id="recaptcha-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
