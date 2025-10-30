"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  const tokenFromCookie = cookieStore.get("next-auth.session-token")?.value || 
  cookieStore.get("__Secure-next-auth.session-token")?.value

  if(!tokenFromCookie){
    throw new Error("User token is missing in cookies");
  }

  const decoded = await decode({
    token: tokenFromCookie,
    secret: process.env.AUTH_SECRET!,
  });
  const userToken = decoded?.token;
  if(!userToken){
    throw new Error("Invalid user token inside JWT");
  }

  return userToken;
}

