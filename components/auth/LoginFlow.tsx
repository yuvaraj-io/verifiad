"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtp } from "@/lib/firebase-utils";
import { getIdToken } from "@/lib/firebase";

export default function LoginFlow({
  role,
}: {
  role: "creator" | "business";
}) {
  const router = useRouter();

  const [phone, setPhone] = useState(""); // only 10 digits
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- SEND OTP ---------- */
  const requestOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      // ✅ always prepend +91
      const result = await sendOtp(`+91${phone}`);
      setConfirmation(result);
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      await confirmation.confirm(otp);
      const token = await getIdToken();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }), // role intent
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      // ✅ Role-based redirect
      if (data.role === "creator") {
        router.push("/dashboard");
      } else {
        router.push("/business/dashboard");
      }
    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="mt-8 space-y-6">
      {!confirmation ? (
        <>
          {/* Phone input with +91 prefix */}
          <div className="flex rounded-lg border overflow-hidden">
            <span className="flex items-center bg-gray-100 px-3 text-sm text-gray-700">
              +91
            </span>
            <input
              className="flex-1 p-3 outline-none"
              placeholder="XXXXXXXXXX"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button
            onClick={requestOtp}
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 text-white"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            className="w-full rounded-lg border p-3 text-center tracking-widest"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 text-white"
          >
            Verify & Login
          </button>
        </>
      )}
    </div>
  );
}
