import { getUserToken } from "@/Uitaltis/getToken";
import { NextResponse } from "next/server";

export async function GET(){
    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            method: "GET",
            headers:{
                token: token + ''
            }
        });
        const payload = await response.json();
        return NextResponse.json(payload);
}