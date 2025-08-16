"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { SortDropdown } from "@/components/products/SortDropdown";
import { products, categories } from "@/data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 100000,
  ]);
  const [minRating, setMinRating] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
          <ProductSidebar
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
