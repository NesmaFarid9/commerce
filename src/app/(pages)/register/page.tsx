"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import registerImg from "../../../assets/login.jpg";
import { schemaReg } from "@/app/Schema/schemaReg";
import { Card } from "@/Components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

type RegisterFields = z.infer<typeof schemaReg>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const router = useRouter();

  const form = useForm<RegisterFields>({
    resolver: zodResolver(schemaReg),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(values: RegisterFields) {
    try {
      setLoading(true);
      setApiError("");

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const payload = await response.json();
      console.log("API response:", payload);

      if (!response.ok) {
        setApiError(payload.message || "Something went wrong");
        return;
      }

      router.push("/login");
    } catch (err) {
      setApiError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-5">
      <Card className="w-full max-w-6xl shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Image */}
        <div className="hidden md:block relative bg-gray-100">
          <Image
            src={registerImg}
            alt="Register Illustration"
            fill
            className="object-fill"
            priority
          />
        </div>

        {/* Right side: Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h1>

          {apiError && (
            <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 transition"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showRePassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRePassword((prev) => !prev)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 transition"
                        >
                          {showRePassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <div className="min-h-[3px]">
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+201234567890"
                        {...field}
                      />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                disabled={loading}
                className="w-full cursor-pointer bg-[#FF6F61] hover:bg-[#e65a4f] text-white font-semibold py-2 rounded-lg transition"
                type="submit"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <span>Register</span>
                )}
              </Button>

              {/* Extra link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#FF6F61] font-medium hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
