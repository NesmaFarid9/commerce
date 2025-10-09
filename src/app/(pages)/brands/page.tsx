import { Card, CardContent } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { BrandI } from "@/interfaces/brandInterface";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands`,
    {
      method: "GET",
    }
  );
  const { data: brands }: { data: BrandI[] } = await response.json();

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[#FF6F61] mb-10">
        Our Brands
      </h2>

      <Carousel className="relative">
        <CarouselContent className="flex items-center">
          {brands.map((brand) => (
            <CarouselItem
              key={brand._id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 px-3"
            >
              <Link href={`/brands/${brand._id}`} className="group block">
                <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 flex justify-center items-center">
                      <Image
                        src={brand.image}
                        alt={brand.name || "brand-image"}
                        width={80}
                        height={80}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-700 group-hover:text-[#FF6F61] transition-colors">
                      {brand.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center" />
        <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center" />
      </Carousel>
    </div>
  );
}
