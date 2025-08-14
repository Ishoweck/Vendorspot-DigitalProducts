"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useAPI";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "CUSTOMER" | "VENDOR" | "ADMIN" | "MODERATOR";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { data: userProfile, isLoading, error } = useUserProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isLoading && (error || !userProfile?.data?.data)) {
      router.push("/login");
      return;
    }

    if (requiredRole && userProfile?.data?.data?.role !== requiredRole) {
      router.push("/dashboard");
      return;
    }
  }, [userProfile, isLoading, error, requiredRole, router, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D7195B]"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D7195B]"></div>
      </div>
    );
  }

  if (error || !userProfile?.data?.data) {
    return null;
  }

  if (requiredRole && userProfile.data.data.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#D7195B] text-white px-6 py-2 rounded-lg hover:bg-[#B01548] transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
