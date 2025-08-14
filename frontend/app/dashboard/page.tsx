"use client";

import { useUserProfile, useLogout } from "@/hooks/useAPI";
import { Mail } from "lucide-react";
import AuthWrapper from "@/components/auth/AuthWrapper";

function DashboardContent() {
  const { data: userProfile } = useUserProfile();
  const logoutMutation = useLogout();
  const user = userProfile?.data?.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Vendorspot Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={() => logoutMutation.mutate()}
                className="bg-[#D7195B] text-white px-4 py-2 rounded-lg hover:bg-[#B01548] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                Your personalized dashboard is under development. Here's what we
                know about you:
              </p>

              {!user?.isEmailVerified && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-yellow-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">
                        Email Verification Required
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please check your email and click the verification link
                        to unlock all features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
                <div className="space-y-2 text-left">
                  <p>
                    <strong>Name:</strong> {user?.firstName} {user?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>
                  <p>
                    <strong>Status:</strong> {user?.status}
                  </p>
                  <p>
                    <strong>Email Verified:</strong>{" "}
                    <span
                      className={
                        user?.isEmailVerified
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {user?.isEmailVerified ? "✓ Verified" : "✗ Not Verified"}
                    </span>
                  </p>
                  <p>
                    <strong>Member Since:</strong>{" "}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  More features coming soon including:
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>• Product management</li>
                  <li>• Order tracking</li>
                  <li>• Sales analytics</li>
                  <li>• Profile settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <DashboardContent />
    </AuthWrapper>
  );
}
