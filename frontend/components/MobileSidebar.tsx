"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Users,
  UserRoundCheck,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { useUserProfile, useLogout } from "@/hooks/useAPI";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { data: userProfile } = useUserProfile();
  const logoutMutation = useLogout();
  const user = userProfile?.data?.data;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 lg:hidden ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
            {user ? (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <UserRoundCheck className="w-5 h-5 text-[#D7195B]" />
                <span className="font-medium text-black">
                  Hi, {user.firstName}
                </span>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-black">Login/Signup</span>
              </Link>
            )}
          </div>

          {user && (
            <div className="space-y-2 pb-4 border-b">
              <Link
                href="/dashboard/user"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-black">My Account</span>
              </Link>

              <Link
                href="/dashboard/user/orders"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-black">Orders</span>
              </Link>

              <Link
                href="/saved-items"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-black">Saved Items</span>
              </Link>

              <Link
                href="/dashboard/user/settings"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-black">Settings</span>
              </Link>

              <button
                onClick={() => {
                  onClose();
                  logoutMutation.mutate();
                }}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5 text-[#D7195B]" />
                <span className="font-medium text-[#D7195B]">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
