import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase";

let verifier: RecaptchaVerifier | null = null;

export function getRecaptchaVerifier() {
  if (!verifier) {
    verifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }
  return verifier;
}

export function clearRecaptcha() {
  verifier?.clear();
  verifier = null;
}
