import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


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
