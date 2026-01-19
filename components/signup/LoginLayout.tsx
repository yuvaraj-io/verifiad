"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginFlow from "@/components/auth/LoginFlow";

export default function LoginPage() {
  const [role, setRole] =
    useState<"creator" | "business">("creator");

  return (
    <AuthLayout
      role={role}
      setRole={setRole}
      title="Login"
    >
      <LoginFlow role={role} />
    </AuthLayout>
  );
}
