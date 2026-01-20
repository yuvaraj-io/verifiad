"use client";

import { useState } from "react";
import {
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getRecaptchaVerifier, clearRecaptcha } from "@/lib/recaptcha";
import { BusinessForm } from "../../SignupLayout";

export default function BusinessStep4({
  businessForm,
  onVerified,
  onPrev,
}: {
  businessForm: BusinessForm;
  onVerified: () => void;
  onPrev: () => void;
}) {
  const [confirmation, setConfirmation] =
    useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasError = attempted && otp.length !== 6;

  const sendOtp = async () => {
    setLoading(true);
    try {
      const verifier = getRecaptchaVerifier();

      const result = await signInWithPhoneNumber(
        auth,
        `+91${businessForm.phone}`,
        verifier
      );

      setConfirmation(result);
    } catch (err) {
      console.error(err);
      clearRecaptcha();
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setAttempted(true);
    if (otp.length !== 6 || !confirmation) return;

    try {
      await confirmation.confirm(otp);
      onVerified();
    } catch {
      clearRecaptcha();
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-12">
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            value={businessForm.phone}
            disabled
            className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-4 py-3 text-sm"
          />
        </div>

        <div className="text-center">
          <p className="mb-4 text-sm font-medium text-gray-700">
            Enter OTP
          </p>

          <input
            value={otp}
            maxLength={6}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            className={`h-14 w-48 rounded border text-center text-lg outline-none ${
              hasError
                ? "border-red-500"
                : "border-gray-400"
            }`}
          />

          {hasError && (
            <p className="mt-2 text-sm text-red-500">
              Enter a valid 6-digit OTP
            </p>
          )}

          {!confirmation && (
            <button
              onClick={sendOtp}
              disabled={loading}
              className="mt-4 rounded border px-6 py-2 text-sm text-purple-600"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-10">
        <button
          onClick={onPrev}
          className="rounded border border-gray-400 px-10 py-3 text-gray-700"
        >
          Previous
        </button>

        <button
          onClick={verifyOtp}
          className="rounded bg-purple-600 px-10 py-3 text-white"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
