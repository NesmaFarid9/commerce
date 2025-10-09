"use client";

import {
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Shopping Cart Icon */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <ShoppingBasketIcon
            className="w-16 h-16 text-[#FF6F61]"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
