"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import loginImg from "../../../../../assets/login.jpg";
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

const formSchema = z.object({
  email: z.string().nonempty("Invalid email"),
  password: z.string().nonempty("Password is required"),
});
type LoginFields = z.infer<typeof formSchema>;

export function LoginForm() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(searchParams.get("error"));
  const [showPassword, setShowPassword] = useState(false);

  const login = useForm<LoginFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFields) {
    setIsLoading(true);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/allmain",
      redirect: true,
    });
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-5xl py-20 shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Left side: Image */}
      <div className="hidden md:block relative bg-gray-100">
        <Image
          src={loginImg}
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side: Form */}
      <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h1>

        {apiError && (
          <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
        )}

        <Form {...login}>
          <form onSubmit={login.handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <FormField
              control={login.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nesma@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password with Eye Toggle */}
            <FormField
              control={login.control}
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
                        className="pr-10 "
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Link
                href="/forgetpassword"
                className="text-sm text-gray-600 hover:text-[#FF6F61] transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              className="w-full bg-[#FF6F61] cursor-pointer hover:bg-[#e65a4f] text-white font-semibold py-2 rounded-lg transition"
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
