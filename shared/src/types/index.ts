export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  isEmailVerified: boolean;
  avatar?: string;
  isVendor: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  thumbnail?: string;
  images: string[];
  category: Category;
  vendor: Vendor;
  vendorId: string;
  rating: number;
  reviewCount: number;
  reviews: number;
  downloads: number;
  isDigital: boolean;
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  downloadLimit?: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  productCount: number;
}

export interface Vendor {
  id: string;
  businessName: string;
  businessDescription?: string;
  logo?: string;
  userId: string;
  user: User;
  rating: number;
  totalSales: number;
  totalProducts: number;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  total: number;
  currency: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  downloadUrl?: string;
  downloadExpiry?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  user: User;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
