import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin, bucket } from "@/lib/firebaseAdmin";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

async function uploadIfExists(
  file: File | null,
  path: string
): Promise<string | null> {
  if (!file) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const gcsFile = bucket.file(path);

  await gcsFile.save(buffer, {
    contentType: file.type,
    public: true,
  });

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}


export async function POST(req: NextRequest) {
  /* ---------- AUTH ---------- */
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = await firebaseAdmin
    .auth()
    .verifyIdToken(authHeader.replace("Bearer ", ""));

  const phone = decoded.phone_number?.replace("+91", "");
  if (!phone) {
    return NextResponse.json({ error: "Phone missing" }, { status: 400 });
  }

  /* ---------- FORM DATA ---------- */
  const form = await req.formData();

  const businessName = form.get("businessName") as string;
  const businessType = form.get("businessType") as string;
  const category = form.get("category") as string;
  const ownerName = form.get("ownerName") as string;
  const email = form.get("email") as string;
  const website = form.get("website") as string;
  const address = form.get("address") as string;
  const country = form.get("country") as string;

  const gstNumber = form.get("gstNumber") as string;
  const panNumber = form.get("panNumber") as string;

  const registrationCert = form.get("registrationCert") as File | null;
  const addressProof = form.get("addressProof") as File | null;
  const ownerId = form.get("ownerId") as File | null;
  const fssai = form.get("fssai") as File | null;
  const placeImage = form.get("placeImage") as File | null;

  if (
    !registrationCert ||
    !addressProof ||
    !ownerId ||
    !placeImage
  ) {
    return NextResponse.json(
      { error: "Required documents missing" },
      { status: 400 }
    );
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    /* ---------- USER ---------- */
    const [users]: any = await conn.execute(
      "SELECT id FROM users WHERE phone = ?",
      [phone]
    );

    const userId = users.length ? users[0].id : randomUUID();

    if (!users.length) {
      await conn.execute(
        "INSERT INTO users (id, phone, is_verified) VALUES (?, ?, true)",
        [userId, phone]
      );
    }

    /* ---------- ROLE ---------- */
    await conn.execute(
      `INSERT IGNORE INTO user_roles (user_id, role_id)
       VALUES (?, (SELECT id FROM roles WHERE name='business'))`,
      [userId]
    );

    /* ---------- DUPLICATE CHECK ---------- */
    const [existing]: any = await conn.execute(
      "SELECT id FROM business_profiles WHERE user_id = ?",
      [userId]
    );

    if (existing.length) {
      await conn.rollback();
      return NextResponse.json(
        { error: "Business profile already exists" },
        { status: 409 }
      );
    }

    /* ---------- FILE UPLOADS ---------- */
    const base = `business/${userId}`;

    const registrationCertUrl = await uploadIfExists(
      registrationCert,
      `${base}/registration-cert`
    );

    const addressProofUrl = await uploadIfExists(
      addressProof,
      `${base}/address-proof`
    );

    const ownerIdUrl = await uploadIfExists(
      ownerId,
      `${base}/owner-id`
    );

    const fssaiUrl = await uploadIfExists(
      fssai,
      `${base}/fssai`
    );

    const livePlaceImageUrl = await uploadIfExists(
      placeImage,
      `${base}/live-place`
    );

    /* ---------- BUSINESS PROFILE ---------- */
    await conn.execute(
      `INSERT INTO business_profiles (
        id, user_id,
        business_name, business_type, category, owner_name,
        email, website, address, country,
        gst_number, pan_number,
        registration_cert_url, address_proof_url,
        owner_id_url, fssai_url, live_place_image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        userId,
        businessName,
        businessType,
        category,
        ownerName,
        email,
        website,
        address,
        country,
        gstNumber,
        panNumber,
        registrationCertUrl,
        addressProofUrl,
        ownerIdUrl,
        fssaiUrl,
        livePlaceImageUrl,
      ]
    );

    await conn.commit();
    return NextResponse.json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    return NextResponse.json(
      { error: "Business onboarding failed" },
      { status: 500 }
    );
  } finally {
    conn.release();
  }
}
