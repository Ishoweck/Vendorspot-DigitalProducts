"use client";

import { useState } from "react";
import { MapPin, Plus, Edit3, Trash2 } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

const mockShippingAddresses = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos",
    zipCode: "100001",
    phone: "+234 123 456 7890",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    address: "456 Office Complex",
    city: "Abuja",
    state: "FCT",
    zipCode: "900001",
    phone: "+234 987 654 3210",
    isDefault: false,
  },
];

export default function ShippingAddressPage() {
  const [shippingAddresses, setShippingAddresses] = useState(
    mockShippingAddresses
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddAddress = () => {
    setShowAddForm(true);
  };

  const handleEditAddress = (id: number) => {
    const addressToEdit = shippingAddresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setEditingId(id);
      setFormData({
        name: addressToEdit.name,
        address: addressToEdit.address,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zipCode: addressToEdit.zipCode,
        phone: addressToEdit.phone,
      });
      setShowAddForm(true);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    addressId: number | null;
  }>({ isOpen: false, addressId: null });

  const handleDeleteAddress = (id: number) => {
    setDeleteConfirm({ isOpen: true, addressId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.addressId) {
      setShippingAddresses((prev) =>
        prev.filter((address) => address.id !== deleteConfirm.addressId)
      );
      setDeleteConfirm({ isOpen: false, addressId: null });
    }
  };

  const handleSetDefault = (id: number) => {
    setShippingAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
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
                  Shipping Address
                </h1>
                <button
                  onClick={handleAddAddress}
                  className="inline-flex items-center px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </button>
              </div>

              {shippingAddresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No shipping addresses
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add a shipping address for faster checkout.
                  </p>
                  <button
                    onClick={handleAddAddress}
                    className="inline-flex items-center px-4 py-2 bg-[#D7195B] text-white rounded-md hover:bg-[#B01548] transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {shippingAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {address.name}
                            </p>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-gray-600">{address.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Default
                            </span>
                          )}
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefault(address.id)}
                              className="text-sm text-[#D7195B] hover:text-[#B01548]"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => handleEditAddress(address.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
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
                      Add Shipping Address
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="123 Main Street"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="Lagos"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            placeholder="Lagos"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            placeholder="100001"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            placeholder="+234 123 456 7890"
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
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <ConfirmationModal
                isOpen={deleteConfirm.isOpen}
                title="Delete Address"
                message="Are you sure you want to delete this shipping address? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
                onCancel={() =>
                  setDeleteConfirm({ isOpen: false, addressId: null })
                }
              />
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
