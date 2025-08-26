import { api } from "./base";

export const vendorsAPI = {
  register: (vendorData: {
    businessName: string;
    businessDescription?: string;
  }) => api.post<any>("/vendors/register", vendorData),

  getById: (id: string) => api.get<any>(`/vendors/${id}`),

  getDashboard: () => api.get<any>("/vendors/dashboard"),

  getProfile: () => api.get<any>("/vendors/profile"),

  updateProfile: (vendorData: any) =>
    api.put<any>("/vendors/profile", vendorData),
};
