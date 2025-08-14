import { api } from "./base";

export const ordersAPI = {
  getAll: () => api.get<{ data: any[]; total: number }>("/orders"),

  getById: (id: string) => api.get<any>(`/orders/${id}`),

  create: (orderData: {
    items: Array<{ productId: string; quantity: number }>;
  }) => api.post<any>("/orders", orderData),

  cancel: (id: string) => api.put(`/orders/${id}/cancel`),
};
