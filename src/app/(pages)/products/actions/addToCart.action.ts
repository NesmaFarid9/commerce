"use server";

import { CartResponse } from "@/interfaces/cartInterface";
import { getUserToken } from "@/Uitaltis/getToken";

export async function AddToCartAction(productId: string) {
  const token = await getUserToken();
  const response = await fetch(`${process.env.NEXT_API}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token ?? "",
      "Content-Type": "application/json",
    },
  });
  const payload: CartResponse = await response.json();
  return payload;
}
