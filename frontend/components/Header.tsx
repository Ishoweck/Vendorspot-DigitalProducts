"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Users,
  Menu,
  UserRoundCheck,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { useUserProfile, useLogout } from "@/hooks/useAPI";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [advertState, setAdvertState] = useState<
    "expanded" | "compact" | "hidden"
  >("expanded");

  const { data: userProfile } = useUserProfile();
  const logoutMutation = useLogout();
  const user = userProfile?.data?.data;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY === 0) {
        setAdvertState("expanded");
      } else if (scrollY > 0 && scrollY <= 100) {
        setAdvertState("compact");
      } else if (scrollY > 100) {
        setAdvertState("hidden");
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`bg-[#FC5991] text-white text-center px-4 text-sm flex items-center justify-center transition-all duration-300 ease-out overflow-hidden ${
          advertState === "expanded"
            ? "h-[60px]"
            : advertState === "compact"
              ? "h-[40px]"
              : "h-0"
        }`}
      >
        <p className="font-medium whitespace-nowrap">Advert Banner</p>
      </div>

      <div className="bg-main-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-3"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-black" />
              </button>

              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/vendorspot-logo.svg"
                  alt="Vendorspot"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative hidden lg:block user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-black hover:text-primary-500 transition-colors group"
                  >
                    <UserRoundCheck className="w-5 h-5 group-hover:text-primary-500 transition-colors" />
                    <span className="font-medium">Hi, {user.firstName}</span>
                    {isUserDropdownOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href={
                          user.role === "VENDOR"
                            ? "/dashboard/vendor"
                            : "/dashboard/user"
                        }
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Users className="w-4 h-4" />
                        <span>My Account</span>
                      </Link>

                      {user.role === "VENDOR" ? (
                        <>
                          <Link
                            href="/dashboard/vendor/products"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Package className="w-4 h-4" />
                            <span>Products</span>
                          </Link>
                          <Link
                            href="/dashboard/vendor/orders"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            href="/dashboard/vendor/profile"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/dashboard/user/orders"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            href="/dashboard/user/saved-items"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Heart className="w-4 h-4" />
                            <span>Saved Items</span>
                          </Link>
                          <Link
                            href="/dashboard/user/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                        </>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logoutMutation.mutate();
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-[#D7195B] hover:bg-gray-100 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center space-x-2 text-black hover:text-primary-500 transition-colors group"
                >
                  <Users className="w-5 h-5 group-hover:text-primary-500 transition-colors" />
                  <span className="font-medium">Login/Signup</span>
                </Link>
              )}

              <Link
                href="/cart"
                className="flex items-center space-x-2 text-black hover:text-primary-500 transition-colors"
              >
                <div className="relative">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="hidden sm:inline font-medium">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-nav-bg text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex-1 max-w-2xl flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for products, brand, categories and vendors"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {searchValue && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button className="bg-search-btn text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </header>
  );
}
