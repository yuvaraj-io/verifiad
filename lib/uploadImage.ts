import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File, folder = "uploads") {
  const fileRef = ref(
    storage,
    `${folder}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}
