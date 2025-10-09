"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const token = (await cookies()).get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return accessToken?.token;
}
