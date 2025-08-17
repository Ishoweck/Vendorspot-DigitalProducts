"use client";

import { Bell } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

const mockNotifications = [
  {
    id: 1,
    type: "order_delivered",
    title: "Order Delivered",
    message: "Your order #VS-2024-001 has been delivered",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    type: "payment_processed",
    title: "Payment Processed",
    message: "Payment for order #VS-2024-002 processed successfully",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 3,
    type: "product_update",
    title: "Product Update Available",
    message: "A new version of 'Premium WordPress Theme' is available",
    timestamp: "3 days ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Notifications
              </h1>

              {mockNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-l-4 p-4 ${
                        notification.isRead
                          ? "bg-gray-50 border-gray-400"
                          : "bg-blue-50 border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`font-medium ${
                              notification.isRead
                                ? "text-gray-900"
                                : "text-blue-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p
                            className={`text-sm ${
                              notification.isRead
                                ? "text-gray-700"
                                : "text-blue-700"
                            }`}
                          >
                            {notification.message}
                          </p>
                        </div>
                        <span
                          className={`text-xs ${
                            notification.isRead
                              ? "text-gray-600"
                              : "text-blue-600"
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
