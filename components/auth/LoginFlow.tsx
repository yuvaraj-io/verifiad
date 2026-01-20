"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtp } from "@/lib/firebase-utils";
import { getIdToken } from "@/lib/firebase";
import LoaderOverlay from "@/components/ui/LoaderOverlay";
import OtpInput from "@/components/ui/OtpInput";

export default function LoginFlow({
  role,
}: {
  role: "creator" | "business";
}) {
  const router = useRouter();

  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      router.push(
        data.role === "creator"
          ? "/dashboard"
          : "/business/dashboard"
      );
    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 Popup Loader */}
      <LoaderOverlay show={loading} />

      <div className="mt-8 space-y-6">
        {!confirmation ? (
          <>
            <div className="flex overflow-hidden rounded-lg border">
              <span className="flex items-center bg-gray-100 px-3 text-sm">
                +91
              </span>
              <input
                className="flex-1 p-3 outline-none"
                placeholder="XXXXXXXXXX"
                maxLength={10}
                disabled={loading}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button
              onClick={requestOtp}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-white disabled:opacity-70"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-white disabled:opacity-70"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
