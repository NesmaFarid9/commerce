"use client";
import { productI } from "@/interfaces/product";
import { getUserToken } from "@/Uitaltis/getToken";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

type WishContextType = {
  wishProduct: productI[];
  setWishProduct: React.Dispatch<React.SetStateAction<productI[]>>;
  getWishListProducts: () => Promise<void>;
  isLoadingWish: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
};

export const WishContext = createContext<WishContextType>({
  wishProduct: [],
  setWishProduct: () => {},
  getWishListProducts: async () => {},
  isLoadingWish: false,
  isInWishlist: () => false,
  toggleWishlist: async () => {},
});

export default function WishContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishProduct, setWishProduct] = useState<productI[]>([]);
  const [isLoadingWish, setIsLoadingWish] = useState<boolean>(false);
  const { status } = useSession();

  // Only fetch wishlist if user is authenticated
  async function getWishListProducts() {
    if (status !== "authenticated") return; // avoid redirecting here

    try {
      setIsLoadingWish(true);
      const token = await getUserToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          method: "GET",
          headers: { token: token + "" },
        }
      );

      const payload = await response.json();
      if (response.ok) {
        setWishProduct(payload.data || []);
      } else {
        console.warn("Failed to fetch wishlist:", payload);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsLoadingWish(false);
    }
  }

  function isInWishlist(productId: string) {
    return wishProduct.some((p) => p.id === productId);
  }

  async function toggleWishlist(productId: string) {
    try {
      const token = await getUserToken();
      if (!token) {
        toast.error("Please log in to manage your wishlist.");
        return;
      }

      if (isInWishlist(productId)) {
        // Remove from wishlist
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            method: "DELETE",
            headers: { token: token + "" },
          }
        );
        const payload = await response.json();
        toast.success(payload.message);
        setWishProduct((prev) => prev.filter((p) => p.id !== productId));
      } else {
        // Add to wishlist
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist`,
          {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
              token: token + "",
              "Content-Type": "application/json",
            },
          }
        );
        const payload = await response.json();
        toast.success(payload.message);
        await getWishListProducts();
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getWishListProducts();
    }
  }, [status]);

  return (
    <WishContext.Provider
      value={{
        wishProduct,
        setWishProduct,
        getWishListProducts,
        isLoadingWish,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
