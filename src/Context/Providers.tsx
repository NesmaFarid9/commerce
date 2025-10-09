"use client"
import Navbar from "@/Components/Navbar/Navbar";
import CartContextProvider from "@/Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishContextProvider from "@/Context/WishContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
export default function Providers({children}: {children: ReactNode}) {
    return <>
        <SessionProvider>
                <CartContextProvider>
                    <WishContextProvider>
                    <Navbar/>
                    <div className="container mx-auto">
                        <Toaster/>
                        {children}
                    </div>
                    </WishContextProvider>
                </CartContextProvider>
        </SessionProvider>
    </>
}
