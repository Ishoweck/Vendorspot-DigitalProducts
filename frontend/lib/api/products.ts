import { api } from "./base";

export const productsAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => api.get<{ data: any[]; total: number }>("/products", { params }),

  getById: (id: string) => api.get<any>(`/products/${id}`),

  create: (productData: FormData) =>
    api.post<any>("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, productData: FormData) =>
    api.put<any>(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) => api.delete(`/products/${id}`),
};
