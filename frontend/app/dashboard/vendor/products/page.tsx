"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useVendorProducts, useDeleteProduct } from "@/hooks/useAPI";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AuthWrapper from "@/components/auth/AuthWrapper";

function VendorProductsContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData, isLoading } = useVendorProducts({
    page: currentPage,
    limit: 10,
  });
  const deleteProductMutation = useDeleteProduct();

  const products = productsData?.data?.data || [];
  const pagination = productsData?.data?.pagination;

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <VendorSidebar />

            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                  href="/dashboard/vendor/products/create"
                  className="bg-[#D7195B] text-white px-4 py-2 rounded-lg hover:bg-[#B01548] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Link>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D7195B] border-t-transparent"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start selling by adding your first digital product
                  </p>
                  <Link
                    href="/dashboard/vendor/products/create"
                    className="bg-[#D7195B] text-white px-6 py-2 rounded-lg hover:bg-[#B01548] transition-colors"
                  >
                    Add Your First Product
                  </Link>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Price
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Views
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Downloads
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product: any) => (
                          <tr
                            key={product._id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  {product.thumbnail ? (
                                    <img
                                      src={product.thumbnail}
                                      alt={product.name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 line-clamp-1">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-medium text-gray-900">
                                ₦{product.price.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  product.approvalStatus === "APPROVED"
                                    ? "bg-green-100 text-green-800"
                                    : product.approvalStatus === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.approvalStatus}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {product.viewCount}
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {product.downloadCount}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/products/${product._id}`}
                                  className="p-2 text-gray-600 hover:text-[#D7195B] transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <Link
                                  href={`/dashboard/vendor/products/${product._id}/edit`}
                                  className="p-2 text-gray-600 hover:text-[#D7195B] transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                  disabled={deleteProductMutation.isLoading}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
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
                            Math.min(pagination.totalPages, currentPage + 1)
                          )
                        }
                        disabled={currentPage === pagination.totalPages}
                        className="px-3 py-2 text-gray-600 hover:text-[#D7195B] disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default function VendorProductsPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <VendorProductsContent />
    </AuthWrapper>
  );
}
