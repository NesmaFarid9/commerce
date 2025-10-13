import React from "react";
import { productI } from "./../../../interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "./../../../Uitaltis/formatPrice";
import { Star } from "lucide-react";
import AddToCart from "./_components/AddToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products`,
    {
      next: { revalidate: 60 },
    }
  );
  const { data: products }: { data: productI[] } = await response.json();

  if (!products || products.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">No products available</p>
    );
  }

  return (
    <>
      <h2 className="text-center pt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[#FF6F61] mb-10">
        Our Products
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: productI) => (
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
                <p className="text-xs text-gray-400">
                  {product.category?.name}
                </p>

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
                    {/* <ShoppingCart className="w-4 h-4" />  */}
                  </AddToCart>

                  {/* Remove from Wishlist */}
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                    // onClick={() => handleRemove(product.id)} // if you implement remove
                  ></Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
