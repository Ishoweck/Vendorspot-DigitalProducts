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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      orderNumber: "VS-2024-001",
      status: "DELIVERED",
      paymentStatus: "PAID",
      total: 129.98,
      currency: "NGN",
      createdAt: "2024-01-15T10:30:00Z",
      items: [
        {
          id: "1",
          product: {
            id: 1,
            name: "Premium WordPress Theme",
            vendor: "TechVendor",
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          },
          quantity: 1,
          price: 29.99,
          total: 29.99,
          downloadUrl: "https://example.com/download/theme.zip",
          downloadExpiry: "2024-02-15T10:30:00Z",
        },
        {
          id: "2",
          product: {
            id: 2,
            name: "Digital Marketing Course",
            vendor: "EduPro",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          },
          quantity: 1,
          price: 99.99,
          total: 99.99,
          downloadUrl: "https://example.com/download/course.zip",
          downloadExpiry: "2024-02-15T10:30:00Z",
        },
      ],
    },
    {
      id: "ORD-002",
      orderNumber: "VS-2024-002",
      status: "PROCESSING",
      paymentStatus: "PAID",
      total: 49.99,
      currency: "NGN",
      createdAt: "2024-01-20T14:15:00Z",
      items: [
        {
          id: "3",
          product: {
            id: 3,
            name: "Mobile App UI Kit",
            vendor: "DesignHub",
            image:
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
          },
          quantity: 1,
          price: 49.99,
          total: 49.99,
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "PROCESSING":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
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

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab;
  });

  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "DELIVERED").length,
    },
    {
      id: "processing",
      label: "Processing",
      count: orders.filter((o) => o.status === "PROCESSING").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === "CANCELLED").length,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Orders
                </h1>
                <p className="text-gray-600">
                  Track and manage your digital product orders
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          activeTab === tab.id
                            ? "border-[#D7195B] text-[#D7195B]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.label}
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="space-y-6">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg border border-gray-200"
                    >
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Order #{order.orderNumber}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ₦{order.total.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.items.length}{" "}
                              {order.items.length === 1 ? "item" : "items"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4"
                            >
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <Link href={`/products/${item.product.id}`}>
                                  <h4 className="font-medium text-gray-900 hover:text-[#D7195B] transition-colors duration-200">
                                    {item.product.name}
                                  </h4>
                                </Link>
                                <p className="text-sm text-gray-500">
                                  by {item.product.vendor}
                                </p>
                                <p className="text-sm text-gray-400">
                                  Quantity: {item.quantity}
                                </p>
                              </div>

                              <div className="text-right">
                                <div className="font-medium text-gray-900">
                                  ₦{item.total.toLocaleString()}
                                </div>
                              </div>

                              {order.status === "DELIVERED" &&
                                "downloadUrl" in item &&
                                item.downloadUrl && (
                                  <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </button>
                                    <Link
                                      href={`/orders/${order.id}`}
                                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View
                                    </Link>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {order.status === "DELIVERED" &&
                              order.items[0] &&
                              "downloadExpiry" in order.items[0] && (
                                <span>
                                  Downloads expire on{" "}
                                  {new Date(
                                    order.items[0].downloadExpiry || ""
                                  ).toLocaleDateString()}
                                </span>
                              )}
                          </div>
                          <div className="flex space-x-3">
                            <Link
                              href={`/orders/${order.id}`}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              View Details
                            </Link>
                            {order.status === "DELIVERED" && (
                              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Reorder
                              </button>
                            )}
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
