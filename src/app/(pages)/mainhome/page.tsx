import { Button } from "@/Components/ui/button";
import Link from "next/link";
import React from "react";

export default function MainHome() {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center  min-h-screen px-6">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Welcome to <span className="text-[#FF6F61]">Your Store</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
          Discover the latest products at unbeatable prices. Shop smarter, live
          better.
        </p>

        {/* Call to Action */}
        <div className="mt-6">
          <Button
            asChild
            className="bg-[#FF6F61] hover:bg-[#e65a4f] text-white px-8 py-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition duration-300"
          >
            <Link href="/allhome">Shop Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
