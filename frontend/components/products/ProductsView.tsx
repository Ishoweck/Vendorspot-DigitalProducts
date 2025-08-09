"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductsView() {
  const [currentPage, setCurrentPage] = useState(1);

  const digitalProducts = [
    { id: 1, name: "How to run an effective ads", price: "N20,000" },
    { id: 2, name: "How to run an effective ads", price: "N20,000" },
    { id: 3, name: "How to run an effective ads", price: "N20,000" },
    { id: 4, name: "How to run an effective ads", price: "N20,000" },
    { id: 5, name: "How to run an effective ads", price: "N20,000" },
    { id: 6, name: "How to run an effective ads", price: "N20,000" },
    { id: 7, name: "How to run an effective ads", price: "N20,000" },
    { id: 8, name: "How to run an effective ads", price: "N20,000" },
    { id: 9, name: "How to run an effective ads", price: "N20,000" },
    { id: 10, name: "How to run an effective ads", price: "N20,000" },
    { id: 11, name: "How to run an effective ads", price: "N20,000" },
    { id: 12, name: "How to run an effective ads", price: "N20,000" },
  ];

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
          All Digital Products
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {digitalProducts.map((product) => (
              <div
                key={product.id}
                className="w-full bg-white rounded-[5px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 h-80 sm:h-96 md:h-[420px]"
                style={{ aspectRatio: "255/374" }}
              >
                <div
                  className="bg-[#FFDD00] relative w-full"
                  style={{ height: "72.2%" }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                      <span className="text-xs sm:text-sm">Product Image</span>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white p-2 sm:p-3 md:py-4 md:px-[15px] flex flex-col space-y-1.5 sm:space-y-2"
                  style={{ height: "27.8%" }}
                >
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3
                      className="text-[#000000B2] font-inter font-normal line-clamp-2"
                      style={{ fontSize: "12px", lineHeight: "120%" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-black font-inter font-medium"
                      style={{ fontSize: "14px", lineHeight: "120%" }}
                    >
                      {product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-[#FC5991]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span
                      className="text-[#000000B2] font-inter font-medium leading-none"
                      style={{ fontSize: "8px", lineHeight: "100%" }}
                    >
                      No review yet
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button
            className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 rounded-lg bg-[#D7195B] text-white text-sm font-medium border border-white"
              style={{
                backgroundColor: currentPage === 1 ? "#D7195B" : "transparent",
              }}
            >
              1
            </button>
            <button className="w-8 h-8 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200">
              2
            </button>
            <span className="text-white px-2">...</span>
            <button className="w-8 h-8 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200">
              20
            </button>
          </div>

          <button
            className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            onClick={() => setCurrentPage(Math.min(20, currentPage + 1))}
            disabled={currentPage === 20}
          >
            <span className="text-sm">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
