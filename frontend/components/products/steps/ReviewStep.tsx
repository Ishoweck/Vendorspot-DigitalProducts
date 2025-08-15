"use client";

import { File, Image } from "lucide-react";
import { useProductFormStore } from "@/stores/productFormStore";
import { useCategories } from "@/hooks/useAPI";

export default function ReviewStep() {
  const { formData } = useProductFormStore();
  const { data: categoriesData } = useCategories();

  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const selectedCategory = categories.find(
    (cat: any) => cat._id === formData.categoryId
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Product Details
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <p className="text-gray-900">{formData.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <p className="text-gray-900">₦{formData.price.toLocaleString()}</p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-gray-900">{formData.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <p className="text-gray-900">
              {selectedCategory?.name || "Category not found"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#D7195B] text-white px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Files</h3>

        <div className="space-y-4">
          {formData.file && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <File className="w-8 h-8 text-[#D7195B]" />
              <div>
                <p className="font-medium text-gray-900">Product File</p>
                <p className="text-sm text-gray-600">{formData.file.name}</p>
              </div>
            </div>
          )}

          {formData.thumbnail && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <img
                src={URL.createObjectURL(formData.thumbnail)}
                alt="Thumbnail"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium text-gray-900">Thumbnail</p>
                <p className="text-sm text-gray-600">
                  {formData.thumbnail.name}
                </p>
              </div>
            </div>
          )}

          {formData.images.length > 0 && (
            <div className="p-3 bg-white rounded-lg">
              <p className="font-medium text-gray-900 mb-3">
                Additional Images ({formData.images.length})
              </p>
              <div className="grid grid-cols-6 gap-2">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-16 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          Your product will be submitted for review after creation. You'll be
          notified once it's approved and live on the marketplace.
        </p>
      </div>
    </div>
  );
}
