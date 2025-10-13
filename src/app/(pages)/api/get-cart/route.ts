import { getUserToken } from "@/Uitaltis/getToken";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function GET(){
    const token = await getUserToken();
    if (!token) {
        toast.error("Please login first");
        return;
    }
    const response = await fetch(`${process.env.NEXT_API}/cart`,{
            method: "GET",
            headers:{
                token: token + ''
            }
        });
        const payload = await response.json();
        return NextResponse.json(payload);
}