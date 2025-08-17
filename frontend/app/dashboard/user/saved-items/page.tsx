"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

const mockSavedItems = [
  {
    id: 1,
    name: "Digital Marketing Course",
    vendor: "EduPro",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop",
  },
  {
    id: 2,
    name: "SEO Optimization Tool",
    vendor: "MarketingPro",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop",
  },
];

export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState(mockSavedItems);

  const handleToggleLike = (itemId: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Saved Items
                </h1>
                <div className="text-sm text-gray-500">
                  {savedItems.length} items saved
                </div>
              </div>

              {savedItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No saved items
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Items you like will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        by {item.vendor}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">
                          ₦{item.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleToggleLike(item.id)}
                          className="text-[#D7195B] hover:text-[#B01548] transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
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
