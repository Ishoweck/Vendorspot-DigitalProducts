"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useProduct, useProducts } from "@/hooks/useAPI";
import { useUserProfile } from "@/hooks/useAPI";
import { useTempStore } from "@/stores/tempStore";
import { ProductThumbnail } from "./ProductThumbnail";
import { Notification } from "@/components/ui/Notification";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    requirements: false,
    license: false,
    instructions: false,
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  const { data: productData, isLoading: productLoading } =
    useProduct(productId);
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
  const isSaved = savedItems.includes(productId);
  const cartItem = cartItems.find((item) => item.productId === productId);

  // Fetch related products in the same category
  const { data: relatedProductsData } = useProducts({
    category: productData?.data?.data?.categoryId?._id,
    limit: 4,
  });

  const product = productData?.data?.data;
  const relatedProducts =
    relatedProductsData?.data?.data?.filter((p) => p._id !== productId) || [];

  // Only show related products if there are any and they're different from current product
  const shouldShowRelatedProducts = relatedProducts.length > 0;

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setNotification({ message, type, isVisible: true });
  };

  const handleVendorClick = () => {
    if (product?.vendorId?.businessName) {
      router.push(
        `/products?vendor=${encodeURIComponent(product.vendorId.businessName)}`
      );
    }
  };

  const handleSavedItemToggle = () => {
    if (!user) {
      useTempStore.getState().markPendingFromGuest();
      // Redirect to login
      return;
    }

    if (isVendor) {
      showNotification("Vendors cannot save items", "error");
      return;
    }

    if (isSaved) {
      removeSavedItem(productId);
      showNotification("Item removed from saved items");
    } else {
      addSavedItem(productId);
      showNotification("Item added to saved items");
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      useTempStore.getState().markPendingFromGuest();
      // Redirect to login
      return;
    }

    if (isVendor) {
      showNotification("Vendors cannot add items to cart", "error");
      return;
    }

    addCartItem(productId);
    showNotification("Item added to cart");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateCartQuantity(productId, 0);
      showNotification("Item was removed from cart successfully");
    } else {
      updateCartQuantity(productId, newQuantity);
      showNotification("Item quantity has been updated");
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (productLoading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-1/2 h-6 mb-4" />
            <Skeleton className="w-full h-24 mb-4" />
            <Skeleton className="w-1/3 h-12 mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Product not found
        </h2>
        <p className="text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const allImages = [product.thumbnail, product.previewUrl, ...(product.images || [])].filter(Boolean);

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
      
      <section className="bg-white rounded-lg shadow-sm">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="relative mb-4">
                <Image
                  src={allImages[currentImageIndex] || "/api/placeholder/500/400"}
                  alt={product.name}
                  width={500}
                  height={320}
                  className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-lg"
                  priority
                />
              </div>
              {allImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-[#D7195B]" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/api/placeholder/80/80"}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 lg:max-w-md">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                {!isVendor && (
                  <button
                    onClick={handleSavedItemToggle}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${isSaved ? "text-red-500 fill-current" : "text-gray-400"}`}
                    />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-[#D7195B]">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-gray-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage && product.discountPercentage > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 0) ? "text-[#FC5991] fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-4">
                {cartItem ? (
                  <div className="flex items-center justify-center gap-3 bg-[#D7195B] text-white py-2.5 px-4 rounded-lg">
                    <button
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      onClick={() => handleQuantityChange(cartItem.quantity - 1)}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="min-w-[28px] text-center font-medium">{cartItem.quantity}</span>
                    <button
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#D7195B] text-white py-2.5 px-4 rounded-lg hover:bg-[#b8154d] transition-colors font-medium flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200 mb-4">
                <p className="text-sm text-gray-600">Vendor:</p>
                <button
                  onClick={handleVendorClick}
                  className="text-[#D7195B] hover:underline font-medium text-sm"
                >
                  {product.vendorId?.businessName || "Unknown Vendor"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="px-3 py-2 rounded-lg bg-[#FFF3F7] text-sm">
                  <span className="text-gray-600">Need Help? </span>
                  <span className="text-[#D7195B] font-semibold">Call 07045882161</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">SHARE THIS PRODUCT</span>
                  <Facebook className="w-4 h-4 text-[#FC5991]" />
                  <Twitter className="w-4 h-4 text-[#FC5991]" />
                  <Instagram className="w-4 h-4 text-[#FC5991]" />
                  <IconBrandWhatsapp className="w-4 h-4 text-[#FC5991]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 lg:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Product Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-gray-900">Key Features</span>
                <button onClick={() => toggleSection("features")}>
                  {expandedSections.features ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {expandedSections.features && (
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {product.features?.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  )) || <li className="text-gray-500">No features listed</li>}
                </ul>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-gray-900">Requirements</span>
                <button onClick={() => toggleSection("requirements")}>
                  {expandedSections.requirements ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {expandedSections.requirements && (
                <div className="text-sm text-gray-700">
                  {product.requirements || "Not specified"}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-gray-900">License</span>
                <button onClick={() => toggleSection("license")}>
                  {expandedSections.license ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {expandedSections.license && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Type</span><span className="font-medium">{product.licenseType || "Not specified"}</span></div>
                  {product.licenseDuration && (
                    <div className="flex justify-between"><span className="text-gray-600">Duration</span><span className="font-medium">{product.licenseDuration} days</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-gray-600">Download Limit</span><span className="font-medium">{product.downloadLimit === -1 ? "Unlimited" : product.downloadLimit || "Not specified"}</span></div>
                </div>
              )}
            </div>

            {product.instructions && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 lg:col-span-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-gray-900">Instructions</span>
                  <button onClick={() => toggleSection("instructions")}>
                    {expandedSections.instructions ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {expandedSections.instructions && (
                  <div className="text-sm text-gray-700">{product.instructions}</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 lg:p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Product Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D7195B]">{product.soldCount || 0}</div>
              <div className="text-sm text-gray-600">Sold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D7195B]">{product.viewCount || 0}</div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D7195B]">{product.reviewCount || 0}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D7195B]">{product.rating?.toFixed(1) || "0.0"}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>

          <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white">
            <h3 className="font-medium text-gray-900 mb-3">Customer Reviews</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Review functionality will be implemented later</p>
              <p className="text-sm">Only customers with verified purchases can leave reviews</p>
            </div>
          </div>
        </div>

        {shouldShowRelatedProducts && (
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductThumbnail
                  key={relatedProduct._id}
                  product={relatedProduct}
                  className="h-80"
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
