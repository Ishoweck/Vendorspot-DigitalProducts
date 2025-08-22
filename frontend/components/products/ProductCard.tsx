"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductCardProps } from "@/types/product";
import { StarRating } from "./StarRating";
import { useUserProfile } from "@/hooks/useAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { useTempStore } from "@/stores/tempStore";
import { Notification } from "@/components/ui/Notification";
import { useSyncTempStore } from "@/hooks/useAPI";

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  const router = useRouter();
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;
  const isVendor = user?.role === "VENDOR";

  const {
    savedItems,
    cartItems,
    addSavedItem,
    removeSavedItem,
    addCartItem,
    updateCartQuantity,
  } = useTempStore();
  const { handleGuestAction, handleVendorAction } = useSyncTempStore();
  const isSaved = savedItems.includes(product._id);
  const cartItem = cartItems.find((item) => item.productId === product._id);

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setNotification({ message, type, isVisible: true });
  };

  const handleSavedItemToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      addSavedItem(product._id);
      handleGuestAction("save");
      return;
    }

    if (isVendor) {
      handleVendorAction("save");
      return;
    }

    if (isSaved) {
      removeSavedItem(product._id);
      showNotification("Item removed from saved items");
    } else {
      addSavedItem(product._id);
      showNotification("Item added to saved items");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      addCartItem(product._id);
      handleGuestAction("cart");
      return;
    }

    if (isVendor) {
      handleVendorAction("cart");
      return;
    }

    addCartItem(product._id);
    showNotification("Item added to cart");
  };

  if (viewMode === "list") {
    return (
      <>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() =>
            setNotification((prev) => ({ ...prev, isVisible: false }))
          }
        />
        <div
          className="bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex gap-3 p-3">
            <div className="relative">
              {!imageLoaded && <Skeleton className="w-20 h-16 rounded" />}
              <img
                src={product.thumbnail || "/api/placeholder/200/150"}
                alt={product.name}
                className={`w-20 h-16 object-cover rounded flex-shrink-0 ${!imageLoaded ? "hidden" : ""}`}
                onLoad={handleImageLoad}
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
                  <span>({product.soldCount || 0})</span>
                </div>
                <p className="font-semibold text-[#D7195B]">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
      <div
        className={`bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
          isHovered ? "transform scale-105" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative">
          {!imageLoaded && <Skeleton className="w-full h-40" />}
          <img
            src={product.thumbnail || "/api/placeholder/200/150"}
            alt={product.name}
            className={`w-full h-40 object-cover ${!imageLoaded ? "hidden" : ""}`}
            onLoad={handleImageLoad}
          />

          {!isVendor && (
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={handleSavedItemToggle}
            >
              <Heart
                className={`w-4 h-4 ${isSaved ? "text-red-500 fill-current" : "text-gray-600"}`}
              />
            </button>
          )}
        </div>

        <div className="p-4 relative">
          <h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>

          <div className="mb-3">
            <span className="font-semibold text-[#D7195B] text-base">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through ml-2">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="ml-2 text-xs text-green-600 font-medium">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {isHovered &&
            !isVendor &&
            (cartItem ? (
              <div className="flex items-center justify-center gap-2 bg-[#D7195B] text-white py-2 px-4 rounded-lg text-sm font-medium">
                <button
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQuantity = cartItem.quantity - 1;
                    if (newQuantity === 0) {
                      updateCartQuantity(product._id, 0);
                      showNotification(
                        "Item was removed from cart successfully"
                      );
                    } else {
                      updateCartQuantity(product._id, newQuantity);
                      showNotification("Item quantity has been updated");
                    }
                  }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="min-w-[20px] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCartQuantity(product._id, cartItem.quantity + 1);
                    showNotification("Item added to cart");
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-[#D7195B] text-white py-2 px-4 rounded-lg hover:bg-[#b8154d] transition-colors text-sm font-medium flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
