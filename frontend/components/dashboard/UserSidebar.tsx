"use client";

import { useUserProfile } from "@/hooks/useAPI";
import {
  ShoppingBag,
  Bell,
  MapPin,
  Settings,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const { data: userProfile } = useUserProfile();
  const user = userProfile?.data?.data;
  const pathname = usePathname();

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName) return "U";
    return (
      firstName.charAt(0).toUpperCase() +
      (lastName?.charAt(0).toUpperCase() || "")
    );
  };

  const navigationItems = [
    {
      href: "/dashboard/user/orders",
      icon: ShoppingBag,
      label: "Orders",
    },
    {
      href: "/dashboard/user/saved-items",
      icon: Heart,
      label: "Saved Items",
    },
    {
      href: "/dashboard/user/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/dashboard/user/shipping-address",
      icon: MapPin,
      label: "Shipping Address",
    },
    {
      href: "/dashboard/user/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <aside className="w-64 bg-white rounded-lg shadow p-6 hidden lg:block">
      <div className="text-center mb-6 pb-6 border-b">
        <div className="w-16 h-16 bg-[#D7195B] rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">
            {getInitials(user?.firstName, user?.lastName)}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? "text-[#D7195B] font-semibold" : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-[#D7195B]" : "text-gray-600"}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
