"use client";

import { useState } from "react";
import RoleToggle from "./RoleToggle";
import Stepper from "./Stepper";
import StepRenderer from "./StepRenderer";
import LeftPanel from "./LeftPanel";
import { getIdToken } from "@/lib/firebase";

/* -------------------- TYPES -------------------- */

export type Role = "creator" | "business";

/* Creator */
export type CreatorForm = {
  fullName: string;
  location: string;
  category: string;
};

export type CreatorContact = {
  email: string;
  phone: string;
};

export type CreatorVerification = {
  file?: File;
  previewUrl?: string;
};

/* Business */
export type BusinessForm = {
  businessName: string;
  legalName: string;
  businessType: string;
  category: string;
  ownerName: string;
  phone: string;

  email: string;
  address: string;
  country: string;
  website: string;
};

export type BusinessVerification = {
  gstNumber: string;
  panNumber: string;
  registrationCert?: File;
  addressProof?: File;
  fssai?: File;
  ownerId?: File;
};

/* -------------------- COMPONENT -------------------- */

export default function SignupLayout() {
  const [role, setRole] = useState<Role>("creator");
  const [step, setStep] = useState(1);

  /* ---------- CREATOR STATE ---------- */
  const [creatorForm, setCreatorForm] = useState<CreatorForm>({
    fullName: "",
    location: "",
    category: "",
  });

  const [creatorVerification, setCreatorVerification] =
    useState<CreatorVerification>({});

  const [creatorContact, setCreatorContact] =
    useState<CreatorContact>({
      email: "",
      phone: "",
    });

  /* ---------- BUSINESS STATE ---------- */
  const [businessForm, setBusinessForm] =
    useState<BusinessForm>({
      businessName: "",
      legalName: "",
      businessType: "",
      category: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      country: "",
      website: "",
    });

  const [businessVerification, setBusinessVerification] =
    useState<BusinessVerification>({
      gstNumber: "",
      panNumber: "",
    });

  /* ---------- FINAL SUBMIT (CREATOR) ---------- */
  const finish = async () => {
    if (!creatorVerification.file) {
      alert("Please upload government ID");
      return;
    }

    const token = await getIdToken();
    if (!token) {
      alert("Authentication failed");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", creatorForm.fullName);
    formData.append("location", creatorForm.location);
    formData.append("category", creatorForm.category);
    formData.append("email", creatorContact.email);
    formData.append("document", creatorVerification.file);

    try {
      const res = await fetch("/api/onboarding/creator", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      console.log("Creator signup success");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 px-6">
      <div className="grid min-h-[720px] w-full max-w-6xl grid-cols-[1fr_1.2fr]">
        <LeftPanel role={role} />

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
              onPrev={() => setStep((s) => s - 1)}
              creatorForm={creatorForm}
              setCreatorForm={setCreatorForm}
              creatorVerification={creatorVerification}
              setCreatorVerification={setCreatorVerification}
              creatorContact={creatorContact}
              setCreatorContact={setCreatorContact}
              businessForm={businessForm}
              setBusinessForm={setBusinessForm}
              businessVerification={businessVerification}
              setBusinessVerification={setBusinessVerification}
              finish={finish}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
