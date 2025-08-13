// User Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  _id: string;
  vendorId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isDigital: boolean;
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  previewUrl?: string;
  thumbnail?: string;
  images: string[];
  tags: string[];
  features: string[];
  requirements?: string;
  instructions?: string;
  licenseType?:
    | "SINGLE_USE"
    | "MULTIPLE_USE"
    | "UNLIMITED"
    | "TIME_LIMITED"
    | "SUBSCRIPTION";
  licenseDuration?: number;
  downloadLimit?: number;
  isActive: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  viewCount: number;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Vendor Types
export interface Vendor {
  _id: string;
  userId: string;
  businessName: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  website?: string;
  logo?: string;
  banner?: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  verificationDocuments: string[];
  rating: number;
  totalSales: number;
  totalProducts: number;
  commissionRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Product Query Types
export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "rating" | "downloads";
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
  isFeatured?: boolean;
}
