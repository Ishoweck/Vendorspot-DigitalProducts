"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-neutral-50 shadow-soft border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-neutral-900 font-display">
                Vendorspot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
            >
              Digital Products
            </Link>
            <Link
              href="/categories"
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              href="/vendors"
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
            >
              Vendors
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search digital products..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
            </button>
            <Link
              href="/cart"
              className="p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-500" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-neutral-200 py-2">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Sign Up
                  </Link>
                  <hr className="my-2" />
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search digital products..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-500 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-500 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                >
                  Digital Products
                </Link>
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-500 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                >
                  Categories
                </Link>
                <Link
                  href="/vendors"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-500 hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                >
                  Vendors
                </Link>
              </nav>

              <div className="flex items-center space-x-4 pt-4 border-t border-neutral-200">
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart (3)</span>
                </Link>
                <Link href="/login" className="btn-primary">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
