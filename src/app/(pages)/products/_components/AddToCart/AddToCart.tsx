"use client";

import { CartContext } from "@/Context/CartContext";
import { WishContext } from "@/Context/WishContext";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AddToCartAction } from "../../actions/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

interface AddToCartProps {
  productId: string;
  children?: React.ReactNode;
}

export default function AddToCart({ productId, children }: AddToCartProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCartData } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishContext);
  const session = useSession();
  const router = useRouter();

  async function addProductToCart() {
    try {
      if (session.status === "authenticated") {
        setIsLoading(true);

        const payload = await AddToCartAction(productId);

        if (payload) {
          // show success message 
          toast.success(payload?.message ?? "Product added to cart");
          setCartData(payload);
        } else {
          toast.error("Failed to add product");
        }

        setIsLoading(false);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding to cart");
      setIsLoading(false);
    }
  }

  return (
    <>
      <CardFooter className="flex gap-1 mt-auto">
        {/* Add to Cart Button */}
        <Button
          disabled={isLoading}
          onClick={addProductToCart}
          className="grow flex items-center gap-1 text-lg cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
          {children ?? "Add to Cart"}
        </Button>

        {/* Wishlist Button */}
        <Button
          onClick={() => toggleWishlist(productId)}
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          {isInWishlist(productId) ? (
            <Heart
              key="red-heart"
              className="w-5 h-5 text-red-600 fill-red-600 hover:scale-110 transition-transform"
            />
          ) : (
            <Heart
              key="gray-heart"
              className="w-5 h-5 text-gray-400 transition-colors"
            />
          )}
        </Button>
      </CardFooter>
    </>
  );
}
