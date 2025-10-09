import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPages = ['/cart', '/profile', '/wishlist'];
const authPages = ['/login', '/register'];

export default async function middleware(req: NextRequest){
    const token = await getToken({req});
    if(protectedPages.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.next();
        }
        else{
            const redirectUrl = new URL('/login', process.env.NEXT_API);
            return NextResponse.redirect(redirectUrl);
        }
    }
    if(authPages.includes(req.nextUrl.pathname)){
        if(token){
            const redirectUrl = new URL('/mainhome', process.env.NEXT_API);
            return NextResponse.redirect(redirectUrl);
            
        }
        else{
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/cart', '/profile', '/wishlist', '/login', '/register']
}