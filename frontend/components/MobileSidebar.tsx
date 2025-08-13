"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Users } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-black">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-3 pb-4 border-b">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-black">Login</span>
            </Link>

            <Link
              href="/signup"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Sign Up</span>
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="https://www.vendorspotng.com/sell-on-spot"
              onClick={onClose}
              className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Sell On Spot</span>
            </Link>

            <Link
              href="https://www.vendorspotng.com/products"
              onClick={onClose}
              className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Products</span>
            </Link>

            <Link
              href="/digital-products"
              onClick={onClose}
              className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Digital Products</span>
            </Link>

            <Link
              href="https://www.vendorspotng.com/shops"
              onClick={onClose}
              className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Shops</span>
            </Link>

            <Link
              href="/delivery"
              onClick={onClose}
              className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-black">Delivery</span>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-black mb-3">Categories</h3>
            <div className="space-y-2">
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
                  onClick={onClose}
                  className="block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-700">{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
