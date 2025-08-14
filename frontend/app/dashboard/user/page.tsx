"use client";

import { useUserProfile } from "@/hooks/useAPI";
import {
  Mail,
  ShoppingBag,
  CreditCard,
  Bell,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";

function UserDashboardContent() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="bg-[#D7195B] flex items-center justify-center mb-8"
        style={{ height: "280px" }}
      >
        <h1 className="text-white text-2xl font-medium">
          Advert Banner Sample
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <aside className="w-64 bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <h3 className="font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard/user/orders"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Orders</span>
              </Link>

              <Link
                href="/dashboard/user/payment-methods"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Payment Methods</span>
              </Link>

              <Link
                href="/dashboard/user/notifications"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Notifications</span>
              </Link>

              <Link
                href="/dashboard/user/shipping-address"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Shipping Address</span>
              </Link>

              <Link
                href="/dashboard/user/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Settings</span>
              </Link>
            </nav>
          </aside>

          <main className="flex-1 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </main>
        </div>
      </div>
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
