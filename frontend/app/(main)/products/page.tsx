"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Star, Grid3X3, List, ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

const categories = [
  "All Categories",
  "Web Templates",
  "Graphics",
  "E-books",
  "Courses",
  "Software",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

const products = [
  {
    id: 1,
    name: "Modern E-commerce Website Template",
    price: 25000,
    category: "Web Templates",
    vendor: "TechDesigns",
    rating: 4.8,
    reviews: 156,
    downloads: 542,
    thumbnail: "/api/placeholder/300/200",
    description:
      "Fully responsive e-commerce template with modern design and clean code",
  },
  {
    id: 2,
    name: "Logo Design Bundle Pack",
    price: 15000,
    category: "Graphics",
    vendor: "CreativeStudio",
    rating: 4.6,
    reviews: 89,
    downloads: 324,
    thumbnail: "/api/placeholder/300/200",
    description:
      "Collection of 50+ professional logo designs for various industries",
  },
  {
    id: 3,
    name: "Digital Marketing Mastery Course",
    price: 45000,
    category: "Courses",
    vendor: "LearnHub",
    rating: 4.9,
    reviews: 234,
    downloads: 167,
    thumbnail: "/api/placeholder/300/200",
    description:
      "Complete digital marketing course with practical examples and case studies",
  },
  {
    id: 4,
    name: "Business Analytics Dashboard",
    price: 35000,
    category: "Software",
    vendor: "DataSoft",
    rating: 4.7,
    reviews: 78,
    downloads: 89,
    thumbnail: "/api/placeholder/300/200",
    description:
      "Interactive dashboard template for business analytics and reporting",
  },
  {
    id: 5,
    name: "Complete Branding Guide PDF",
    price: 8000,
    category: "E-books",
    vendor: "BrandMasters",
    rating: 4.5,
    reviews: 112,
    downloads: 445,
    thumbnail: "/api/placeholder/300/200",
    description: "Comprehensive guide to building a strong brand identity",
  },
  {
    id: 6,
    name: "Social Media Templates Pack",
    price: 12000,
    category: "Graphics",
    vendor: "SocialDesigns",
    rating: 4.8,
    reviews: 198,
    downloads: 623,
    thumbnail: "/api/placeholder/300/200",
    description:
      "200+ social media post templates for Instagram, Facebook, and Twitter",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 12;

  const vendors = Array.from(new Set(products.map((p) => p.vendor)));

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    const matchesVendor = !selectedVendor || product.vendor === selectedVendor;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesRating &&
      matchesVendor
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <SectionWrapper className="pt-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          <aside
            className={`w-80 bg-white rounded-lg shadow-sm p-6 space-y-6 transition-all duration-300 ${showFilters ? "block" : "hidden"} lg:block`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-[#D7195B] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Vendor</h3>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
              >
                <option value="">All Vendors</option>
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Product Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1, 0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      minRating === rating
                        ? "bg-[#D7195B] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex">{renderStars(rating)}</div>
                    <span className="text-sm">& up</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                    <p className="text-gray-600">
                      {filteredProducts.length} products found
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "grid"
                            ? "bg-[#D7195B] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "list"
                            ? "bg-[#D7195B] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
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

              <div className="p-6">
                {paginatedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                ) : (
                  <>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <div className="relative">
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-3 right-3">
                                <span className="bg-[#D7195B] text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center gap-1 mb-2">
                                {renderStars(product.rating)}
                                <span className="text-sm text-gray-600 ml-1">
                                  ({product.reviews})
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-lg font-bold text-[#D7195B]">
                                    ₦{product.price.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    by {product.vendor}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {product.downloads} downloads
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {paginatedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <div className="flex gap-4 p-4">
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                      {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                      {product.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        {renderStars(product.rating)}
                                        <span>({product.reviews})</span>
                                      </div>
                                      <span>by {product.vendor}</span>
                                      <span>{product.downloads} downloads</span>
                                    </div>
                                  </div>
                                  <div className="text-right ml-4">
                                    <span className="bg-[#D7195B] text-white px-2 py-1 rounded-full text-xs font-medium">
                                      {product.category}
                                    </span>
                                    <p className="text-lg font-bold text-[#D7195B] mt-2">
                                      ₦{product.price.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className="px-4 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
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
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SectionWrapper>
  );
}
