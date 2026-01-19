import admin from "firebase-admin";

/**
 * Initialize Firebase Admin only once
 * (Important for Next.js hot reloads)
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

// Export admin instance
export const firebaseAdmin = admin;

// Export default storage bucket
export const bucket = admin.storage().bucket();


export async function verifyIdToken(token: string) {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Firebase token verification failed", error);
    return null;
  }
}