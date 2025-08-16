"use client";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/types/product";
import { StarRating } from "./StarRating";

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
                <StarRating rating={product.rating} />
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
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <p className="font-semibold text-[#D7195B] text-sm">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
