"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Loader2,
  Menu,
  ShoppingCartIcon,
  User2Icon,
  X,
} from "lucide-react";
import { CartContext } from "@/Context/CartContext";
import { WishContext } from "@/Context/WishContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

export default function Navbar() {
  const { cartData, isLoading } = useContext(CartContext);
  const { wishProduct, isLoadingWish } = useContext(WishContext);
  const session = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuth = session.status === "authenticated";

  return (
    <nav className="p-4 sticky top-0 bg-white/90 backdrop-blur-md text-lg font-medium shadow-md z-[1000]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#FF6F61] tracking-tight">
          <Link href="/" className="flex items-center gap-1">
            Shopping{" "}
            <span className="bg-[#FF6F61] px-2 py-1 rounded text-white shadow-sm text-xl">
              N
            </span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/products"
            className="hover:text-[#FF6F61] transition-colors"
          >
            Products
          </Link>

          {isAuth && (
            <Link
              href="/alluserorders"
              className="hover:text-[#FF6F61] transition-colors"
            >
              Orders
            </Link>
          )}

          <Link
            href="/subcategories"
            className="hover:text-[#FF6F61] transition-colors"
          >
            Sub Categories
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          {isAuth ? (
            <>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative hover:scale-110 transition-transform"
              >
                <Heart className="text-red-500 fill-red-500 w-6 h-6" />
                <div className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 bg-[#FF6F61] text-white flex justify-center items-center">
                  <span className="text-xs font-medium">
                    {isLoadingWish ? (
                      <Loader2 className="animate-spin size-3" />
                    ) : (
                      wishProduct?.length || 0
                    )}
                  </span>
                </div>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative hover:scale-110 transition-transform"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <div className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 bg-[#FF6F61] text-white flex justify-center items-center">
                  <span className="text-xs font-medium">
                    {isLoading ? (
                      <Loader2 className="animate-spin size-3" />
                    ) : (
                      cartData?.numOfCartItems || 0
                    )}
                  </span>
                </div>
              </Link>

              {/* Greeting */}
              <p className="hidden sm:block text-sm text-gray-700 font-medium">
                Hi {session.data?.user?.name?.split(" ")[0]}
              </p>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-0">
                  <User2Icon className="w-7 h-7 text-gray-700 hover:text-[#FF6F61] transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuSeparator />
                  <Link href="/profile" className="cursor-pointer">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/mainhome" })}
                    className="text-red-500 hover:text-red-500 font-medium cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-sm px-5 cursor-pointer py-2 rounded-full shadow-sm hover:border-[#FF6F61] hover:text-[#FF6F61] transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#FF6F61] cursor-pointer hover:bg-[#e65a4f] text-white text-sm px-5 py-2 rounded-full shadow-sm transition-all">
                  Register
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#FF6F61] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t shadow-lg mt-3"
          >
            <div className="cursor-pointer flex flex-col items-center gap-4 py-4 text-base font-medium">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#FF6F61] transition-colors"
              >
                Products
              </Link>

              {isAuth && (
                <Link
                  href="/alluserorders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Orders
                </Link>
              )}

              <Link
                href="/subcategories"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#FF6F61] transition-colors"
              >
                Sub Categories
              </Link>

              {isAuth ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/mainhome" });
                    }}
                    className="text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
