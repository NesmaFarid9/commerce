"use client";

import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function forgetPassword(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const payload = await response.json();

      if (response.ok) {
        toast.success("📧 Reset code sent to your email.");
        router.push("/verifyresetcode");
        setEmail("");
      } else {
        toast.error(payload.message || "Something went wrong.");
      }
    } catch {
      toast.error("Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white p-6 sm:p-8">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 whitespace-nowrap">
              Forgot Password?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={forgetPassword} className="space-y-5">
              {/* Email Input */}
              <div className="flex items-center w-full border rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#FF6F61]">
                <span className="px-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus:outline-none text-gray-700"
                />
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#FF6F61] hover:bg-[#e65a4f] text-white rounded-lg shadow-md flex items-center justify-center gap-2 py-3 text-base font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending..
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
              {/* Back to login */}
              <div className="text-center text-sm text-gray-500 pt-3">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[#FF6F61] hover:underline font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
