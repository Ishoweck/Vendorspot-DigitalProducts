"use client";

import { useNotifications, useMarkNotificationAsRead } from "@/hooks/useAPI";
import { Bell } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AuthWrapper from "@/components/auth/AuthWrapper";

function NotificationsPageContent() {
  const { data: notificationsData, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();

  const notifications = (notificationsData?.data?.data as any)?.notifications || [];
  const unreadCount = (notificationsData?.data?.data as any)?.unreadCount || 0;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "PAYMENT_SUCCESS":
        return "💰";
      case "ORDER_PAYMENT_RECEIVED":
        return "📦";
      case "ORDER_CREATED":
        return "🛒";
      case "ORDER_CONFIRMED":
        return "✅";
      case "ORDER_SHIPPED":
        return "🚚";
      case "ORDER_DELIVERED":
        return "🎉";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    if (isRead) return "bg-gray-50 border-gray-400";

    switch (type) {
      case "PAYMENT_SUCCESS":
        return "bg-green-50 border-green-400";
      case "ORDER_PAYMENT_RECEIVED":
        return "bg-blue-50 border-blue-400";
      case "ORDER_CREATED":
        return "bg-purple-50 border-purple-400";
      default:
        return "bg-blue-50 border-blue-400";
    }
  };

  const getNotificationTextColor = (type: string, isRead: boolean) => {
    if (isRead) return "text-gray-900";

    switch (type) {
      case "PAYMENT_SUCCESS":
        return "text-green-900";
      case "ORDER_PAYMENT_RECEIVED":
        return "text-blue-900";
      case "ORDER_CREATED":
        return "text-purple-900";
      default:
        return "text-blue-900";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <SectionWrapper className="pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              <UserSidebar />
              <main className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-20 bg-gray-100 rounded border-l-4 border-gray-300"
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
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification: any) => (
                    <div
                      key={notification._id}
                      className={`border-l-4 p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${getNotificationColor(
                        notification.type,
                        notification.isRead
                      )}`}
                      onClick={() =>
                        !notification.isRead &&
                        handleMarkAsRead(notification._id)
                      }
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium ${getNotificationTextColor(
                              notification.type,
                              notification.isRead
                            )}`}
                          >
                            {notification.title}
                          </p>
                          <p
                            className={`text-sm mt-1 ${
                              notification.isRead
                                ? "text-gray-700"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.message}
                          </p>
                          {notification.data && (
                            <div className="mt-2 text-xs text-gray-500">
                              {notification.data.orderNumber && (
                                <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                                  Order: {notification.data.orderNumber}
                                </span>
                              )}
                              {notification.data.amount && (
                                <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                                  ₦{notification.data.amount.toLocaleString()}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span
                            className={`text-xs ${
                              notification.isRead
                                ? "text-gray-600"
                                : "text-blue-600"
                            }`}
                          >
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
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

export default function NotificationsPage() {
  return (
    <AuthWrapper>
      <NotificationsPageContent />
    </AuthWrapper>
  );
}
