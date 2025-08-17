"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useAPI";
import { ProductThumbnail } from "@/components/products/ProductThumbnail";

export default function ProductsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { data: productsData, isLoading } = useProducts({
    page: currentPage,
    limit: productsPerPage,
  });

  const products = productsData?.data?.data || [];
  const totalProducts = productsData?.data?.pagination?.total || 0;
  const totalPages = productsData?.data?.pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        className="bg-[#D7195B] flex items-center justify-center mb-14"
        style={{ height: "280px" }}
      >
        <h1 className="text-white text-2xl font-medium">
          Advert Banner Sample
        </h1>
      </div>

      <div className="mb-5">
        <h2
          className="text-black font-inter font-medium text-start"
          style={{
            fontSize: "24px",
            lineHeight: "100%",
            fontWeight: 500,
          }}
        >
          All Digital Products ({totalProducts} products)
        </h2>
      </div>

      <section className="py-8 sm:py-12 md:py-16 bg-[#D7195B] rounded-lg">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display mb-4">
            Browse templates, guides, and
            <br />
            resources built to help you grow.
          </h2>
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-full bg-white rounded-[5px] overflow-hidden shadow-md h-80 sm:h-96 md:h-[420px] animate-pulse">
                  <div className="bg-gray-200 w-full h-72"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {products.map((product) => (
                <ProductThumbnail key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-white text-[#D7195B]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="text-sm">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
