"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  authAPI,
  productsAPI,
  ordersAPI,
  usersAPI,
  vendorsAPI,
  categoriesAPI,
} from "@/lib/api";

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials: { email: string; password: string; rememberMe?: boolean }) =>
      authAPI.login(credentials),
    {
      onSuccess: (data, variables) => {
        const { CookieService } = require("@/lib/cookies");
        const tokenExpiry = variables.rememberMe ? 7 : 1;
        const refreshExpiry = variables.rememberMe ? 30 : 7;

        CookieService.set("auth_token", data.data.data.token, tokenExpiry);
        CookieService.set(
          "refresh_token",
          data.data.data.refreshToken,
          refreshExpiry
        );
        queryClient.invalidateQueries(["user"]);
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Login failed");
      },
    }
  );
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation(authAPI.register, {
    onSuccess: (data) => {
      const { CookieService } = require("@/lib/cookies");
      CookieService.set("auth_token", data.data.data.token, 1);
      CookieService.set("refresh_token", data.data.data.refreshToken, 7);
      queryClient.invalidateQueries(["user"]);
      toast.success("Registration successful! Please verify your email.");
      window.location.href = "/verify-email";
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(authAPI.logout, {
    onSuccess: () => {
      const { CookieService } = require("@/lib/cookies");
      CookieService.remove("auth_token");
      CookieService.remove("refresh_token");
      queryClient.clear();
      toast.success("Logged out successfully");
      window.location.href = "/login";
    },
  });
};

export const useForgotPassword = () => {
  return useMutation(authAPI.forgotPassword, {
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    },
  });
};

export const useResetPassword = () => {
  return useMutation(authAPI.resetPassword, {
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reset password");
    },
  });
};

export const useVerifyEmailOTP = () => {
  const queryClient = useQueryClient();

  return useMutation(authAPI.verifyEmailOTP, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Email verified successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to verify email");
    },
  });
};

export const useResendVerificationOTP = () => {
  return useMutation(authAPI.resendVerificationOTP, {
    onSuccess: () => {
      toast.success("Verification code sent to your email");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to send verification code"
      );
    },
  });
};

// Products hooks
export const useProducts = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  vendor?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery(["products", params], () => productsAPI.getAll(params), {
    keepPreviousData: true,
  });
};

export const useProduct = (id: string) => {
  return useQuery(["product", id], () => productsAPI.getById(id), {
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(productsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: FormData }) =>
      productsAPI.update(id, data),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(["products"]);
        queryClient.invalidateQueries(["product", id]);
        toast.success("Product updated successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to update product"
        );
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(productsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["vendor-products"]);
      toast.success("Product deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete product");
    },
  });
};

export const useVendorProducts = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery(
    ["vendor-products", params],
    () => productsAPI.getVendorProducts(params),
    {
      keepPreviousData: true,
    }
  );
};

// Orders hooks
export const useOrders = () => {
  return useQuery(["orders"], ordersAPI.getAll);
};

export const useOrder = (id: string) => {
  return useQuery(["order", id], () => ordersAPI.getById(id), {
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(ordersAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
};

// User hooks
export const useUserProfile = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { CookieService } = require("@/lib/cookies");
      setIsEnabled(!!CookieService.get("auth_token"));
    }
  }, []);

  return useQuery(["user"], authAPI.getCurrentUser, {
    enabled: isEnabled,
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(usersAPI.updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};

// Categories hooks
export const useCategories = () => {
  return useQuery(["categories"], categoriesAPI.getAll);
};

// Vendors hooks
export const useVendor = (id: string) => {
  return useQuery(["vendor", id], () => vendorsAPI.getById(id), {
    enabled: !!id,
  });
};

export const useRegisterVendor = () => {
  const queryClient = useQueryClient();

  return useMutation(vendorsAPI.register, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Vendor registration successful!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to register as vendor"
      );
    },
  });
};
