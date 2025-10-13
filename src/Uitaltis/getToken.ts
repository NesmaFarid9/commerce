// "use server";

// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getUserToken() {
//   const token = (await cookies()).get("next-auth.session-token")?.value;
//   const accessToken = await decode({
//     token,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });
//   return accessToken?.token;
// }
// //////////////////////////////
// //////////////////////////////
// //////////////////////////////

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
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const userToken = decoded?.token;
  if(!userToken){
    throw new Error("Invalid user token inside JWT");
  }

  return userToken;
}
// export function getUserToken(): string | null {
//   if (typeof document === "undefined") return null;

//   const token = document.cookie
//     .split("; ")
//     .find(
//       (c) =>
//         c.startsWith("next-auth.session-token=") ||
//         c.startsWith("__Secure-next-auth.session-token=")
//     )
//     ?.split("=")[1];

//   return token || null;
// }

