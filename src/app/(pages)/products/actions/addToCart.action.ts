// src/actions/AddToCartAction.ts
import { CartResponse } from "@/interfaces/cartInterface";
import { getUserToken } from "@/Uitaltis/getToken";

export async function AddToCartAction(productId: string): Promise<CartResponse | null> {
  try {
    const token = await getUserToken();
    if (!token) return null;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const payload: CartResponse = await response.json();
    if (!response.ok) throw new Error(payload.message || "Failed to add to cart");

    return payload;
  } catch (error) {
    console.error("AddToCartAction Error:", error);
    return null;
  }
}
