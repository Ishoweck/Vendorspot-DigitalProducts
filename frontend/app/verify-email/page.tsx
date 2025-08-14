"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  useVerifyEmailOTP,
  useResendVerificationOTP,
  useUserProfile,
} from "@/hooks/useAPI";
import { ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";

function VerifyEmailContent() {
  const router = useRouter();
  const { data: userProfile } = useUserProfile();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verificationStatus, setVerificationStatus] = useState<
    "input" | "verifying" | "success" | "error"
  >("input");

  const verifyEmailOTPMutation = useVerifyEmailOTP();
  const resendVerificationOTPMutation = useResendVerificationOTP();

  const userEmail = userProfile?.data?.data?.email || "";

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    if (!userEmail) {
      toast.error("User email not found. Please login again.");
      router.push("/login");
      return;
    }

    setVerificationStatus("verifying");

    verifyEmailOTPMutation.mutate(
      { email: userEmail, otp: otpString },
      {
        onSuccess: () => {
          setVerificationStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        },
        onError: () => {
          setVerificationStatus("error");
        },
      }
    );
  };

  const handleResendOTP = () => {
    if (!userEmail) {
      toast.error("User email not found. Please login again.");
      router.push("/login");
      return;
    }

    resendVerificationOTPMutation.mutate({ email: userEmail });
  };

  const handleRetry = () => {
    setVerificationStatus("input");
    setOtp(["", "", "", "", "", ""]);
  };

  if (verificationStatus === "input") {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/vendorspot-logo.svg"
                  alt="Vendorspot"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            <div className="text-center mb-6">
              <ShieldCheck className="mx-auto h-16 w-16 text-[#24BE02]" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Account Verification
              </h2>
              <p className="text-gray-600">
                We've sent a verification code to{" "}
                <span className="font-medium text-gray-900">{userEmail}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7195B] focus:border-transparent"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="text-center">
                <span className="text-[#565454]">
                  Didn't receive verification code?{" "}
                </span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendVerificationOTPMutation.isLoading}
                  className="text-[#D7195B] hover:text-[#B01548] font-medium disabled:opacity-50"
                >
                  {resendVerificationOTPMutation.isLoading
                    ? "Sending..."
                    : "Resend"}
                </button>
              </div>

              <button
                type="submit"
                disabled={
                  verifyEmailOTPMutation.isLoading || otp.join("").length !== 6
                }
                className="w-full bg-[#D7195B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyEmailOTPMutation.isLoading
                  ? "Verifying..."
                  : "Verify Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "verifying") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/vendorspot-logo.svg"
                  alt="Vendorspot"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            <div className="text-center mb-6">
              <ShieldCheck className="mx-auto h-16 w-16 text-[#24BE02]" />
            </div>

            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7195B] mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-gray-900">
                Verifying Account...
              </h2>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-black bg-opacity-30 z-[-1]"></div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/vendorspot-logo.svg"
                  alt="Vendorspot"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            <div className="text-center mb-6">
              <ShieldCheck className="mx-auto h-16 w-16 text-[#24BE02]" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Account Verified
              </h2>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. Redirecting to
                dashboard...
              </p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D7195B] mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-black bg-opacity-30 z-[-1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/vendorspot-logo.svg"
                alt="Vendorspot"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="text-center mb-6">
            <ShieldX className="mx-auto h-16 w-16 text-red-500" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              The verification code is invalid or has expired.
            </p>
          </div>

          <button
            onClick={handleRetry}
            className="w-full bg-[#D7195B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthWrapper requireAuth={false}>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7195B]"></div>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </AuthWrapper>
  );
}
