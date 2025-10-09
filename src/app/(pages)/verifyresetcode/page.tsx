"use client";

import React, { useState } from "react";

import { Loader2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          body: JSON.stringify({ resetCode }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const payload = await response.json();

      if (response.ok) {
        toast.success("Code verified successfully!");
        setResetCode("");
        router.push("/resetpassword");
      } else {
        toast.error(payload.message || "Invalid or expired reset code.");
      }
    } catch {
      toast.error("Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="w-full rounded-2xl shadow-lg border border-gray-200 bg-white p-6 sm:p-8">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Verify Reset Code
            </CardTitle>
            <CardDescription className="text-gray-500">
              Enter the 6-digit code we sent to your email.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerifyCode} className="space-y-5">
              {/* Reset Code Input */}
              <div className="flex items-center border rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#FF6F61]">
                <span className="px-3 text-gray-400">
                  <KeyRound className="w-5 h-5" />
                </span>
                <Input
                  type="text"
                  placeholder="Enter your reset code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  maxLength={6}
                  required
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus:outline-none text-gray-700 text-lg tracking-widest"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FF6F61] hover:bg-[#e65a4f] text-white rounded-lg shadow-md flex items-center justify-center gap-2 py-3 text-base font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
