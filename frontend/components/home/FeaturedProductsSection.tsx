"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, Store } from "lucide-react";

export default function FeaturedProductsSection() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Product Name",
      shopName: "Shop Name",
      location: "Location",
    },
    {
      id: 2,
      name: "Product Name",
      shopName: "Shop Name",
      location: "Location",
    },
    {
      id: 3,
      name: "Product Name",
      shopName: "Shop Name",
      location: "Location",
    },
    {
      id: 4,
      name: "Product Name",
      shopName: "Shop Name",
      location: "Location",
    },
  ];

  return (
    <section className="pt-11 pb-8 sm:pb-12 md:pb-16">
      <div
        className="bg-[#FF7300] border-2 border-neutral-50 rounded-[10px] p-4 sm:p-6 mb-8 sm:mb-10 md:mb-12"
        style={{ height: "71px" }}
      >
        <div className="flex items-center h-full">
          <Store className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-semibold text-lg sm:text-xl">
            Sponsored Products
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="h-80 sm:h-96 md:h-[380px] shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-[#9D9C9C]"
            style={{ width: "306px", maxWidth: "100%" }}
          >
            <div className="relative">
              <Image
                src="/images/product.png"
                alt={product.name}
                width={400}
                height={300}
                className="w-full object-cover h-48 sm:h-56 md:h-60"
              />
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                <button
                  onClick={() => toggleLike(product.id)}
                  className="p-1.5 sm:p-2 transition-colors duration-200"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${likedProducts.includes(product.id)
                      ? "text-red-500 fill-current"
                      : "text-neutral-600"
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-col space-y-2 h-32 sm:h-40 md:h-[140px]">
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg font-bold text-neutral-900">
                      ₦20,000
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      ₦20,000
                    </span>
                  </div>
                  <div className="bg-[#D7195B33] rounded px-2 py-1 text-xs">
                    <span className="text-[#D7195B] font-medium">-73%</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-600">
                  {product.shopName} - {product.location}
                </p>
              </div>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#FC5991] mr-1"
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
