import { CategoryI } from "@/interfaces/category";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { Card, CardContent } from "@/Components/ui/card";

export default async function MainCategory() {
  let categories: CategoryI[] = [];

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (!json?.data) {
      throw new Error("Invalid API response");
    }

    categories = json.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }

  // Fallback UI if no categories
  if (!categories || categories.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p>⚠️ No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto py-12">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[#FF6F61] mb-10">
          Our Categories
        </h2>
        <Carousel className="pt-10 mx-auto w-full max-w-7xl">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category._id}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Card className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300">
                  <Link href={`/categories/${category._id}`}>
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-40 h-40 md:w-44 md:h-44 flex items-center justify-center">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={160}
                          height={160}
                          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <p className="mt-3 font-medium text-gray-800 text-sm md:text-base text-center line-clamp-1">
                        {category.name}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-10" />
          <CarouselNext className="hidden sm:flex -right-10" />
        </Carousel>
      </div>
    </>
  );
}
