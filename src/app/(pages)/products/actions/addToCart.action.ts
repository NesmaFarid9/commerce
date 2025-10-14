// // "use server";

// import { CartResponse } from "@/interfaces/cartInterface";
// import { getUserToken } from "@/Uitaltis/getToken";
// import toast from "react-hot-toast";

// export async function AddToCartAction(productId: string) {
//   const token = await getUserToken();
//   if (!token) {
//   toast.error("Please login first");
//   return;
// }
//   const response = await fetch(`${process.env.NEXT_API}/cart`, {
//     method: "POST",
//     body: JSON.stringify({ productId }),
//     headers: {
//       token: token ?? "",
//       "Content-Type": "application/json",
//     },
//   });
//   const payload: CartResponse = await response.json();
//   return payload;
// }


// remove "use server"
// import { CartResponse } from "@/interfaces/cartInterface";
// import { getUserToken } from "@/Uitaltis/getToken";

// export async function AddToCartAction(productId: string): Promise<CartResponse | null> {
//   try {
//     const token = await getUserToken();

//     if (!token) {
//       return null;
//     }

//     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//       method: "POST",
//       body: JSON.stringify({ productId }),
//       headers: {
//         token: token ?? "",
//         "Content-Type": "application/json",
//       },
//     });

//     const payload: CartResponse = await response.json();
//     return payload;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }


"use server";

import { getUserToken } from "@/Uitaltis/getToken";

export async function AddToCartAction(productId: string) {
  const token = await getUserToken();

  if (!token) {
    return { success: false, message: "Please login first" };
  }

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token + "",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to add product" };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
