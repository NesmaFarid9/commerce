"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserTokenServer() {
  const token = (await cookies()).get("next-auth.session-token")?.value;
  if (!token) return null;

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token ?? null;
}
