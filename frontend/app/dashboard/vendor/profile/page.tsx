"use client";

import { User, Mail, Building, Calendar, Edit3, Save, X, Camera } from "lucide-react";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { useState, useRef } from "react";

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
  profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

export default function VendorProfilePage() {
  const [profile, setProfile] = useState(mockVendorProfile);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({
          ...prev,
          profilePicture: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
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
              <p className="text-gray-900 text-sm md:text-base">{value}</p>
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
      <SectionWrapper className="pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-3 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Profile</h1>

              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#D7195B] rounded-full flex items-center justify-center overflow-hidden">
                      {profile.profilePicture ? (
                        <img
                          src={profile.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      )}
                    </div>
                    <button
                      onClick={handleProfilePictureClick}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D7195B] rounded-full flex items-center justify-center hover:bg-[#B01548] transition-colors"
                    >
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {profile.businessName}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">{profile.description}</p>
                    <p className="text-sm text-gray-500">
                      Joined {new Date(profile.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {renderField(
                    "Business Name",
                    "businessName",
                    profile.businessName,
                    false,
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

              <div className="mt-4 md:mt-6 bg-[#D7195B]/10 border border-[#D7195B]/20 rounded-lg p-4">
                <h4 className="font-medium text-[#D7195B] mb-2 text-sm md:text-base">Profile Tips</h4>
                <ul className="text-sm text-[#D7195B]/80 space-y-1">
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
