"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateProduct } from "@/hooks/useAPI";
import BasicInfoStep from "./steps/BasicInfoStep";
import FilesStep from "./steps/FilesStep";
import ReviewStep from "./steps/ReviewStep";
import { useProductFormStore } from "@/stores/productFormStore";

const steps = [
  { id: 1, name: "Basic Info", component: BasicInfoStep },
  { id: 2, name: "Files", component: FilesStep },
  { id: 3, name: "Review", component: ReviewStep },
];

export default function CreateProductForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, isStepValid, resetForm } = useProductFormStore();
  const createProductMutation = useCreateProduct();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleNext = () => {
    if (currentStep < steps.length && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const submitData = new FormData();

    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price.toString());
    submitData.append("categoryId", formData.categoryId);
    submitData.append("tags", JSON.stringify(formData.tags));

    if (formData.file) {
      submitData.append("file", formData.file);
    }
    if (formData.thumbnail) {
      submitData.append("thumbnail", formData.thumbnail);
    }
    formData.images.forEach((image) => {
      submitData.append("images", image);
    });

    createProductMutation.mutate(submitData, {
      onSuccess: () => {
        resetForm();
        router.push("/dashboard/vendor/products");
      },
    });
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id
                    ? "bg-green-500 text-white"
                    : currentStep === step.id
                      ? "bg-[#D7195B] text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <CurrentStepComponent />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center gap-3">
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="bg-[#D7195B] text-white px-6 py-2 rounded-lg hover:bg-[#B01548] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                !isStepValid(currentStep) || createProductMutation.isLoading
              }
              className="bg-[#D7195B] text-white px-6 py-2 rounded-lg hover:bg-[#B01548] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {createProductMutation.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
