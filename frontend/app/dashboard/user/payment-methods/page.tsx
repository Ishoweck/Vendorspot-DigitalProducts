"use client";

import { useState } from "react";
import { CreditCard, Plus, Edit3, Trash2 } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

const mockPaymentMethods = [
  {
    id: 1,
    type: "credit_card",
    last4: "1234",
    brand: "Visa",
    expiryMonth: "12",
    expiryYear: "26",
    isDefault: true,
  },
  {
    id: 2,
    type: "credit_card",
    last4: "5678",
    brand: "Mastercard",
    expiryMonth: "08",
    expiryYear: "25",
    isDefault: false,
  },
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    methodId: number | null;
  }>({ isOpen: false, methodId: null });

  const handleAddPaymentMethod = () => {
    setShowAddForm(true);
  };

  const handleEditPaymentMethod = (id: number) => {
    setEditingId(id);
    setShowAddForm(true);
  };

  const handleDeletePaymentMethod = (id: number) => {
    setDeleteConfirm({ isOpen: true, methodId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.methodId) {
      setPaymentMethods((prev) => 
        prev.filter((method) => method.id !== deleteConfirm.methodId)
      );
      setDeleteConfirm({ isOpen: false, methodId: null });
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Payment Methods
                </h1>
                <button
                  onClick={handleAddPaymentMethod}
                  className="inline-flex items-center px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </button>
              </div>

              {paymentMethods.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No payment methods
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add a payment method to make purchases faster.
                  </p>
                  <button
                    onClick={handleAddPaymentMethod}
                    className="inline-flex items-center px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              **** **** **** {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Default
                            </span>
                          )}
                          {!method.isDefault && (
                            <button
                              onClick={() => handleSetDefault(method.id)}
                              className="text-sm text-[#D7195B] hover:text-[#B01548]"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => handleEditPaymentMethod(method.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePaymentMethod(method.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddForm && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setShowAddForm(false);
                    }
                  }}
                >
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Add Payment Method
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                        >
                          Add Card
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <ConfirmationModal
                isOpen={deleteConfirm.isOpen}
                title="Delete Payment Method"
                message="Are you sure you want to delete this payment method? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false, methodId: null })}
              />
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
