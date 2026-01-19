"use client";

import { useState, useEffect } from "react";
import SignupLayout from "@/components/signup/SignupLayout";
import Modal from "@/components/ui/Modal";

export default function HomeHero() {
  const [open, setOpen] = useState(false);

  /* Optional: ESC key support */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section
        className="relative min-h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/homepage.png')",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
          {/* Header */}
          <header className="flex items-center justify-between">
            <img src="/assets/logo.png" />

            <nav className="flex items-center gap-10 text-white">
              <a className="relative font-medium">
                Home
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded bg-sky-400" />
              </a>
              <a className="opacity-80 hover:opacity-100">Who we are</a>
              <a className="opacity-80 hover:opacity-100">Log in</a>
            </nav>
          </header>

          {/* Hero content */}
          <div className="mt-24 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="text-white">
              <h1 className="text-4xl font-light leading-tight md:text-5xl">
                Reach Real People <br />
                With Verified Ads
              </h1>

              <p className="mt-6 max-w-md text-lg opacity-90">
                No spam. No fake promises. Only real businesses and real ads
                approved through our verification system.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-gray-200"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SIGNUP MODAL ---------- */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <SignupLayout />
      </Modal>
    </>
  );
}
