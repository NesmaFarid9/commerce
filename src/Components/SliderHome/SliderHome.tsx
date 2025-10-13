"use client";

import image1 from "../../assets/img1.jpeg";
import image3 from "../../assets/img3.jpg";
import image4 from "../../assets/img4.jpg";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function SliderHome() {
  return (
    <div className="container mx-auto pt-10 px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="relative rounded-2xl shadow-lg overflow-hidden"
      >
        <CarouselContent>
          {[image1, image3, image4].map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src={img}
                  alt={`slide-${index}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-6 text-white space-y-2">
                  <h2 className="text-2xl md:text-4xl font-bold drop-shadow-md">
                    Welcome to Our Store
                  </h2>
                  <p className="text-sm md:text-base max-w-md drop-shadow-sm">
                    Discover the latest collections and best deals today.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
