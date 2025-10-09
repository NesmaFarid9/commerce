"use client";
import React from "react";
import { Facebook, Instagram, Twitter, CreditCard, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import visa from "../../assets/visa.png";
import cash from "../../assets/cash.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1E1E] text-gray-300 py-7 mt-10 bottom-0">
      {/* Full-width container */}
      <div className="w-full bg-[#1E1E1E] py-10">
        <div className="max-w-[2000px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 sm:px-10">
          {/* Logo & About */}
          <div>
            <h1 className="text-2xl font-bold text-[#FF6F61] tracking-tight mb-2">
              <Link href={"/"}>
                Shopping{" "}
                <span className="bg-[#FF6F61] px-2 py-1 rounded text-white shadow-sm text-xl">
                  N
                </span>
              </Link>
            </h1>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover premium products with fast delivery and secure payments.
              Shop with confidence — wherever you are.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FF6F61] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#FF6F61] transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-[#FF6F61] transition"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#FF6F61] transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-white font-semibold mb-3">Payment Methods</h3>
            <div className="flex items-center flex-wrap gap-4">
              <div className="bg-white rounded-lg p-2 shadow">
                <CreditCard className="w-6 h-6 text-[#FF6F61]" />
              </div>
              <div className="bg-white rounded-lg p-2 shadow">
                <Wallet className="w-6 h-6 text-[#FF6F61]" />
              </div>
              <Image
                src={visa}
                alt="Visa"
                width={39}
                height={39}
                className="rounded-md"
              />
              <Image
                src={cash}
                alt="Cash"
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-[#FF6F61] transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#FF6F61] transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#FF6F61] transition">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400 w-full bg-[#1E1E1E]">
        © {new Date().getFullYear()} Shopping N. All rights reserved.
      </div>
    </footer>
  );
}
