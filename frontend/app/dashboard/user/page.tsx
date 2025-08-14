"use client";

import { useUserProfile } from "@/hooks/useAPI";
import { Mail, Edit } from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SectionWrapper from "@/components/layout/SectionWrapper";
import UserSidebar from "@/components/dashboard/UserSidebar";

function UserDashboardContent() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div
          className="bg-[#D7195B] flex items-center justify-center mb-8"
          style={{ height: "280px" }}
        >
          <h1 className="text-white text-2xl font-medium">
            Advert Banner Sample
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />

            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Dashboard
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
                        Please verify your email to unlock all features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Total Orders
                  </h3>
                  <p className="text-3xl font-bold text-[#D7195B]">0</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Saved Items
                  </h3>
                  <p className="text-3xl font-bold text-[#D7195B]">0</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Account Status
                  </h3>
                  <p className="text-lg font-medium text-green-600">Active</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Account Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {user?.phone || "Not provided"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Member Since:</span>{" "}
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Shipping Address
                    </h3>
                    <Link
                      href="/dashboard/user/shipping-address"
                      className="text-[#D7195B] hover:text-[#B01548] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>No default shipping address set</p>
                    <Link
                      href="/dashboard/user/shipping-address"
                      className="text-[#D7195B] hover:text-[#B01548] transition-colors mt-2 inline-block"
                    >
                      Add shipping address
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

export default function UserDashboardPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <UserDashboardContent />
    </AuthWrapper>
  );
}
