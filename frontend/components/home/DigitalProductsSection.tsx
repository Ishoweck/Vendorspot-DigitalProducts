"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useAPI";
import { ProductThumbnail } from "@/components/products/ProductThumbnail";

export default function DigitalProductsSection() {
  const [productCount, setProductCount] = useState(8);
  
  const { data: productsData } = useProducts({
    page: 1,
    limit: productCount,
  });

  const products = productsData?.data?.data || [];

  const handleViewMore = () => {
    setProductCount(prev => Math.min(prev + 8, 24));
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#D7195B]">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-4">
          Explore. Download. <span className="bg-black px-2">Grow.</span>
        </h2>
        <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Digital products made to fuel your business journey.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {products.map((product) => (
            <ProductThumbnail key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleViewMore}
          className="inline-block bg-transparent text-white border-2 border-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white hover:text-[#D7195B] transition-colors duration-200 text-sm sm:text-base"
        >
          View More
        </button>
      </div>
    </section>
  );
}
