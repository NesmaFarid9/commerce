"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
export default function ProductSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <>
              <CarouselItem key={index}>
                <Image
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </CarouselItem>{" "}
            </>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
