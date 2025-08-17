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
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
} from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const order = {
    id: params.id,
    orderNumber: "VS-2024-001",
    status: "DELIVERED",
    paymentStatus: "PAID",
    total: 129.98,
    subtotal: 119.98,
    tax: 10.0,
    currency: "NGN",
    createdAt: "2024-01-15T10:30:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Lagos",
      state: "Lagos",
      zipCode: "100001",
      phone: "+234 123 456 7890",
    },
    items: [
      {
        id: "1",
        product: {
          id: 1,
          name: "Premium WordPress Theme",
          vendor: "TechVendor",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          description:
            "A premium WordPress theme with modern design and advanced features.",
        },
        quantity: 1,
        price: 29.99,
        total: 29.99,
        downloadUrl: "https://example.com/download/theme.zip",
        downloadExpiry: "2024-02-15T10:30:00Z",
        downloadCount: 2,
        maxDownloads: 5,
      },
      {
        id: "2",
        product: {
          id: 2,
          name: "Digital Marketing Course",
          vendor: "EduPro",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          description:
            "Comprehensive digital marketing course covering all aspects of online marketing.",
        },
        quantity: 1,
        price: 99.99,
        total: 99.99,
        downloadUrl: "https://example.com/download/course.zip",
        downloadExpiry: "2024-02-15T10:30:00Z",
        downloadCount: 1,
        maxDownloads: 3,
      },
    ],
  };

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

  const handleDownload = async (itemId: string, downloadUrl: string) => {
    setDownloading(itemId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1">
              <div className="mb-6">
                <Link
                  href="/dashboard/user/orders"
                  className="inline-flex items-center text-[#D7195B] hover:text-[#B01548] mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Orders
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order #{order.orderNumber}
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            {order.status}
                          </h2>
                          <p className="text-sm text-gray-500">
                            Order placed on{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                by {item.product.vendor}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.product.description}
                              </p>
                              <div className="mt-2 text-sm text-gray-500">
                                <span>Quantity: {item.quantity}</span>
                                <span className="mx-2">•</span>
                                <span>
                                  Downloads: {item.downloadCount}/
                                  {item.maxDownloads}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">
                                ₦{item.total.toLocaleString()}
                              </div>
                              {order.status === "DELIVERED" &&
                                item.downloadUrl && (
                                  <div className="mt-2 space-y-2">
                                    <button
                                      onClick={() =>
                                        handleDownload(
                                          item.id,
                                          item.downloadUrl!
                                        )
                                      }
                                      disabled={
                                        downloading === item.id ||
                                        item.downloadCount >= item.maxDownloads
                                      }
                                      className="w-full inline-flex items-center justify-center px-3 py-1 border border-[#D7195B] rounded-md text-sm font-medium text-[#D7195B] hover:bg-[#D7195B] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {downloading === item.id ? (
                                        <>
                                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                                          Downloading...
                                        </>
                                      ) : (
                                        <>
                                          <Download className="w-4 h-4 mr-2" />
                                          Download
                                        </>
                                      )}
                                    </button>
                                    <p className="text-xs text-gray-500">
                                      Expires:{" "}
                                      {new Date(
                                        item.downloadExpiry
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          ₦{order.subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">
                          ₦{order.tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="font-bold text-lg text-[#D7195B]">
                          ₦{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Payment Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Shipping Address
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.shippingAddress.name}
                          </p>
                          <p className="text-gray-600">
                            {order.shippingAddress.address}
                          </p>
                          <p className="text-gray-600">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p className="text-gray-600">
                            {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>
                    </div>
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
