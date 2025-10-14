// "use client";
// import { createContext, ReactNode, useEffect, useState } from "react";
// import { CartResponse } from "./../interfaces/cartInterface";
// import { useSession } from "next-auth/react";

// type cartContext = {
//   cartData: null | CartResponse;
//   setCartData: (value: CartResponse | null) => void;
//   isLoading: boolean;
//   setIsLoading: (value: boolean) => void;
//   getCart: () => void;
// };

// export const CartContext = createContext<cartContext>({
//   cartData: null,
//   setCartData: (value) => {},
//   isLoading: true,
//   setIsLoading: (value) => {},
//   getCart: () => {},
// });

// export default function CartContextProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [cartData, setCartData] = useState<CartResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const session = useSession();

//   async function getCart() {
//     try {
//       if (session.status === "authenticated") {
//         setIsLoading(true);
//         const response = await fetch(`${process.env.NEXT_URL}/api/get-cart`);
//         const payload = await response.json();
//         // console.log(payload);
//         setCartData(payload);
//         setIsLoading(false);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   useEffect(() => {
//     getCart();
//   }, [session]);

//   return (
//     <CartContext.Provider
//       value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { CartResponse } from "@/interfaces/cartInterface";
import { getUserToken } from "@/Uitaltis/getToken";

interface CartContextType {
  cartData: CartResponse | null;
  setCartData: React.Dispatch<React.SetStateAction<CartResponse | null>>;
  getCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartData: null,
  setCartData: () => {},
  getCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);

  const getCart = useCallback(async () => {
    try {
      const token = await getUserToken();
      if (!token) return;

      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "GET",
        headers: { token: token + "" },
      });
      const data: CartResponse = await res.json();
      setCartData(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <CartContext.Provider value={{ cartData, setCartData, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
