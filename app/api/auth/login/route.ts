import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import admin from "firebase-admin";
import mysql from "mysql2/promise";

/* ------------------------------------------------------------------ */
/* 🔥 FIREBASE ADMIN INITIALIZATION (SERVER ONLY) */
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

async function verifyIdToken(token: string) {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* 🗄️ DATABASE CONNECTION */
/* ------------------------------------------------------------------ */

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* ------------------------------------------------------------------ */
/* 👤 USER FETCH */
/* ------------------------------------------------------------------ */

async function getUserByFirebaseUid(firebaseUid: string) {
  const [rows]: any = await pool.query(
    `
    SELECT id, role
    FROM users
    WHERE firebase_uid = ?
    LIMIT 1
    `,
    [firebaseUid]
  );

  if (!rows.length) return null;

  return {
    id: rows[0].id,
    role: rows[0].role,
  };
}

/* ------------------------------------------------------------------ */
/* 🚀 LOGIN API */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  // 1️⃣ Verify Firebase token
  const decoded = await verifyIdToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  // 2️⃣ Fetch user + role from DB
  const user = await getUserByFirebaseUid(decoded.uid);
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // 3️⃣ Create session (HTTP-only cookie)
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

  // 4️⃣ Return role for client redirect
  return NextResponse.json({
    role: user.role,
  });
}
