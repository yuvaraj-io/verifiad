"use client";

import { useState } from "react";
import RoleToggle from "../auth/RoleToggle";
import Stepper from "./Stepper";
import StepRenderer from "./StepRenderer";
import LeftPanel from "../auth/LeftPanel";
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

export type BusinessLiveVerification = {
  placeImage?: File;
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
      phone: "7204447908",
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

    const [businessLiveVerification, setBusinessLiveVerification] =
  useState<BusinessLiveVerification>({});
    
  const businessFinish = async () => {
    /* ---------- BASIC CHECK ---------- */
    if (!businessLiveVerification.placeImage) {
      alert("Please capture business place image");
      return;
    }

    const token = await getIdToken();
    if (!token) {
      alert("Authentication failed");
      return;
    }

    /* ---------- BUILD FORM DATA ---------- */
    const formData = new FormData();

    // Step 1 – Business info
    formData.append("businessName", businessForm.businessName);
    formData.append("businessType", businessForm.businessType);
    formData.append("category", businessForm.category);
    formData.append("ownerName", businessForm.ownerName);
    formData.append("phone", businessForm.phone);

    // Step 2 – Contact & address
    formData.append("email", businessForm.email);
    formData.append("website", businessForm.website);
    formData.append("address", businessForm.address);
    formData.append("country", businessForm.country);

    // Step 3 – Verification numbers
    formData.append("gstNumber", businessVerification.gstNumber);
    formData.append("panNumber", businessVerification.panNumber);

    // Step 3 – Documents
    if (businessVerification.registrationCert)
      formData.append(
        "registrationCert",
        businessVerification.registrationCert
      );

    if (businessVerification.addressProof)
      formData.append(
        "addressProof",
        businessVerification.addressProof
      );

    if (businessVerification.ownerId)
      formData.append(
        "ownerId",
        businessVerification.ownerId
      );

    if (businessVerification.fssai)
      formData.append(
        "fssai",
        businessVerification.fssai
      );

    // Step 5 – Live verification
    formData.append(
      "placeImage",
      businessLiveVerification.placeImage
    );

    /* ---------- API CALL ---------- */
    try {
      const res = await fetch("/api/onboarding/business", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Business onboarding failed");
        return;
      }

      console.log("✅ Business onboarding success");

      // TODO: redirect to dashboard
      // router.push("/business/dashboard");

    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };


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
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid min-h-[720px] w-full grid-cols-[1fr_1.2fr]">
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

            <Stepper step={step} total={role === 'business'?  5 : 6} />

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
              businessLiveVerification={businessLiveVerification}
              setBusinessLiveVerification={setBusinessLiveVerification}
              businessFinish={businessFinish}
              finish={finish}

            />
            <div id="recaptcha-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
