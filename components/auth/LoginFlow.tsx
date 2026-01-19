"use client";

import { useState } from "react";
import { getIdToken } from "@/lib/firebase";

export default function LoginFlow({
  role,
}: {
  role: "creator" | "business";
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    // Call Firebase / custom auth
    console.log("Login", { role, email, password });
  };

  return (
    <div className="space-y-6 mt-8">
      <input
        className="w-full border p-3 rounded-lg"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded-lg"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full rounded-xl bg-purple-600 py-3 text-white font-medium"
      >
        Login
      </button>
    </div>
  );
}
