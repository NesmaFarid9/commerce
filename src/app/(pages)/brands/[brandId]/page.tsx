import { BrandI } from "@/interfaces/brandInterface";
import Image from "next/image";

import { productI } from "@/interfaces/product";
import { Star } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { formatCurrency } from "@/Uitaltis/formatPrice";
import AddToCart from "../../products/_components/AddToCart/AddToCart";
export const dynamic = "force-dynamic";
export default async function SpecificBrand({
  params,
}: {
  params: { brandId: string; brandName: string };
}) {
  const { brandId } = params;
  // Fetch brand info
  const brandResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    { method: "GET", cache: "no-store" }
  );
  const { data: brand }: { data: BrandI } = await brandResponse.json();
  // Fetch products by brand
  const productResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { method: "GET", cache: "no-store" }
  );
  const { data: products }: { data: productI[] } = await productResponse.json();

  return (
    <div className="p-6 space-y-12">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center">
        <Image
          src={brand.image}
          alt={brand.name}
          width={150}
          height={150}
          className="rounded-full shadow-md"
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
          {brand.name}
        </h1>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-56">
                  <Image
                    src={product.imageCover ?? ""}
                    alt={product.title ?? "image"}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex flex-col flex-1 p-4">
                <Link href={`/products/${product.id}`}>
                  <CardHeader className="p-0">
                    <CardTitle className="line-clamp-1 text-lg font-semibold text-gray-800 hover:text-[#FF6F61] transition">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {product.category?.name}
                    </CardDescription>
                    <p className="text-xs text-gray-400">
                      {product.brand?.name}
                    </p>
                  </CardHeader>
                </Link>

                <CardContent className="p-0 mt-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.ratingsAverage?.toFixed(1) ?? "0.0"}
                    </span>
                  </div>

                  {/* Price + Add to Cart */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {/* Price Badge */}
                    <div className="bg-[#FF6F61] text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
                      {formatCurrency(product.price!)}
                    </div>
                    <AddToCart productId={product.id!}>Add to cart</AddToCart>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center text-2xl font-bold h-[40vh] text-gray-600">
          No products found for this brand
        </div>
      )}
    </div>
  );
}
