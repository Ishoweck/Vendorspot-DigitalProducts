import { api } from "./base";

export const vendorsAPI = {
  register: (vendorData: {
    businessName: string;
    businessDescription?: string;
  }) => api.post<any>("/vendors/register", vendorData),

  getById: (id: string) => api.get<any>(`/vendors/${id}`),

  getDashboard: () => api.get<any>("/vendors/dashboard"),

  getSales: (period: "week" | "month" | "year" = "month") =>
    api.get<any>("/vendors/sales", { params: { period } }),

  getProfile: () => api.get<any>("/vendors/profile"),

  updateProfile: (vendorData: any) =>
    api.put<any>("/vendors/profile", vendorData),

  updateVerification: (vendorData: FormData) =>
    api.put<any>("/vendors/profile", vendorData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
