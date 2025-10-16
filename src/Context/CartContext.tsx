// "use client";

// import {
//   createContext,
//   ReactNode,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { CartResponse } from "@/interfaces/cartInterface";
// import { useSession } from "next-auth/react";

// type CartContextType = {
//   cartData: CartResponse | null;
//   setCartData: React.Dispatch<React.SetStateAction<CartResponse | null>>;
//   isLoading: boolean;
//   getCart: () => Promise<void>;
// };

// export const CartContext = createContext<CartContextType>({
//   cartData: null,
//   setCartData: () => {},
//   isLoading: false,
//   getCart: async () => {},
// });

// export default function CartContextProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [cartData, setCartData] = useState<CartResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const session = useSession();

//   const getCart = useCallback(async () => {
//     if (session.status !== "authenticated") return;
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${process.env.NEXT_URL}/api/get-cart`);
//       const payload: CartResponse = await response.json();
//       setCartData(payload);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [session.status]);

//   useEffect(() => {
//     getCart();
//   }, [getCart]);

//   return (
//     <CartContext.Provider value={{ cartData, setCartData, isLoading, getCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CartResponse } from "./../interfaces/cartInterface";
import { useSession } from "next-auth/react";

type cartContext = {
  cartData: null | CartResponse;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
};

export const CartContext = createContext<cartContext>({
  cartData: null,
  setCartData: (value) => {},
  isLoading: true,
  setIsLoading: (value) => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  async function getCart() {
    try {
      if (session.status === "authenticated") {
        setIsLoading(true);
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/api/get-cart`
        );
        const payload = await response.json();
        // console.log(payload);
        setCartData(payload);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCart();
  }, [session]);

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
