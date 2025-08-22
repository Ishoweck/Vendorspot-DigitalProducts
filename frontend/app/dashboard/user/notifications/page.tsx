"use client";

import { useNotifications, useMarkNotificationAsRead } from "@/hooks/useAPI";
import { Bell } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AuthWrapper from "@/components/auth/AuthWrapper";

function NotificationsPageContent() {
  const { data: notificationsData, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();

  const notifications = notificationsData?.data?.data || [];

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Notifications
              </h1>

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
                      className={`border-l-4 p-4 cursor-pointer ${
                        notification.isRead
                          ? "bg-gray-50 border-gray-400"
                          : "bg-blue-50 border-blue-400"
                      }`}
                      onClick={() =>
                        !notification.isRead &&
                        handleMarkAsRead(notification._id)
                      }
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
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
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

export default function NotificationsPage() {
  return (
    <AuthWrapper>
      <NotificationsPageContent />
    </AuthWrapper>
  );
}
