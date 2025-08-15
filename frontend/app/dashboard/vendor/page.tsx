"use client";

import { useUserProfile } from "@/hooks/useAPI";
import {
  Mail,
  Edit,
  TrendingUp,
  Package,
  Star,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SectionWrapper from "@/components/layout/SectionWrapper";
import VendorSidebar from "@/components/dashboard/VendorSidebar";

function VendorDashboardContent() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <VendorSidebar />

            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Total Sales</h3>
                    <DollarSign className="w-5 h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-3xl font-bold text-[#D7195B]">₦0</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Orders</h3>
                    <TrendingUp className="w-5 h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-3xl font-bold text-[#D7195B]">0</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Products</h3>
                    <Package className="w-5 h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-3xl font-bold text-[#D7195B]">0</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Rating</h3>
                    <Star className="w-5 h-5 text-[#D7195B]" />
                  </div>
                  <p className="text-3xl font-bold text-[#D7195B]">0.0</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Sales Chart
                  </h3>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <p>Sales chart will appear here</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Recent Orders
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-500 text-center py-8">
                      No orders yet
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
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

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/vendor/products"
                      className="block w-full bg-[#D7195B] text-white text-center py-2 px-4 rounded-lg hover:bg-[#B01548] transition-colors"
                    >
                      Add New Product
                    </Link>
                    <Link
                      href="/dashboard/vendor/profile"
                      className="block w-full bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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
