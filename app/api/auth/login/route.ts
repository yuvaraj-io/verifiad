import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import admin from "firebase-admin";
import { db } from "@/lib/db";

/* ------------------------------------------------------------------ */
/* 🔥 FIREBASE ADMIN INIT */
/* ------------------------------------------------------------------ */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/* ------------------------------------------------------------------ */
/* 🚀 LOGIN */
/* ------------------------------------------------------------------ */
export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  // 1️⃣ Verify Firebase OTP token
  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const phone = decoded.phone_number?.replace("+91", "");
  if (!phone) {
    return NextResponse.json({ error: "Phone missing" }, { status: 400 });
  }

  // 2️⃣ Fetch user from DB by phone
  const [rows]: any = await db.query(
    `
    SELECT u.id,
           r.name AS role
    FROM users u
    JOIN user_roles ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE u.phone = ?
    LIMIT 1
    `,
    [phone]
  );

  if (!rows.length) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const user = rows[0];

  // 3️⃣ Create HTTP-only session cookie
  const cookieStore = await cookies();
  cookieStore.set(
    "session",
    JSON.stringify({
      userId: user.id,
      role: user.role,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  // 4️⃣ Return role for redirect
  return NextResponse.json({
    role: user.role,
  });
}
