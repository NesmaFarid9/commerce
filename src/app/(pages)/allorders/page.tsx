"use client";

import { Button } from "@/Components/ui/button";
import { AllOrderI } from "@/interfaces/allOrderInterface";
import { jwtDecode } from "jwt-decode";
import { Loader2, ShoppingBag, CreditCard, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [lastOrder, setLastOrder] = useState<AllOrderI | null>(null);
  const [loading, setLoading] = useState(true);

  const incodedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQwMDIxNmZlYWZjMDAzZDQ4ZjZmMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NjEwOTMyLCJleHAiOjE3NjUzODY5MzJ9.CNHIWb6HykyYDG8GNXeTyMmB923nYx9HUSTGW7tRxrQ";

  const { id }: { id: string } = jwtDecode(incodedToken);

  async function getOrder() {
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        { cache: "no-store" }
      );
      const payload = await response.json();
      console.log("Orders payload:", payload);

      const allOrders: AllOrderI[] = Array.isArray(payload) ? payload : [];
      const paidOrders = allOrders.filter((order) => order.isPaid);
      const last = paidOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      setLastOrder(last || null);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#FF6F61] animate-spin" />
      </div>
    );
  }

  if (!lastOrder) {
    return (
      <div className="text-center text-gray-500 py-20">
        <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <p>No paid orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FF6F61]/10 p-3 rounded-full">
          <ShoppingBag className="w-6 h-6 text-[#FF6F61]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Last Order
        </h2>
      </div>

      {/* Order Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
        {/* Order Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <p className="font-medium text-gray-700">
              Order ID:{" "}
              <span className="text-[#FF6F61] font-semibold">
                #{lastOrder._id}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(lastOrder.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              Paid
            </span>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                lastOrder.isDelivered
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {lastOrder.isDelivered ? "Delivered" : "Not Delivered"}
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {lastOrder.cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:shadow-sm transition"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <p className="text-sm font-medium line-clamp-1 text-gray-800">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Qty: {item.count} — {item.price} EGP
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="w-4 h-4 text-[#FF6F61]" />
            <p>
              Payment Method:{" "}
              <span className="font-medium text-gray-800">
                {lastOrder.paymentMethodType.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-semibold mt-3 sm:mt-0">
            <Truck className="w-4 h-4 text-[#FF6F61]" />
            <p>Total: {lastOrder.totalOrderPrice} EGP</p>
          </div>
        </div>

        {/* Button */}
        <div className="text-right mt-6">
          <Button className="bg-[#FF6F61] hover:bg-[#e65a4f] text-white shadow-sm transition">
            <Link href="/alluserorders">Show All Previous Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
