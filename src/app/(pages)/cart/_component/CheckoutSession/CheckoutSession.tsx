"use client";

import { useRef, useState } from "react";

import { Loader2, CreditCard, Wallet, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { getUserToken } from "@/Uitaltis/getToken";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function CheckoutSession({ cartId }: { cartId: string }) {
  const city = useRef<HTMLInputElement>(null);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const [isLoadingVisa, setIsLoadingVisa] = useState(false);
  const [isLoadingCash, setIsLoadingCash] = useState(false);

  const getShippingAddress = () => ({
    city: city.current?.value || "",
    details: details.current?.value || "",
    phone: phone.current?.value || "",
  });

  async function checkOutVisa(e: React.MouseEvent) {
    e.preventDefault();
    setIsLoadingVisa(true);
    try {
      const shippingAddress = getShippingAddress();
      const token = await getUserToken();

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
        {
          method: "POST",
          body: JSON.stringify({ shippingAddress }),
          headers: {
            token: token + "",
            "Content-Type": "application/json",
          },
        }
      );

      const payload = await response.json();
      if (payload?.session?.url) {
        location.href = payload.session.url;
      } else alert("Something went wrong with Visa payment session.");
    } catch (error) {
      console.error(error);
      alert("Error starting Visa checkout.");
    } finally {
      setIsLoadingVisa(false);
    }
  }

  async function checkOutCash(e: React.MouseEvent) {
    e.preventDefault();
    setIsLoadingCash(true);
    try {
      const shippingAddress = getShippingAddress();
      const token = await getUserToken();

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          method: "POST",
          body: JSON.stringify({ shippingAddress }),
          headers: {
            token: token + "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data?.status === "success") {
        location.href = "/allorders";
      } else alert("Cash payment failed.");
    } catch (error) {
      console.error(error);
      alert("Error during Cash checkout.");
    } finally {
      setIsLoadingCash(false);
    }
  }

  return (
    <Dialog>
      {/* Checkout trigger button */}
      <DialogTrigger asChild>
        <Button className="w-full py-3 text-lg cursor-pointer font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 transition-all duration-200 shadow-md">
          Checkout
        </Button>
      </DialogTrigger>

      {/* Checkout Dialog */}
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-7 bg-white shadow-2xl border border-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <DialogHeader className="space-y-1 text-center mb-4">
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <MapPin className="text-[#FF6F61] h-5 w-5" />
              Shipping Information
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Please fill in your details to continue with your order.
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="city" className="font-medium text-gray-700">
                City
              </Label>
              <Input
                ref={city}
                id="city"
                placeholder="e.g. Cairo"
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="font-medium text-gray-700">
                Address Details
              </Label>
              <Input
                ref={details}
                id="details"
                placeholder="Street, Building, Apartment"
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  ref={phone}
                  id="phone"
                  type="tel"
                  placeholder="+20 10 1234 5678"
                  className="pl-9 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <DialogFooter className="flex flex-col gap-3 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 border-gray-300 cursor-pointer hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </DialogClose>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={checkOutCash}
                  className="flex-1 mt-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                  disabled={isLoadingCash}
                >
                  {isLoadingCash ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" /> Pay Cash
                    </>
                  )}
                </Button>

                <Button
                  onClick={checkOutVisa}
                  className="flex-1 mt-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg"
                  disabled={isLoadingVisa}
                >
                  {isLoadingVisa ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" /> Pay Visa
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
