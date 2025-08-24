"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { useOrders, useAddToCart, useDownloadProduct } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

function OrdersPageContent() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: ordersData, isLoading } = useOrders();
  const addToCart = useAddToCart();
  const downloadProduct = useDownloadProduct();
  const router = useRouter();

  const orders = ordersData?.data?.data || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "PROCESSING":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600 bg-green-50";
      case "PROCESSING":
        return "text-yellow-600 bg-yellow-50";
      case "CANCELLED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredOrders = orders.filter((order: any) => {
    if (activeTab === "all") return true;
    return (order.status || "").toLowerCase() === activeTab;
  });

  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "delivered",
      label: "Ready for Download",
      count: orders.filter((o: any) => o.status === "DELIVERED").length,
    },
    {
      id: "processing",
      label: "Processing",
      count: orders.filter((o: any) => o.status === "PROCESSING").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o: any) => o.status === "CANCELLED").length,
    },
  ];

  const handleDownload = (item: any) => {
    const productId = item.productId?._id || item.productId;
    if (productId) {
      downloadProduct.mutate(productId);
    }
  };

  const handleReorder = async (item: any) => {
    const productId = item.productId?._id || item.productId;
    const quantity = item.quantity || 1;
    try {
      await addToCart.mutateAsync({ productId, quantity });
      router.push("/cart");
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
          <div className="max-w-7xl mx-auto px-2 md:px-4">
            <div className="flex gap-4 md:gap-8">
              <UserSidebar />
              <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6 overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="space-y-4 md:space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 rounded-lg p-4 h-32"
                      ></div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6 overflow-hidden">
              <div className="mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Orders
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Track and manage your digital product orders
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 mb-4 md:mb-6">
                <div className="border-b border-gray-200">
                  <div className="overflow-x-auto scrollbar-hide">
                    <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 min-w-max">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                            activeTab === tab.id
                              ? "border-[#D7195B] text-[#D7195B]"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab.label}
                          <span className="ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 md:py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 text-center">
                    <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                      You haven&apos;t placed any orders yet.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center px-3 md:px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors text-sm md:text-base"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  filteredOrders.map((order: any) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-lg border border-gray-200"
                    >
                      <div className="p-4 md:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                                Order #{order.orderNumber}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-500">
                                Placed on{" "}
                                {order.createdAt
                                  ? new Date(
                                      order.createdAt
                                    ).toLocaleDateString()
                                  : ""}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              <span
                                className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(order.status)}`}
                              >
                                {order.status === "DELIVERED"
                                  ? "Ready for Download"
                                  : order.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 text-sm md:text-base">
                              ₦{order.total?.toLocaleString() || "0"}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">
                              {order.items?.length || 0}{" "}
                              {(order.items?.length || 0) === 1
                                ? "item"
                                : "items"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                          {order.items?.map((item: any) => (
                            <div
                              key={item._id || item.productId}
                              className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4"
                            >
                              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                                <Image
                                  src={
                                    item.productId?.thumbnail ||
                                    "/api/placeholder/80/80"
                                  }
                                  alt={
                                    item.name ||
                                    item.productId?.name ||
                                    "Product"
                                  }
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/products/${item.productId?._id || item.productId}`}
                                >
                                  <h4 className="font-medium text-gray-900 hover:text-[#D7195B] transition-colors duration-200 text-sm md:text-base">
                                    {item.name ||
                                      item.productId?.name ||
                                      "Product"}
                                  </h4>
                                </Link>
                                <p className="text-xs md:text-sm text-gray-500">
                                  by{" "}
                                  {item.vendorId?.businessName ||
                                    item.productId?.vendorId?.businessName ||
                                    "Unknown Vendor"}
                                </p>
                                <p className="text-xs md:text-sm text-gray-400">
                                  Quantity: {item.quantity || 1}
                                </p>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
                                <div className="text-right">
                                  <div className="font-medium text-gray-900 text-sm md:text-base">
                                    ₦
                                    {(
                                      item.total || item.price * item.quantity
                                    )?.toLocaleString() || "0"}
                                  </div>
                                </div>

                                {order.status === "DELIVERED" && (
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                      onClick={() => handleDownload(item)}
                                      className="inline-flex items-center px-2 md:px-3 py-1 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                      <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                      Download
                                    </button>

                                    <button
                                      onClick={() => handleReorder(item)}
                                      className="inline-flex items-center px-2 md:px-3 py-1 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                      Reorder
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                          <div className="text-xs md:text-sm text-gray-500">
                            {order.status === "DELIVERED" && order.items[0] && (
                              <span>
                                Downloads: {order.items[0].downloadCount || 0}/
                                {order.items[0].downloadLimit || "∞"}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                            <Link
                              href={`/dashboard/user/orders/${order._id}`}
                              className="inline-flex items-center px-2 md:px-3 py-1 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthWrapper>
      <OrdersPageContent />
    </AuthWrapper>
  );
}
