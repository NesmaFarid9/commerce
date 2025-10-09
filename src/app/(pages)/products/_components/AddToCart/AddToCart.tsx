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
        toast.success(payload.message);
        setCartData(payload);
        setIsLoading(false);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async function addProductToWishList() {

  // }
  // async function removeProductFromWishList(){

  // }
  // async function isToggleWishlist(){
  //     if(wishProduct(productId)){
  //         const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
  //         method:"DELETE",
  //         headers:{
  //             token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQwMDIxNmZlYWZjMDAzZDQ4ZjZmMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NjEwOTMyLCJleHAiOjE3NjUzODY5MzJ9.CNHIWb6HykyYDG8GNXeTyMmB923nYx9HUSTGW7tRxrQ",
  //         }
  //         });
  //         const payload = await response.json();
  //         console.log(payload);
  //         toast.success(payload.message);
  //         setIsInWish(false);
  //     }
  //     else{
  //         const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
  //         method: "POST",
  //         body: JSON.stringify({productId}),
  //         headers:{
  //             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQwMDIxNmZlYWZjMDAzZDQ4ZjZmMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NjEwOTMyLCJleHAiOjE3NjUzODY5MzJ9.CNHIWb6HykyYDG8GNXeTyMmB923nYx9HUSTGW7tRxrQ",
  //             "Content-Type": "application/json"
  //         }
  //     });
  //     const payload = await response.json();
  //     toast.success(payload.message);
  //     console.log(payload);
  //     setIsInWish(true);

  //     }

  // }

  return (
    <>
      <CardFooter className="flex gap-1 mt-auto">
        <Button
          disabled={isLoading}
          onClick={addProductToCart}
          className="grow flex items-center gap-1 text-lg not-only:cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="animated-spin" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
          {children ?? "Add to Cart"}
        </Button>
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
              key="red-heart"
              className="w-5 h-5 text-gray-400 transition-colors"
            />
          )}
        </Button>
      </CardFooter>
    </>
  );
}
