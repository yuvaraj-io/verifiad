import { cookies } from "next/headers";

export function getSession() {
  const cookie = cookies().get("session");
  if (!cookie) return null;
  return JSON.parse(cookie.value);
}