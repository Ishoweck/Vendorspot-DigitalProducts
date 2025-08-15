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
  fileMetadata: { name: string; size: number } | null;
  thumbnailMetadata: { name: string; size: number } | null;
  imagesMetadata: Array<{ name: string; size: number }>;
}

interface ProductFormStore {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
  isStepValid: (step: number) => boolean;
  resetForm: () => void;
  clearPersistedData: () => void;
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
  fileMetadata: null,
  thumbnailMetadata: null,
  imagesMetadata: [],
};

export const useProductFormStore = create<ProductFormStore>()(
  persist(
    (set, get) => ({
      formData: initialFormData,

      updateFormData: (data) =>
        set((state) => {
          const newData = { ...data };
          
          if (data.file !== undefined) {
            newData.fileMetadata = data.file ? 
              { name: data.file.name, size: data.file.size } : null;
          }
          
          if (data.thumbnail !== undefined) {
            newData.thumbnailMetadata = data.thumbnail ? 
              { name: data.thumbnail.name, size: data.thumbnail.size } : null;
          }
          
          if (data.images !== undefined) {
            newData.imagesMetadata = data.images.map(file => ({
              name: file.name,
              size: file.size
            }));
          }

          return {
            formData: { ...state.formData, ...newData },
          };
        }),

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
      
      clearPersistedData: () => {
        localStorage.removeItem("product-form-storage");
        set({ formData: initialFormData });
      },
    }),
    {
      name: "product-form-storage",
      partialize: (state) => ({
        formData: {
          name: state.formData.name,
          description: state.formData.description,
          price: state.formData.price,
          categoryId: state.formData.categoryId,
          tags: state.formData.tags,
          fileMetadata: state.formData.fileMetadata,
          thumbnailMetadata: state.formData.thumbnailMetadata,
          imagesMetadata: state.formData.imagesMetadata,
          file: null,
          thumbnail: null,
          images: [],
        }
      }),
    }
  )
);