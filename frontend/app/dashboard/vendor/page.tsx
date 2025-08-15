"use client";

import { useUserProfile } from "@/hooks/useAPI";
import {
  Mail,
  TrendingUp,
  Package,
  Star,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SectionWrapper from "@/components/layout/SectionWrapper";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import { useSocket } from "@/hooks/useSocket";

function VendorDashboardContent() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;
  useSocket();

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-8">
            <VendorSidebar />

            <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 border-b border-gray-200 pb-2 md:pb-3">
                Vendor Dashboard
              </h1>

              {!user?.isEmailVerified && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-yellow-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">
                        Email Verification Required
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please verify your email to start selling products.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                <div className="bg-gray-50 rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Total Sales
                    </h3>
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-[#D7195B]">
                    ₦0
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Orders
                    </h3>
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-[#D7195B]">
                    0
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Products
                    </h3>
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-[#D7195B]">
                    0
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Rating
                    </h3>
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-[#D7195B]">
                    0.0
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Sales Chart
                  </h3>
                  <div className="h-32 md:h-48 flex items-center justify-center text-gray-500">
                    <p className="text-sm md:text-base">
                      Sales chart will appear here
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Recent Orders
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-500 text-center py-6 md:py-8 text-sm md:text-base">
                      No orders yet
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Store Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Business Name:</span>{" "}
                      {user?.businessName || "Not set"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Member Since:</span>{" "}
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/vendor/products"
                      className="block w-full bg-[#D7195B] text-white text-center py-2 px-4 rounded-lg hover:bg-[#B01548] transition-colors text-sm md:text-base"
                    >
                      Add New Product
                    </Link>
                    <Link
                      href="/dashboard/vendor/profile"
                      className="block w-full bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base"
                    >
                      Update Profile
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default function VendorDashboardPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <VendorDashboardContent />
    </AuthWrapper>
  );
}
