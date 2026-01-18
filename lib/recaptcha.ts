import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";


/**
 * Returns a singleton invisible reCAPTCHA verifier.
 * Creates it once and reuses it across the app.
 */
export function getRecaptchaVerifier(): RecaptchaVerifier {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }

  return window.recaptchaVerifier;
}
