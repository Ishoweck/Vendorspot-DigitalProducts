import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  tags: string[];
  file: File | null;
  thumbnail: File | null;
  images: File[];
}

interface ProductFormStore {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
  isStepValid: (step: number) => boolean;
  resetForm: () => void;
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  tags: [],
  file: null,
  thumbnail: null,
  images: [],
};

export const useProductFormStore = create<ProductFormStore>()(
  persist(
    (set, get) => ({
      formData: initialFormData,

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      isStepValid: (step) => {
        const { formData } = get();

        switch (step) {
          case 1:
            return (
              formData.name.trim() !== "" &&
              formData.description.trim() !== "" &&
              formData.price > 0 &&
              formData.categoryId !== ""
            );
          case 2:
            return formData.file !== null;
          case 3:
            return true;
          default:
            return false;
        }
      },

      resetForm: () => set({ formData: initialFormData }),
    }),
    {
      name: "product-form-storage",
      partialize: (state) => ({
        formData: {
          ...state.formData,
          file: null,
          thumbnail: null,
          images: [],
        },
      }),
    }
  )
);
