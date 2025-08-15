"use client";

import { useRef } from "react";
import { Upload, X, File, Image } from "lucide-react";
import { useProductFormStore } from "@/stores/productFormStore";

export default function FilesStep() {
  const { formData, updateFormData } = useProductFormStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ file });
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ thumbnail: file });
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateFormData({ images: [...formData.images, ...files] });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product File (Required)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#D7195B] transition-colors"
        >
          {formData.file ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFormData({ file: null });
                }}
                className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-center justify-center gap-3">
                <File className="w-8 h-8 text-[#D7195B]" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Click to upload your digital product
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ZIP, PDF, or other digital files
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".zip,.pdf,.doc,.docx,.psd,.ai,.sketch"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail (Optional)
        </label>
        <div
          onClick={() => thumbnailInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#D7195B] transition-colors"
        >
          {formData.thumbnail ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFormData({ thumbnail: null });
                }}
                className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.thumbnail.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(formData.thumbnail.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Upload a thumbnail image</p>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG (recommended: 400x300px)
              </p>
            </div>
          )}
        </div>
        <input
          ref={thumbnailInputRef}
          type="file"
          onChange={handleThumbnailChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Images (Optional)
        </label>
        <div
          onClick={() => imagesInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#D7195B] transition-colors"
        >
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Upload preview images</p>
          <p className="text-sm text-gray-500 mt-1">Multiple images allowed</p>
        </div>
        <input
          ref={imagesInputRef}
          type="file"
          onChange={handleImagesChange}
          className="hidden"
          accept="image/*"
          multiple
        />

        {formData.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
