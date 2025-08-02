"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Phone, Mail, Users, ChevronDown } from "lucide-react";
import { IconCategory2 } from "@tabler/icons-react";

export default function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [advertState, setAdvertState] = useState<
    "expanded" | "compact" | "hidden"
  >("expanded");
  const pathname = usePathname();

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`bg-advert-bg text-black text-center px-4 text-sm flex items-center justify-center transition-all duration-300 ease-out overflow-hidden ${
          advertState === "expanded"
            ? "h-[60px]"
            : advertState === "compact"
              ? "h-[40px]"
              : "h-0"
        }`}
      >
        <p className="font-medium whitespace-nowrap">Advert Banner</p>
      </div>

      <div className="bg-contact-bg text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm font-medium">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+234 704 588 2161</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@vendorspotng.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/our-policy" className="text-sm hover:underline">
                Our Policy
              </Link>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-user-question"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                  <path d="M19 22v.01" />
                  <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                </svg>
                <span className="hidden sm:inline">Vendor FAQ's</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-main-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/vendorspot-logo.svg"
                alt="Vendorspot"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <div className="flex-1 max-w-2xl mx-4 lg:mx-8 flex items-center space-x-2">
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

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="hidden lg:flex items-center space-x-2 text-black hover:text-primary-500 transition-colors group"
              >
                <Users className="w-5 h-5 group-hover:text-primary-500 transition-colors" />
                <span className="font-medium">Login</span>
              </Link>

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
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center space-x-2 hover:text-secondary-500 transition-colors group"
            >
              <IconCategory2 className="w-5 h-5 text-white group-hover:text-secondary-500 transition-colors duration-200" />
              <span className="font-medium">Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                "Sell On Spot",
                "Products",
                "Digital Products",
                "Shops",
                "Delivery",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`font-medium transition-colors hover:text-secondary-500 ${
                    pathname === `/${item.toLowerCase().replace(/\s+/g, "-")}`
                      ? "text-secondary-500"
                      : ""
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {isCategoriesOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Web Templates",
                "Digital Courses",
                "Design Resources",
                "Business Tools",
                "Mobile Apps",
                "Graphics",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-700 hover:text-primary-500 font-medium"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
