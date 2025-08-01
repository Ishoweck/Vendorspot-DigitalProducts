import axios, { AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ token: string; user: any }>("/auth/login", credentials),

  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => api.post<{ token: string; user: any }>("/auth/register", userData),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post<{ token: string }>("/auth/refresh"),
};

// Products API
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

// Orders API
export const ordersAPI = {
  getAll: () => api.get<{ data: any[]; total: number }>("/orders"),

  getById: (id: string) => api.get<any>(`/orders/${id}`),

  create: (orderData: {
    items: Array<{ productId: string; quantity: number }>;
  }) => api.post<any>("/orders", orderData),

  cancel: (id: string) => api.put(`/orders/${id}/cancel`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get<any>("/users/profile"),

  updateProfile: (userData: any) => api.put<any>("/users/profile", userData),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post<{ avatar: string }>("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Vendors API
export const vendorsAPI = {
  register: (vendorData: {
    businessName: string;
    businessDescription?: string;
  }) => api.post<any>("/vendors/register", vendorData),

  getById: (id: string) => api.get<any>(`/vendors/${id}`),

  updateProfile: (vendorData: any) =>
    api.put<any>("/vendors/profile", vendorData),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get<any[]>("/categories"),
};

// Payments API
export const paymentsAPI = {
  initialize: (paymentData: {
    amount: number;
    email: string;
    reference: string;
  }) =>
    api.post<{ authorization_url: string; reference: string }>(
      "/payments/initialize",
      paymentData
    ),

  verify: (reference: string) =>
    api.post<{ status: string; data: any }>("/payments/verify", { reference }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get<{ data: any[]; total: number }>("/notifications"),

  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
};

export default api;
