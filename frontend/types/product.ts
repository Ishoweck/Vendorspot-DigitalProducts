export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  vendor: string;
  rating: number;
  reviews: number;
  soldCount: number;
  thumbnail: string;
  description: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface SidebarProps {
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
}

export interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}