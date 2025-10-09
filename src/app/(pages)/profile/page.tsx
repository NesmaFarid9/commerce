"use client";

import { User, Mail } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <>
      <section className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"></div>

          <div className="relative flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FF6F61] to-[#FF6221] flex items-center justify-center text-white shadow-md">
              <User size={56} />
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-gray-800">
            {session?.user?.name || "User Profile"}
          </h2>
          <p className="text-gray-500 mb-6">Welcome back 👋</p>

          {/* Details */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
              <Mail className="text-[#FF6F61]" size={20} />
              <span className="truncate">
                {session?.user?.email || "Not available"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
