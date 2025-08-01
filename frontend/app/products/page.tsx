"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Download,
  Heart,
} from "lucide-react";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Premium WordPress Theme",
      vendor: "TechVendor",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 124,
      downloads: 1200,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Web Templates",
      description:
        "A modern, responsive WordPress theme perfect for business websites.",
    },
    {
      id: 2,
      name: "Digital Marketing Course",
      vendor: "EduPro",
      price: 99.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 89,
      downloads: 567,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      category: "Courses",
      description:
        "Complete digital marketing course covering SEO, social media, and PPC.",
    },
    // Add more mock products...
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web-templates", label: "Web Templates" },
    { value: "courses", label: "Digital Courses" },
    { value: "design", label: "Design Resources" },
    { value: "business", label: "Business Tools" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "graphics", label: "Graphics" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 font-display mb-2">
            Digital Products
          </h1>
          <p className="text-neutral-600">
            Discover thousands of high-quality digital products from trusted
            vendors
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
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input w-full"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
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

            {/* View Mode Toggle */}
            <div className="flex border border-neutral-200 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary-500 text-white" : "text-neutral-600"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary-500 text-white" : "text-neutral-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`card group hover:shadow-medium transition-shadow duration-200 ${viewMode === "list" ? "flex" : ""}`}
            >
              <div
                className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className={`object-cover ${viewMode === "list" ? "w-full h-32 rounded-l-xl" : "w-full h-48 rounded-t-xl"}`}
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                    <Heart className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-500 transition-colors duration-200">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-500 mb-2">
                  by {product.vendor}
                </p>

                {viewMode === "list" && (
                  <p className="text-sm text-neutral-600 mb-3">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-secondary-400 fill-current"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-neutral-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Download className="w-4 h-4 mr-1" />
                    {product.downloads}
                  </div>
                </div>

                <button className="w-full btn-primary">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">
              2
            </button>
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">
              3
            </button>
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
