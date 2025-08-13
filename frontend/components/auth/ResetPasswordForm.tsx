"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Handle reset password logic here
    console.log("Reset password attempt:", {
      token,
      password: formData.password,
    });
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!token) {
    return (
      <>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black font-inter">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-gray-600">
            This password reset link is invalid or has expired
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Please request a new password reset link.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block bg-[#D7195B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (isSubmitted) {
    return (
      <>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black font-inter">
            Password Reset Successful
          </h2>
          <p className="mt-2 text-gray-600">
            Your password has been successfully reset
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              You can now sign in with your new password.
            </p>
            <Link
              href="/login"
              className="inline-block bg-[#D7195B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black font-inter">
          Reset Password
        </h2>
        <p className="mt-2 text-gray-600">Enter your new password below</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                placeholder="Enter new password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                placeholder="Confirm new password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D7195B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-[#D7195B] hover:text-[#B01548] font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
}
