// import { getUserToken } from "@/Uitaltis/getToken";
// import { NextResponse } from "next/server";
// import toast from "react-hot-toast";

// export async function GET(){
//     const token = await getUserToken();
//     if (!token) {
//         toast.error("Please login first");
//         return;
//     }
//     const response = await fetch(`${process.env.NEXT_API}/cart`,{
//             method: "GET",
//             headers:{
//                 token: token + ''
//             }
//         });
//         const payload = await response.json();
//         return NextResponse.json(payload);
// }

import { getUserToken } from "@/Uitaltis/getToken";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getUserToken();

    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 }
      );
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "GET",
      headers: {
        token: token + "",
      },
    });

    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching cart", error: (error as Error).message },
      { status: 500 }
    );
  }
}
