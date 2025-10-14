// "use client";

// import { Loader2, Trash2 } from "lucide-react";
// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "@/Context/CartContext";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { CartResponse } from "@/interfaces/cartInterface";
// import CheckoutSession from "../CheckoutSession/CheckoutSession";
// // import { getUserToken } from "@/Uitaltis/getToken";
// import { Card, CardContent, CardFooter } from "@/Components/ui/card";
// import { formatCurrency } from "@/Uitaltis/formatPrice";
// import Image from "next/image";
// import { Button } from "@/Components/ui/button";
// import { getUserToken } from "@/Uitaltis/getToken";

// export default function InnerCart() {
//   const { cartData, getCart, setCartData } = useContext(CartContext);
//   const [isLoadingClearing, setIsLoadingClearing] = useState(false);
//   const [isRemoveItemId, setIsRemoveItemId] = useState<null | string>(null);
//   const [isUpdateItemId, setIsUpdateItemId] = useState<null | string>(null);

//   useEffect(() => {
//     if (
//       cartData &&
//       typeof cartData?.data?.products?.[0]?.product === "string"
//     ) {
//       getCart();
//     }
//   }, [cartData, getCart]);

//   async function clearCart() {
//     try {
//       setIsLoadingClearing(true);
//       const token = await getUserToken();
//       if (!token) {
//         toast.error("Please login first");
//         return;
//       }
//       const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//         method: "DELETE",
//         headers: { token: token + "" },
//       });
//       if (!res.ok) throw new Error("Failed to clear cart");
//       setCartData(null);
//       toast.success("Cart cleared successfully 🧹");
//     } catch {
//       toast.error("Failed to clear cart ❌");
//     } finally {
//       setIsLoadingClearing(false);
//     }
//   }

//   async function removeCartItem(productId: string) {
//     try {
//       setIsRemoveItemId(productId);
//       const token = await getUserToken();
//       const res = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
//         {
//           method: "DELETE",
//           headers: { token: token + "" },
//         }
//       );
//       const payload: CartResponse = await res.json();
//       toast.success("Item removed 🗑️");
//       setCartData(payload.numOfCartItems > 0 ? payload : null);
//     } catch {
//       toast.error("Failed to remove item ❌");
//     } finally {
//       setIsRemoveItemId(null);
//     }
//   }

//   async function changeCountProduct(productId: string, count: number) {
//     try {
//       setIsUpdateItemId(productId);
//       const token = await getUserToken();
//       const res = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
//         {
//           method: "PUT",
//           headers: {
//             token: token + "",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ count }),
//         }
//       );
//       const payload: CartResponse = await res.json();
//       setCartData(payload);
//     } catch {
//       toast.error("Failed to update quantity ❌");
//     } finally {
//       setIsUpdateItemId(null);
//     }
//   }

//   if (!cartData?.data?.products?.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-5 animate-fadeIn">
//         <h2 className="text-3xl font-semibold text-gray-800">
//           Your cart is empty 🛍️
//         </h2>
//         <p className="text-gray-500 max-w-md">
//           Looks like you haven’t added anything yet. Discover amazing products!
//         </p>
//         <Button
//           asChild
//           className="bg-[#FF6F61] hover:bg-[#FF5A4C] text-white rounded-lg px-8 py-5 shadow-md hover:shadow-lg transition-all duration-300"
//         >
//           <Link href="/products">Start Shopping</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12 animate-fadeIn">
//       {/* Header */}
//       <div className="text-center md:text-left mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
//           🛒 Your Shopping Cart
//         </h1>
//         <p className="text-gray-500 mt-2">
//           {cartData?.numOfCartItems} item(s) in your cart
//         </p>
//       </div>

//       {/* Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-6">
//           {cartData?.data.products.map((item) => (
//             <Card
//               key={item.product._id}
//               className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
//             >
//               <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
//                 <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border shadow-sm">
//                   <Image
//                     src={item.product.imageCover ?? ""}
//                     alt={item.product.title ?? "image"}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 150px"
//                     className="object-cover"
//                   />
//                 </div>

//                 <div className="flex-1 w-full">
//                   <h2 className="text-lg font-semibold line-clamp-1 text-gray-900">
//                     {item.product.title}
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {item.product.brand?.name} · {item.product.category?.name}
//                   </p>

//                   <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
//                     <span className="font-bold text-xl text-[#FF6F61]">
//                       {formatCurrency(item.price)}
//                     </span>

//                     <div className="flex items-center gap-2">
//                       <Button
//                         disabled={
//                           isUpdateItemId === item.product._id ||
//                           item.count === 1
//                         }
//                         onClick={() =>
//                           changeCountProduct(item.product._id!, item.count - 1)
//                         }
//                         size="sm"
//                         variant="outline"
//                         className="hover:bg-[#FF6F61]/10 transition-all duration-200 cursor-pointer"
//                       >
//                         −
//                       </Button>

//                       <span className="min-w-[28px] text-center font-medium">
//                         {isUpdateItemId === item.product._id ? (
//                           <Loader2 className="animate-spin w-4 h-4 text-[#FF6F61]" />
//                         ) : (
//                           item.count
//                         )}
//                       </span>

//                       <Button
//                         disabled={
//                           isUpdateItemId === item.product._id ||
//                           item.product.quantity === item.count
//                         }
//                         onClick={() =>
//                           changeCountProduct(item.product._id!, item.count + 1)
//                         }
//                         size="sm"
//                         variant="outline"
//                         className="hover:bg-[#FF6F61]/10 transition-all duration-200 cursor-pointer"
//                       >
//                         +
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 <Button
//                   disabled={isRemoveItemId === item.product._id}
//                   onClick={() => removeCartItem(item.product._id!)}
//                   variant="ghost"
//                   size="icon"
//                   className="hover:bg-red-50 rounded-full transition cursor-pointer"
//                 >
//                   {isRemoveItemId === item.product._id ? (
//                     <Loader2 className="animate-spin text-[#FF6F61]" />
//                   ) : (
//                     <Trash2 className="w-5 h-5 text-[#FF6F61]" />
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1 space-y-4">
//           <h2 className="text-2xl font-semibold p-0 text-gray-900">
//             Order Summary
//           </h2>
//           <Card className="sticky top-24 rounded-2xl shadow-lg border p-7 border-gray-200">
//             <CardContent className="space-y-4 text-gray-700">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="font-medium">
//                   {formatCurrency(cartData?.data.totalCartPrice)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span className="text-green-600 font-medium">Free</span>
//               </div>
//               <div className="border-t pt-4 pb-5 flex justify-between font-semibold text-gray-900">
//                 <span>Total</span>
//                 <span className="text-[#FF6F61] text-lg">
//                   {formatCurrency(cartData?.data.totalCartPrice)}
//                 </span>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col gap-4">
//               <CheckoutSession cartId={cartData?.cartId} />
//               <Button
//                 asChild
//                 className="w-full bg-[#FF6F61] hover:bg-[#FF5A4C] text-white rounded-lg py-5 shadow-md hover:shadow-lg transition"
//               >
//                 <Link href={"/products"}>Continue Shopping</Link>
//               </Button>
//               {/* Clear All */}
//               <Button
//                 disabled={isLoadingClearing}
//                 onClick={() => clearCart()}
//                 variant="outline"
//                 className="w-full border-[#FF6F61] cursor-pointer text-[#FF6F61] hover:bg-[#FF6F61]/10 transition-all duration-200 flex items-center justify-center gap-2 rounded-lg py-3 font-medium sticky bottom-0"
//               >
//                 {isLoadingClearing ? (
//                   <Loader2 className="animate-spin text-[#FF6F61]" />
//                 ) : (
//                   <Trash2 />
//                 )}
//                 Clear All
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Loader2, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { CartContext } from "@/Context/CartContext";
import { CartResponse } from "@/interfaces/cartInterface";
import toast from "react-hot-toast";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { formatCurrency } from "@/Uitaltis/formatPrice";
import Image from "next/image";
import Link from "next/link";
import CheckoutSession from "../CheckoutSession/CheckoutSession";
import { getUserToken } from "@/Uitaltis/getToken";

export default function InnerCart() {
  const { cartData, setCartData } = useContext(CartContext);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  // Clear Entire Cart
  const clearCart = async () => {
    try {
      setClearing(true);
      const token = await getUserToken();
      if (!token) return toast.error("Please login first");

      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "DELETE",
        headers: { token },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      setCartData(null);
      toast.success("Cart cleared 🧹");
    } catch (error) {
      toast.error("Failed to clear cart ❌");
    } finally {
      setClearing(false);
    }
  };

  // Remove One Item
  const removeCartItem = async (productId: string) => {
    setLoadingId(productId);
    try {
      const token = await getUserToken();
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );

      const payload: CartResponse = await res.json();
      if (!res.ok) throw new Error(payload.message || "Failed to remove");

      toast.success("Item removed 🗑️");
      setCartData(payload.numOfCartItems > 0 ? payload : null);
    } catch (error) {
      toast.error("Failed to remove ❌");
    } finally {
      setLoadingId(null);
    }
  };

  // Update Item Quantity
  const changeCountProduct = async (productId: string, count: number) => {
    if (!cartData) return;

    const updatedProducts = cartData.data.products.map((p) =>
      p.product._id === productId ? { ...p, count } : p
    );
    setCartData({
      ...cartData,
      data: { ...cartData.data, products: updatedProducts },
    });

    setLoadingId(productId);

    try {
      const token = await getUserToken();
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          method: "PUT",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count }),
        }
      );

      const payload: CartResponse = await res.json();
      if (!res.ok) throw new Error(payload.message || "Failed to update");
      setCartData(payload);
    } catch (error) {
      toast.error("Failed to update quantity ❌");
    } finally {
      setLoadingId(null);
    }
  };

  if (!cartData?.data?.products?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-5 animate-fadeIn">
        <h2 className="text-3xl font-semibold text-gray-800">
          Your cart is empty 🛍️
        </h2>
        <Button
          asChild
          className="bg-[#FF6F61] hover:bg-[#FF5A4C] text-white px-8 py-5 rounded-lg"
        >
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        🛒 Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartData.data.products.map((item) => (
            <Card
              key={item.product._id}
              className="rounded-2xl border shadow-sm hover:shadow-md"
            >
              <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
                <div className="relative w-28 h-28 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={item.product.imageCover ?? ""}
                    alt={item.product.title ?? "Product"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.product.brand?.name} · {item.product.category?.name}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-[#FF6F61]">
                      {formatCurrency(item.price)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={
                          loadingId === item.product._id || item.count <= 1
                        }
                        onClick={() =>
                          changeCountProduct(item.product._id!, item.count - 1)
                        }
                      >
                        −
                      </Button>

                      <span className="min-w-[28px] text-center">
                        {loadingId === item.product._id ? (
                          <Loader2 className="animate-spin w-4 h-4 text-[#FF6F61]" />
                        ) : (
                          item.count
                        )}
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loadingId === item.product._id}
                        onClick={() =>
                          changeCountProduct(item.product._id!, item.count + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  disabled={loadingId === item.product._id}
                  onClick={() => removeCartItem(item.product._id!)}
                  className="hover:bg-red-50 rounded-full"
                >
                  {loadingId === item.product._id ? (
                    <Loader2 className="animate-spin text-[#FF6F61]" />
                  ) : (
                    <Trash2 className="w-5 h-5 text-[#FF6F61]" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="rounded-2xl border p-7 shadow-lg">
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartData.data.totalCartPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#FF6F61] text-lg">
                  {formatCurrency(cartData.data.totalCartPrice)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <CheckoutSession cartId={cartData.cartId} />
              <Button
                onClick={clearCart}
                disabled={clearing}
                variant="outline"
                className="border-[#FF6F61] text-[#FF6F61] hover:bg-[#FF6F61]/10"
              >
                {clearing ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Trash2 className="mr-2" />
                )}
                Clear All
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
