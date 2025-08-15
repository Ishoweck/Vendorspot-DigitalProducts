"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useProductFormStore } from "@/stores/productFormStore";
import { useCategories } from "@/hooks/useAPI";

export default function BasicInfoStep() {
  const { formData, updateFormData } = useProductFormStore();
  const [tagInput, setTagInput] = useState("");
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const categories = categoriesData?.data?.data || [];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        updateFormData({
          tags: [...formData.tags, tagInput.trim()],
        });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateFormData({
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
          placeholder="Describe your product"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₦)
          </label>
          <input
            type="number"
            value={formData.price || ""}
            onChange={(e) =>
              updateFormData({ price: parseFloat(e.target.value) || 0 })
            }
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => updateFormData({ categoryId: e.target.value })}
            disabled={categoriesLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {categoriesLoading ? "Loading categories..." : "Select category"}
            </option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
          placeholder="Type a tag and press Enter"
        />
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#D7195B] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
