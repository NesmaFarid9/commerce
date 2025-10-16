// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";


// const protectedPages = ['/cart', '/profile', '/wishlist'];
// const authPages = ['/login', '/register'];

// export default async function middleware(req: NextRequest){
//     const token = await getToken({req});
//     if(protectedPages.includes(req.nextUrl.pathname)){
//         if(token){
//             return NextResponse.next();
//         }
//         else{
//             const redirectUrl = new URL('/login', process.env.NEXT_API);
//             return NextResponse.redirect(redirectUrl);
//         }
//     }
//     if(authPages.includes(req.nextUrl.pathname)){
//         if(token){
//             const redirectUrl = new URL('/mainhome', process.env.NEXT_API);
//             return NextResponse.redirect(redirectUrl);
            
//         }
//         else{
//             return NextResponse.next();
//         }
//     }
//     return NextResponse.next();
// }
// export const config = {
//     matcher: ['/cart', '/profile', '/wishlist', '/login', '/register']
// }

// import { decode } from "next-auth/jwt";
// import { NextRequest } from "next/server";
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(req: NextRequest) {
//   try {
//     const cookieHeader = req.headers.get("cookie") || "";

//     if (!cookieHeader) return null;

//     const cookies = cookieHeader.split(";").map((c) => c.trim());
//     const tokenCookie = cookies.find(
//       (c) =>
//         c.startsWith("next-auth.session-token=") ||
//         c.startsWith("__Secure-next-auth.session-token=")
//     );

//     const tokenValue = tokenCookie?.split("=")?.[1];
//     if (!tokenValue) return null;

//     const decodedToken = await decode({
//       token: tokenValue,
//       secret: process.env.AUTH_SECRET!,
//     });

//     return decodedToken?.token ?? null;
//   } catch (err) {
//     console.error("❌ Error decoding token:", err);
//     return null;
//   }
// }


const protectedRoutes = ["/cart", "/profile", "/wishlist"];
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    if (!cookieHeader) {
      if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const tokenCookie = cookies.find(
      (c) =>
        c.startsWith("next-auth.session-token=") ||
        c.startsWith("__Secure-next-auth.session-token=")
    );

    const tokenValue = tokenCookie?.split("=")?.[1];

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      console.error("❌ Missing AUTH_SECRET in environment variables");
      return NextResponse.next();
    }

    const decodedToken = tokenValue
      ? await decode({ token: tokenValue, secret })
      : null;

    if (!decodedToken) {
      if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    if (authRoutes.includes(req.nextUrl.pathname)) {
      const homeUrl = new URL("/mainhome", req.url);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("❌ Middleware error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/cart", "/profile", "/wishlist", "/login", "/register"],
};
