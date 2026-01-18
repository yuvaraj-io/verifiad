import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin, bucket } from "@/lib/firebaseAdmin";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  // 1️⃣ Auth
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await firebaseAdmin
      .auth()
      .verifyIdToken(authHeader.replace("Bearer ", ""));
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const phone = decoded.phone_number?.replace("+91", "");
  if (!phone) {
    return NextResponse.json({ error: "Phone missing" }, { status: 400 });
  }

  // 2️⃣ Read form data
  const form = await req.formData();

  const fullName = form.get("fullName") as string;
  const location = form.get("location") as string;
  const category = form.get("category") as string;
  const email = form.get("email") as string;
  const document = form.get("document") as File;

  if (!document) {
    return NextResponse.json({ error: "Document missing" }, { status: 400 });
  }

  // 3️⃣ IDs (UUID strings)
  const userId = randomUUID();
  const profileId = randomUUID();

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 4️⃣ Create user
    await conn.execute(
      `INSERT INTO users (id, phone, is_verified)
       VALUES (?, ?, false)`,
      [userId, phone]
    );

    // 5️⃣ Assign role
    await conn.execute(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES (
         ?,
         (SELECT id FROM roles WHERE name='creator')
       )`,
      [userId]
    );

    // 6️⃣ Upload document
    const buffer = Buffer.from(await document.arrayBuffer());
    const ext = document.name.split(".").pop();
    const filePath = `verifications/${userId}/govt-id.${ext}`;

    const file = bucket.file(filePath);
    await file.save(buffer, {
      contentType: document.type,
      public: true,
    });

    const documentUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    // 7️⃣ Create creator profile
    await conn.execute(
      `INSERT INTO creator_profiles (
        id, user_id, full_name, location, category, email, govt_id_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        profileId,
        userId,
        fullName,
        location,
        category,
        email,
        documentUrl,
      ]
    );

    await conn.commit();
    return NextResponse.json({ success: true });
  } catch (e: any) {
    await conn.rollback();

    if (e.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    console.error(e);
    return NextResponse.json(
      { error: "Onboarding failed" },
      { status: 500 }
    );
  } finally {
    conn.release();
  }
}
