"use client";

import { Bell, Package, ShoppingCart, Star } from "lucide-react";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

const mockVendorNotifications = [
  {
    id: 1,
    type: "new_order",
    title: "New Order Received",
    message: "Order #VS-2024-003 for 'Premium WordPress Theme' has been placed",
    timestamp: "30 minutes ago",
    isRead: false,
    orderId: "VS-2024-003",
  },
  {
    id: 2,
    type: "order_completed",
    title: "Order Completed",
    message: "Order #VS-2024-001 has been successfully delivered to customer",
    timestamp: "2 hours ago",
    isRead: false,
    orderId: "VS-2024-001",
  },
  {
    id: 3,
    type: "product_review",
    title: "New Product Review",
    message: "Your 'Digital Marketing Course' received a 5-star review",
    timestamp: "1 day ago",
    isRead: true,
    productName: "Digital Marketing Course",
  },
  {
    id: 4,
    type: "brand_request",
    title: "Brand Partnership Request",
    message: "TechCorp wants to partner with your brand for exclusive products",
    timestamp: "3 days ago",
    isRead: true,
    brandName: "TechCorp",
  },
  {
    id: 5,
    type: "payment_received",
    title: "Payment Received",
    message: "₦29,990 payment received for order #VS-2024-002",
    timestamp: "1 week ago",
    isRead: true,
    amount: "₦29,990",
  },
];

export default function VendorNotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_order":
        return <ShoppingCart className="w-5 h-5 text-blue-600" />;
      case "order_completed":
        return <Package className="w-5 h-5 text-green-600" />;
      case "product_review":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "brand_request":
        return <Bell className="w-5 h-5 text-purple-600" />;
      case "payment_received":
        return <Package className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    if (isRead) return "bg-gray-50 border-gray-400";

    switch (type) {
      case "new_order":
        return "bg-blue-50 border-blue-400";
      case "order_completed":
        return "bg-green-50 border-green-400";
      case "product_review":
        return "bg-yellow-50 border-yellow-400";
      case "brand_request":
        return "bg-purple-50 border-purple-400";
      case "payment_received":
        return "bg-green-50 border-green-400";
      default:
        return "bg-gray-50 border-gray-400";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Notifications
              </h1>

              {mockVendorNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockVendorNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-l-4 p-4 ${getNotificationColor(notification.type, notification.isRead)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div>
                            <p
                              className={`font-medium ${
                                notification.isRead
                                  ? "text-gray-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p
                              className={`text-sm ${
                                notification.isRead
                                  ? "text-gray-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.message}
                            </p>
                            {notification.orderId && (
                              <button className="text-sm text-[#D7195B] hover:text-[#B01548] mt-1">
                                View Order Details
                              </button>
                            )}
                            {notification.brandName && (
                              <div className="flex gap-2 mt-2">
                                <button className="text-sm bg-[#D7195B] text-white px-3 py-1 rounded hover:bg-[#B01548]">
                                  Accept Request
                                </button>
                                <button className="text-sm border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50">
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          className={`text-xs ${
                            notification.isRead
                              ? "text-gray-600"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
