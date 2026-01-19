import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

export const setupRecaptcha = () => {
  if (window.recaptchaVerifier) return;

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
    }
  );
};

export const sendOtp = async (phone: string) => {
  setupRecaptcha();
  return signInWithPhoneNumber(
    auth,
    phone,
    window.recaptchaVerifier
  );
};
