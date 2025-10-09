"use client";
import { productI } from "@/interfaces/product";
import { formatCurrency } from "@/Uitaltis/formatPrice";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AddToCart from "../products/_components/AddToCart/AddToCart";
import { WishContext } from "@/Context/WishContext";
import { Button } from "@/Components/ui/button";

export default function WishList() {
  const { wishProduct } = useContext(WishContext);

  if (!wishProduct || wishProduct.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-gray-500">Your wishlist is empty</p>
        <Link href="/products" className="mt-4">
          <Button className="bg-[#FF6F61] hover:bg-[#e65a4f] text-white px-6 py-2 rounded-lg shadow-md transition">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        ❤️ My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishProduct.map((product: productI) => (
          <div
            key={product.id}
            className="flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 overflow-hidden hover:scale-[1.02]"
          >
            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
              <div className="relative w-full h-56 bg-gray-50">
                <Image
                  src={product.imageCover ?? ""}
                  alt={product.title ?? "image"}
                  fill
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex flex-col flex-1 p-4">
              <Link href={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-[#FF6F61] transition line-clamp-1">
                  {product.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">{product.brand?.name}</p>
              <p className="text-xs text-gray-400">{product.category?.name}</p>

              {/* Rating */}
              <div className="flex items-center mt-2 gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {product.ratingsAverage?.toFixed(1) ?? "0.0"}
                </span>
              </div>

              {/* Price + Actions */}
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                {/* Price Badge */}
                <div className="bg-[#FF6F61] text-white px-4 py-1.5 rounded-lg font-semibold text-sm shadow-sm">
                  {formatCurrency(product.price!)}
                </div>

                {/* Add to Cart */}
                <AddToCart productId={product.id!}>
                  Add to cart
                  {/* <ShoppingCart className="w-4 h-4" /> Add */}
                </AddToCart>

                {/* Remove from Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                  // onClick={() => handleRemove(product.id)} // if you implement remove
                ></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
