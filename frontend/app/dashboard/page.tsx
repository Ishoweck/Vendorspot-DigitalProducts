"use client";

import { useUserProfile, useLogout } from "@/hooks/useAPI";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: userProfile, isLoading, error } = useUserProfile();
  const logoutMutation = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (error && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D7195B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to access your dashboard.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#D7195B] text-white px-6 py-2 rounded-lg hover:bg-[#B01548] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const user = userProfile?.data?.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Vendorspot Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={() => logoutMutation.mutate()}
                className="bg-[#D7195B] text-white px-4 py-2 rounded-lg hover:bg-[#B01548] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                Your personalized dashboard is under development. Here's what we
                know about you:
              </p>

              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
                <div className="space-y-2 text-left">
                  <p>
                    <strong>Name:</strong> {user?.firstName} {user?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>
                  <p>
                    <strong>Status:</strong> {user?.status}
                  </p>
                  <p>
                    <strong>Email Verified:</strong>{" "}
                    {user?.isEmailVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Member Since:</strong>{" "}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  More features coming soon including:
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>• Product management</li>
                  <li>• Order tracking</li>
                  <li>• Sales analytics</li>
                  <li>• Profile settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
