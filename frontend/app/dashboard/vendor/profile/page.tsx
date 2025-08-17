"use client";

import { User, Mail, Building, Calendar, Edit3, Save, X } from "lucide-react";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { useState } from "react";

const mockVendorProfile = {
  id: 1,
  businessName: "TechVendor",
  description: "Premium Digital Products",
  email: "vendor@techvendor.com",
  phone: "+234 123 456 7890",
  website: "https://techvendor.com",
  address: "123 Tech Street, Lagos, Nigeria",
  joinedDate: "2024-01-01T00:00:00Z",
  isVerified: true,
  rating: 4.8,
  totalSales: 125450,
  totalProducts: 15,
};

export default function VendorProfilePage() {
  const [profile, setProfile] = useState(mockVendorProfile);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = (field: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: editValue,
    }));
    setEditingField(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const renderField = (
    label: string,
    field: string,
    value: string,
    editable: boolean = true,
    icon: any
  ) => {
    const isEditing = editingField === field;

    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7195B]"
                />
                <button
                  onClick={() => handleSave(field)}
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
              </div>
            ) : (
              <p className="text-gray-900">{value}</p>
            )}
          </div>
        </div>
        {editable && !isEditing && (
          <button
            onClick={() => handleEdit(field, value)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#D7195B] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {profile.businessName}
                    </h3>
                    <p className="text-gray-600">{profile.description}</p>
                    <p className="text-sm text-gray-500">
                      Joined {new Date(profile.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {renderField(
                    "Business Name",
                    "businessName",
                    profile.businessName,
                    true,
                    <Building className="w-4 h-4 text-gray-600" />
                  )}
                  {renderField(
                    "Email",
                    "email",
                    profile.email,
                    false,
                    <Mail className="w-4 h-4 text-gray-600" />
                  )}
                  {renderField(
                    "Phone",
                    "phone",
                    profile.phone,
                    true,
                    <Mail className="w-4 h-4 text-gray-600" />
                  )}
                  {renderField(
                    "Website",
                    "website",
                    profile.website,
                    true,
                    <Building className="w-4 h-4 text-gray-600" />
                  )}
                  {renderField(
                    "Address",
                    "address",
                    profile.address,
                    true,
                    <Building className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gradient-to-r from-[#D7195B] to-[#B01548] text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Total Sales</h3>
                  <p className="text-3xl font-bold">
                    ₦{profile.totalSales.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Rating</h3>
                  <p className="text-3xl font-bold">{profile.rating}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Products</h3>
                  <p className="text-3xl font-bold">{profile.totalProducts}</p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Profile Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Keep your business information up to date</li>
                  <li>• Add a professional profile picture</li>
                  <li>• Write a compelling business description</li>
                  <li>• Include your website and contact information</li>
                </ul>
              </div>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
