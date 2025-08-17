"use client";

import { useState } from "react";
import { Truck, Edit3, Save, X } from "lucide-react";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

const mockShippingRates = [
  {
    id: 1,
    name: "Standard Delivery",
    description: "3-5 business days",
    price: 2000,
    isActive: true,
  },
  {
    id: 2,
    name: "Express Delivery",
    description: "1-2 business days",
    price: 5000,
    isActive: true,
  },
  {
    id: 3,
    name: "Same Day Delivery",
    description: "Same day delivery",
    price: 8000,
    isActive: false,
  },
];

export default function VendorShippingPage() {
  const [shippingRates, setShippingRates] = useState(mockShippingRates);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const handleEdit = (rate: any) => {
    setEditingId(rate.id);
    setEditPrice(rate.price.toString());
  };

  const handleSave = (id: number) => {
    setShippingRates((prev) =>
      prev.map((rate) =>
        rate.id === id
          ? {
              ...rate,
              price: parseFloat(editPrice),
            }
          : rate
      )
    );
    setEditingId(null);
    setEditPrice("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditPrice("");
  };

  const toggleActive = (id: number) => {
    setShippingRates((prev) =>
      prev.map((rate) =>
        rate.id === id ? { ...rate, isActive: !rate.isActive } : rate
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Shipping Management
              </h1>

              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">
                  Shipping Rates
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {shippingRates.map((rate) => (
                    <div
                      key={rate.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100 gap-3"
                    >
                      <div className="flex-1">
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">
                            {rate.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {rate.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        {editingId === rate.id ? (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">₦</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="w-20 md:w-24 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7195B]"
                              />
                            </div>
                            <button
                              onClick={() => handleSave(rate.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-gray-600 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-gray-900 text-sm md:text-base">
                              ₦{rate.price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleEdit(rate)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleActive(rate.id)}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                rate.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {rate.isActive ? "Active" : "Inactive"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-[#D7195B]/10 border border-[#D7195B]/20 rounded-lg p-4">
                <h4 className="font-medium text-[#D7195B] mb-2 text-sm md:text-base">
                  Shipping Tips
                </h4>
                <ul className="text-sm text-[#D7195B]/80 space-y-1">
                  <li>• Set competitive rates to attract more customers</li>
                  <li>
                    • Offer multiple delivery options for better customer
                    experience
                  </li>
                  <li>
                    • Consider your product type when setting delivery times
                  </li>
                  <li>• Monitor shipping costs to maintain profitability</li>
                </ul>
              </div>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
