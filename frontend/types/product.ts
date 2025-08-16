export interface Product {
  _id: string;
  name: string;
  price: number;
  categoryId: string | { _id: string; name: string };
  vendorId: string | { _id: string; businessName: string };
  rating: number;
  soldCount: number;
  thumbnail?: string;
  images: string[];
  description: string;
  tags: string[];
  isActive: boolean;
  isApproved: boolean;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface SidebarProps {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedVendor: string;
  setSelectedVendor: (vendor: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onApplyPriceFilter: () => void;
  onResetRating: () => void;
  products: any[];
}

export interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}
