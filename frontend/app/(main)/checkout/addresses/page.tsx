"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, MapPin, Check } from "lucide-react";
import { useUserProfile } from "@/hooks/useAPI";

export default function CheckoutAddressesPage() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "Nigeria",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    if (user) {
      const userAddresses = user.addresses || [];
      if (user.defaultAddress) {
        userAddresses.unshift(user.defaultAddress);
      }
      setAddresses(userAddresses);
      setSelectedAddressId(user.defaultAddress?._id || "");
    }
    setIsLoading(false);
  }, [user]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleSaveAndSelect = () => {
    if (selectedAddressId) {
      window.location.href = "/checkout";
    }
  };

  const handleAddNewAddress = () => {
    if (newAddress.street && newAddress.city && newAddress.phone) {
      const newAddr = {
        _id: Date.now().toString(),
        ...newAddress,
        fullName: newAddress.fullName || `${user?.firstName} ${user?.lastName}`,
      };
      setAddresses([...addresses, newAddr]);
      setSelectedAddressId(newAddr._id);
      setNewAddress({
        fullName: "",
        street: "",
        city: "",
        state: "",
        country: "Nigeria",
        phone: "",
        isDefault: false,
      });
      setShowAddForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/checkout"
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Checkout
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 font-display mb-2">
            Select Delivery Address
          </h1>
          <p className="text-neutral-600">
            Choose where you'd like your order delivered
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all duration-200 ${
                selectedAddressId === address._id
                  ? "border-primary-500 bg-primary-50"
                  : "border-transparent hover:border-neutral-200"
              }`}
              onClick={() => handleAddressSelect(address._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={selectedAddressId === address._id}
                      onChange={() => handleAddressSelect(address._id)}
                      className="mr-3 text-primary-600"
                    />
                    <h3 className="font-semibold text-neutral-900">
                      {address.fullName || `${user?.firstName} ${user?.lastName}`}
                    </h3>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="ml-6 text-neutral-600">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state}</p>
                    <p>{address.country}</p>
                    <p className="mt-1 font-medium">{address.phone}</p>
                  </div>
                </div>
                {selectedAddressId === address._id && (
                  <Check className="w-6 h-6 text-primary-600" />
                )}
              </div>
            </div>
          ))}

          {showAddForm ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-primary-200">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Add New Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newAddress.fullName}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, fullName: e.target.value })
                    }
                    placeholder={`${user?.firstName} ${user?.lastName}`}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newAddress.phone}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 mb-4">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, isDefault: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-sm text-neutral-700">
                  Set as default address
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddNewAddress}
                  className="btn-primary"
                >
                  Add Address
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-white rounded-xl shadow-sm p-6 border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors duration-200 flex items-center justify-center text-neutral-600 hover:text-primary-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Address
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveAndSelect}
            disabled={!selectedAddressId}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save and Select Address
          </button>
        </div>
      </div>
    </div>
  );
}