"use client";

import { useState } from "react";
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
    type: "payment_received",
    title: "Payment Received",
    message: "₦29,990 payment received for order #VS-2024-002",
    timestamp: "3 days ago",
    isRead: true,
    amount: "₦29,990",
  },
  {
    id: 5,
    type: "new_order",
    title: "New Order Received",
    message: "Order #VS-2024-004 for 'Mobile App UI Kit' has been placed",
    timestamp: "1 week ago",
    isRead: true,
    orderId: "VS-2024-004",
  },
  {
    id: 6,
    type: "product_review",
    title: "New Product Review",
    message: "Your 'Premium WordPress Theme' received a 4-star review",
    timestamp: "1 week ago",
    isRead: true,
    productName: "Premium WordPress Theme",
  },
  {
    id: 7,
    type: "order_completed",
    title: "Order Completed",
    message: "Order #VS-2024-005 has been successfully delivered to customer",
    timestamp: "2 weeks ago",
    isRead: true,
    orderId: "VS-2024-005",
  },
  {
    id: 8,
    type: "payment_received",
    title: "Payment Received",
    message: "₦49,990 payment received for order #VS-2024-006",
    timestamp: "2 weeks ago",
    isRead: true,
    amount: "₦49,990",
  },
  {
    id: 9,
    type: "new_order",
    title: "New Order Received",
    message: "Order #VS-2024-007 for 'Digital Marketing Course' has been placed",
    timestamp: "3 weeks ago",
    isRead: true,
    orderId: "VS-2024-007",
  },
  {
    id: 10,
    type: "product_review",
    title: "New Product Review",
    message: "Your 'Mobile App UI Kit' received a 5-star review",
    timestamp: "3 weeks ago",
    isRead: true,
    productName: "Mobile App UI Kit",
  },
];

export default function VendorNotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;
  const totalPages = Math.ceil(mockVendorNotifications.length / notificationsPerPage);
  
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const currentNotifications = mockVendorNotifications.slice(startIndex, endIndex);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_order":
        return <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />;
      case "order_completed":
        return <Package className="w-4 h-4 md:w-5 md:h-5 text-green-600" />;
      case "product_review":
        return <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />;
      case "payment_received":
        return <Package className="w-4 h-4 md:w-5 md:h-5 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />;
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
      case "payment_received":
        return "bg-green-50 border-green-400";
      default:
        return "bg-gray-50 border-gray-400";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Notifications
              </h1>
              
              {currentNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 md:space-y-4">
                    {currentNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`border-l-4 p-3 md:p-4 ${getNotificationColor(notification.type, notification.isRead)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2 md:gap-3">
                            {getNotificationIcon(notification.type)}
                            <div>
                              <p className="font-medium text-gray-900 text-sm md:text-base">
                                {notification.title}
                              </p>
                              <p className="text-gray-700 text-xs md:text-sm">
                                {notification.message}
                              </p>
                              {notification.orderId && (
                                <button className="text-sm text-[#D7195B] hover:text-[#B01548] mt-1">
                                  View Order Details
                                </button>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 text-sm"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-[#D7195B] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 text-sm"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
