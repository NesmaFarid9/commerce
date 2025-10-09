"use client";

export async function removeCartItem(productId: string, token: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to remove item");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Remove Cart Error:", error);
    throw error;
  }
}

