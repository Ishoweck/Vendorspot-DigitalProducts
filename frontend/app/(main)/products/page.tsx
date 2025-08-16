"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  Grid3X3,
  List,
  X,
  Heart,
  ShoppingCart,
} from "lucide-react";

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
    soldCount: 542,
    thumbnail: "/api/placeholder/200/150",
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
    soldCount: 324,
    thumbnail: "/api/placeholder/200/150",
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
    soldCount: 167,
    thumbnail: "/api/placeholder/200/150",
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
    soldCount: 89,
    thumbnail: "/api/placeholder/200/150",
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
    soldCount: 445,
    thumbnail: "/api/placeholder/200/150",
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
    soldCount: 623,
    thumbnail: "/api/placeholder/200/150",
    description:
      "200+ social media post templates for Instagram, Facebook, and Twitter",
  },
];

function Sidebar({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  selectedVendor,
  setSelectedVendor,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  showFilters,
  setShowFilters,
  onApplyPriceFilter,
  onResetRating,
}) {
  const [vendorSearch, setVendorSearch] = useState("");
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);

  const vendors = Array.from(new Set(products.map((p) => p.vendor)));
  const filteredVendors = vendors.filter((vendor) =>
    vendor.toLowerCase().includes(vendorSearch.toLowerCase())
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <>
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-80 bg-white shadow-lg lg:shadow-sm lg:rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6 z-50 transform transition-transform duration-300 overflow-y-auto ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  selectedCategory === category
                    ? "text-[#D7195B] bg-pink-50"
                    : "text-gray-600 hover:bg-gray-50"
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
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D7195B] focus:border-[#D7195B] text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Vendor</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={vendorSearch}
              onChange={(e) => setVendorSearch(e.target.value)}
              onFocus={() => setShowVendorDropdown(true)}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D7195B] focus:border-[#D7195B] text-sm"
            />
            {(vendorSearch || selectedVendor) && (
              <button
                onClick={() => {
                  setVendorSearch("");
                  setSelectedVendor("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {showVendorDropdown && vendorSearch && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <button
                    key={vendor}
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setVendorSearch(vendor);
                      setShowVendorDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                  >
                    {vendor}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedVendor && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-[#D7195B] rounded text-xs">
                {selectedVendor}
                <button
                  onClick={() => {
                    setSelectedVendor("");
                    setVendorSearch("");
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
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
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D7195B] focus:border-[#D7195B] text-sm"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D7195B] focus:border-[#D7195B] text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={onApplyPriceFilter}
                className="px-4 py-1 bg-[#D7195B] text-white rounded text-sm hover:bg-[#b8154d]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Product Rating</h3>
            <button
              onClick={onResetRating}
              className="text-xs text-[#D7195B] hover:text-[#b8154d]"
            >
              Reset
            </button>
          </div>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="text-[#D7195B] focus:ring-[#D7195B]"
                />
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-sm text-gray-600">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

function ProductCard({ product, viewMode }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex gap-3 p-3">
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-20 h-16 object-cover rounded flex-shrink-0"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-1">
              {product.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span>({product.reviews})</span>
              </div>
              <p className="font-semibold text-[#D7195B]">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-32 object-cover"
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2">
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-[#D7195B] text-white rounded-full hover:bg-[#b8154d] transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <p className="font-semibold text-[#D7195B] text-sm">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function SortDropdown({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        Sort by: {sortOptions.find((opt) => opt.value === sortBy)?.label}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="sort"
                checked={sortBy === option.value}
                onChange={() => {
                  setSortBy(option.value);
                  setIsOpen(false);
                }}
                className="text-[#D7195B] focus:ring-[#D7195B]"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 20;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const formattedCategory =
        categoryParam.charAt(0).toUpperCase() +
        categoryParam.slice(1).toLowerCase();
      const matchingCategory = categories.find(
        (cat) => cat.toLowerCase() === formattedCategory.toLowerCase()
      );
      if (matchingCategory) {
        setSelectedCategory(matchingCategory);
      }
    }
  }, []);

  const handleApplyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  const handleResetRating = () => {
    setMinRating(0);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= appliedPriceRange[0] &&
      product.price <= appliedPriceRange[1];
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
        return b.soldCount - a.soldCount;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const categoryName =
    selectedCategory === "All Categories" ? "Products" : selectedCategory;

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onApplyPriceFilter={handleApplyPriceFilter}
            onResetRating={handleResetRating}
          />

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">
                      <span className="font-bold">{categoryName}</span> (
                      {filteredProducts.length} products found)
                    </h1>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
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

                    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                  </div>
                </div>
              </div>

              <div className="p-4">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                        {paginatedProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {paginatedProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                          />
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
                          className="px-4 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: Math.min(totalPages, 5) },
                            (_, i) => {
                              let page;
                              if (totalPages <= 5) {
                                page = i + 1;
                              } else if (currentPage <= 3) {
                                page = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                              } else {
                                page = currentPage - 2 + i;
                              }

                              return (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                                    currentPage === page
                                      ? "bg-[#D7195B] text-white"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            }
                          )}
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
    </div>
  );
}
