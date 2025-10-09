"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import { CartResponse } from './../interfaces/cartInterface';
import { useSession } from "next-auth/react";

type cartContext = {
    cartData : null | CartResponse,
    setCartData : (value: CartResponse | null)=> void,
    isLoading : boolean,
    setIsLoading : (value: boolean) => void,
    getCart: ()=> void
}



export const CartContext = createContext<cartContext>({
    cartData : null,
    setCartData : (value)=> {},
    isLoading : true,
    setIsLoading : (value) => {},
    getCart : ()=>{}
});

export default function CartContextProvider({children}: {children: ReactNode}){
    const [cartData, setCartData] = useState<CartResponse|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const session = useSession();

    async function getCart() {
        try{
            if(session.status === 'authenticated'){
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/get-cart`);
                const payload = await response.json();
            // console.log(payload);
                setCartData(payload);
                setIsLoading(false);
            }
        }
        catch(err){
            console.log(err);
            
        }
        
    }
    useEffect(() => {
        getCart();
    }, [session]);
    

    return <CartContext.Provider value={{cartData, setCartData, isLoading, setIsLoading, getCart}}>
        {children}
    </CartContext.Provider>
}