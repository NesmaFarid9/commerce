import React from "react";
import MainCategory from "../categories/page";
import Brands from "../brands/page";
import Products from "../products/page";
import SliderHome from "@/Components/SliderHome/SliderHome";

export const dynamic = "force-dynamic"; 
export default function AllHome() {
  return (
    <>
      <SliderHome />
      <MainCategory />
      <Brands />
      <Products />
    </>
  );
}
