"use client";

import { useState } from "react";
import { uploadImage } from "../lib/uploadImage";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const url = await uploadImage(file, "dummy-images");
    setImageUrl(url);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {loading && <p>Uploading...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="h-40 rounded border"
        />
      )}
    </div>
  );
}
