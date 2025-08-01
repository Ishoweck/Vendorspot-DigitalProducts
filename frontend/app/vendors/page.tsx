"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Package, Users, Award, ArrowRight } from "lucide-react";

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  // Mock vendors data
  const vendors = [
    {
      id: 1,
      businessName: "TechVendor",
      businessDescription: "Premium digital solutions for modern businesses",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      rating: 4.8,
      totalSales: 1250,
      totalProducts: 45,
      verificationStatus: "APPROVED" as const,
      joinedDate: "2023-01-15",
      categories: ["Web Templates", "WordPress Themes", "UI Kits"],
    },
    {
      id: 2,
      businessName: "EduPro",
      businessDescription:
        "Educational content and online courses for professionals",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 4.9,
      totalSales: 890,
      totalProducts: 23,
      verificationStatus: "APPROVED" as const,
      joinedDate: "2023-03-20",
      categories: ["Courses", "Educational Content", "Tutorials"],
    },
    {
      id: 3,
      businessName: "DesignHub",
      businessDescription: "Creative design resources and digital assets",
      logo: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=200&h=200&fit=crop",
      rating: 4.7,
      totalSales: 2100,
      totalProducts: 78,
      verificationStatus: "APPROVED" as const,
      joinedDate: "2022-11-10",
      categories: ["Design Resources", "Graphics", "Icons"],
    },
    {
      id: 4,
      businessName: "BizTools",
      businessDescription: "Business tools and templates for entrepreneurs",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      rating: 4.6,
      totalSales: 567,
      totalProducts: 34,
      verificationStatus: "APPROVED" as const,
      joinedDate: "2023-06-05",
      categories: ["Business Tools", "Templates", "Spreadsheets"],
    },
  ];

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "sales", label: "Most Sales" },
    { value: "products", label: "Most Products" },
    { value: "newest", label: "Newest First" },
  ];

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.businessDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      vendor.categories.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 font-display mb-2">
            Trusted Vendors
          </h1>
          <p className="text-neutral-600">
            Discover verified vendors selling high-quality digital products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-full"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="card group hover:shadow-medium transition-shadow duration-200"
            >
              {/* Vendor Header */}
              <div className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image
                    src={vendor.logo}
                    alt={vendor.businessName}
                    fill
                    className="object-cover rounded-full"
                  />
                  {vendor.verificationStatus === "APPROVED" && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <Link href={`/vendors/${vendor.id}`}>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors duration-200">
                    {vendor.businessName}
                  </h3>
                </Link>

                <p className="text-neutral-600 text-sm mb-4">
                  {vendor.businessDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(vendor.rating)
                            ? "text-secondary-400 fill-current"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 ml-2">
                    {vendor.rating} rating
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">
                      {vendor.totalProducts}
                    </div>
                    <div className="text-xs text-neutral-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">
                      {vendor.totalSales.toLocaleString()}
                    </div>
                    <div className="text-xs text-neutral-500">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">
                      {new Date(vendor.joinedDate).getFullYear()}
                    </div>
                    <div className="text-xs text-neutral-500">Joined</div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {vendor.categories.slice(0, 3).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {vendor.categories.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                      +{vendor.categories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/vendors/${vendor.id}`}
                    className="flex-1 btn-primary"
                  >
                    View Store
                  </Link>
                  <Link
                    href={`/products?vendor=${vendor.id}`}
                    className="flex-1 btn-outline"
                  >
                    Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Vendor CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join our community of successful vendors and start earning from your
            digital products today.
          </p>
          <Link href="/register?vendor=true" className="btn-secondary">
            Become a Vendor
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Vendor Benefits */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 font-display mb-4">
              Why Sell on Vendorspot?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Join thousands of vendors who trust Vendorspot to grow their
              digital business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Large Customer Base
              </h3>
              <p className="text-neutral-600">
                Access thousands of potential customers actively looking for
                digital products.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-success-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Easy Product Management
              </h3>
              <p className="text-neutral-600">
                Simple tools to upload, manage, and track your digital products
                and sales.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Trusted Platform
              </h3>
              <p className="text-neutral-600">
                Secure payments, buyer protection, and verified vendor badges
                build trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
