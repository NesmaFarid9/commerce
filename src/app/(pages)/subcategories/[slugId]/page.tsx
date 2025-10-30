import { SubcategoryI } from "@/interfaces/subCategory";
import { productI } from "@/interfaces/product";
import { formatCurrency } from "@/Uitaltis/formatPrice";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../../products/_components/AddToCart/AddToCart";
export const dynamic = "force-dynamic";
interface SubCategoryBySlugProps {
  params: {
    slugId: string;
  };
}

export default async function SubCategoryBySlug({
  params,
}: SubCategoryBySlugProps) {
  const { slugId } = params;
  // Fetch single subcategory details
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${slugId}`,
    {
      cache: "no-store",
      next: { revalidate: 6000 },
    }
  );
  const { data: subCategory }: { data: SubcategoryI } = await response.json();

  // Fetch products for this subcategory
  const responseProduct = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory=${slugId}`,
    {
      cache: "no-store",
      next: { revalidate: 600 },
    }
  );
  const { data: filteredProducts }: { data: productI[] } =
    await responseProduct.json();

  return (
    <>
      {/* Title */}
      <h2 className="text-3xl font-bold mb-10 capitalize text-gray-800 text-center">
        {subCategory.name}{" "}
        <span className="text-gray-400">({filteredProducts.length})</span>
      </h2>

      {/* No Products */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this subcategory.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                <p className="text-xs text-gray-400">{subCategory.slug}</p>

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
                  </AddToCart>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
