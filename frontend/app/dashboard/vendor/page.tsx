"use client";

import {
  useUserProfile,
  useVendorDashboard,
  useVendorProfile,
} from "@/hooks/useAPI";
import {
  Mail,
  TrendingUp,
  Package,
  Star,
  DollarSign,
  ShoppingCart,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SectionWrapper from "@/components/layout/SectionWrapper";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import { useSocket } from "@/hooks/useSocket";
import { formatDistanceToNow } from "date-fns";

function VendorDashboardContent() {
  const { data: userProfile } = useUserProfile();
  const { data: dashboardData } = useVendorDashboard();
  const { data: vendorProfile } = useVendorProfile();
  const user = userProfile?.data?.data;
  const vendor = vendorProfile?.data?.data;
  const stats = dashboardData?.data?.data?.stats;
  const recentOrders = dashboardData?.data?.data?.recentOrders || [];
  useSocket();

  // Generate sample sales data for chart (in real app, this would come from API)
  const generateSalesData = () => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        sales: Math.floor(Math.random() * 50000) + 10000, // Random sales between 10k-60k
      });
    }
    return data;
  };

  const salesData = generateSalesData();

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CONFIRMED":
        return "text-blue-600 bg-blue-100";
      case "PROCESSING":
        return "text-purple-600 bg-purple-100";
      case "SHIPPED":
        return "text-indigo-600 bg-indigo-100";
      case "DELIVERED":
        return "text-green-600 bg-green-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

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
                <div className="bg-gradient-to-r from-[#D7195B] to-[#B01548] text-white rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm md:text-base">
                      Total Sales
                    </h3>
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-white">
                    ₦{stats?.totalRevenue?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm md:text-base">
                      Orders
                    </h3>
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-white">
                    {stats?.totalOrders || 0}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm md:text-base">
                      Products
                    </h3>
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-white">
                    {stats?.totalProducts || 0}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 md:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm md:text-base">
                      Rating
                    </h3>
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-white">
                    {stats?.rating?.toFixed(1) || "0.0"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Sales Chart (Last 7 Days)
                  </h3>
                  <div className="h-32 md:h-48">
                    <div className="flex items-end justify-between h-full space-x-1">
                      {salesData.map((item, index) => {
                        const maxSales = Math.max(
                          ...salesData.map((d) => d.sales)
                        );
                        const height = (item.sales / maxSales) * 100;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              ₦{(item.sales / 1000).toFixed(0)}k
                            </div>
                            <div
                              className="w-full bg-[#D7195B] rounded-t transition-all duration-300 hover:bg-[#B01548]"
                              style={{ height: `${height}%` }}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                              {item.date}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Recent Orders
                  </h3>
                  <div className="space-y-3">
                    {recentOrders.length === 0 ? (
                      <p className="text-gray-500 text-center py-6 md:py-8 text-sm md:text-base">
                        No orders yet
                      </p>
                    ) : (
                      recentOrders.slice(0, 5).map((order: any) => (
                        <div
                          key={order._id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#D7195B] rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {order.userId?.firstName}{" "}
                                {order.userId?.lastName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(
                                  new Date(order.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ₦{order.totalAmount?.toLocaleString() || "0"}
                            </p>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
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
                      {vendor?.businessName || "Not set"}
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
