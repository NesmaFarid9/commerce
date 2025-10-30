"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { AllOrderI } from "@/interfaces/allOrderInterface";
import { jwtDecode } from "jwt-decode";
import { getUserToken } from "@/Uitaltis/getToken";
export default function AllOrders() {
  const [orders, setOrders] = useState<AllOrderI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // Get token and decode user ID
        const encodedToken = await getUserToken();

        if (!encodedToken) {
          console.error("No user token found");
          setLoading(false);
          return;
        }
        const { id }: { id: string } = jwtDecode(encodedToken);

        // Fetch orders
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch orders");

        const payload = await response.json();
        const allOrders: AllOrderI[] = Array.isArray(payload) ? payload : [];
        setOrders(allOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FF6F61]/10 p-3 rounded-full">
          <ShoppingBag className="w-6 h-6 text-[#FF6F61]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Orders History
        </h2>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <p className="text-gray-700 font-medium">
                  Order ID: <span className="text-[#FF6F61]">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center gap-3">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.isDelivered
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:shadow-sm transition"
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
                      Qty: {item.count} | {item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CreditCard className="w-4 h-4 text-primary" />
                <p>
                  Payment Method:{" "}
                  <span className="font-medium text-gray-800">
                    {order.paymentMethodType.toUpperCase()}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3 sm:mt-0 text-gray-700 font-medium">
                <Truck className="w-4 h-4 text-primary" />
                <p>Total: {order.totalOrderPrice} EGP</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button className="bg-[#FF6F61] hover:bg-[#e65a4f] text-white shadow-sm transition">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
