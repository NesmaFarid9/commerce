import { Params } from "next/dist/server/request/params";

import { Star } from "lucide-react";
import { productI } from "./../../../../interfaces/product";
import AddToCart from "../_components/AddToCart/AddToCart";
import { formatCurrency } from "@/Uitaltis/formatPrice";
import ProductSlider from "../_components/AddToCart/ProductSlider/ProductSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const { data: product }: { data: productI } = await response.json();

  return (
    <section className="min-h-screen py-10 px-4 flex justify-center items-start">
      <Card className="max-w-4xl w-full shadow-lg rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left: Product Images */}
          <div className="bg-white rounded-lg flex items-center justify-center p-4 border">
            <ProductSlider images={product.images!} title={product.title!} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-6">
            <CardHeader className="p-0 space-y-3">
              <CardTitle className="text-2xl font-semibold text-gray-900 leading-snug">
                {product.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {product.description}
              </CardDescription>
              <div className="flex gap-6 text-sm text-gray-700">
                <span>
                  Category:{" "}
                  <span className="font-semibold text-[#FF6F61]">
                    {product.category?.name}
                  </span>
                </span>
                <span>
                  Brand:{" "}
                  <span className="font-semibold">{product.brand?.name}</span>
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-5">
              {/* Rating & Price */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
                  <p className="text-sm font-medium text-gray-800">
                    {product.ratingsAverage?.toFixed(1)}{" "}
                    <span className="text-xs text-gray-500">
                      ({product.ratingsQuantity} reviews)
                    </span>
                  </p>
                </div>
                <p className="text-2xl font-bold text-[#FF6F61]">
                  {formatCurrency(product.price!)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <AddToCart productId={product.id!}>
                  <span className="px-6 py-2 text-sm font-medium">
                    Add to Cart
                  </span>
                </AddToCart>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}
