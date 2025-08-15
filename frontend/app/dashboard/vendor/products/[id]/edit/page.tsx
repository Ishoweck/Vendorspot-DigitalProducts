"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useAPI";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AuthWrapper from "@/components/auth/AuthWrapper";
import EditProductForm from "@/components/products/EditProductForm";

function EditProductContent() {
    const params = useParams();
    const productId = params.id as string;
    const { data: productData, isLoading } = useProduct(productId);

    const product = productData?.data;

    return (
        <div className="bg-gray-50 min-h-screen">
            <SectionWrapper className="pt-8 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                        <VendorSidebar />

                        <main className="flex-1 bg-white rounded-lg shadow p-6">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Edit Product
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Update your product information and files
                                </p>
                            </div>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D7195B] border-t-transparent"></div>
                                </div>
                            ) : product ? (
                                <EditProductForm product={product} />
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">Product not found</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}

export default function EditProductPage() {
    return (
        <AuthWrapper requireAuth={true}>
            <EditProductContent />
        </AuthWrapper>
    );
}
