"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useVerifyEmail } from "@/hooks/useAPI";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [retryCount, setRetryCount] = useState(0);

  const verifyEmailMutation = useVerifyEmail();

  const handleVerification = () => {
    if (token) {
      setVerificationStatus("loading");
      verifyEmailMutation.mutate(
        { token },
        {
          onSuccess: () => {
            setVerificationStatus("success");
          },
          onError: () => {
            setVerificationStatus("error");
          },
        }
      );
    } else {
      setVerificationStatus("error");
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    handleVerification();
  };

  useEffect(() => {
    handleVerification();
  }, [token]);

  if (verificationStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#D7195B] border-t-transparent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your email address has been verified. You can now access all
                features of your account.
              </p>
              <Link
                href="/dashboard"
                className="inline-block bg-[#D7195B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired. Please request a
              new verification email.
            </p>
            <div className="space-y-3">
              {retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  disabled={verifyEmailMutation.isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {verifyEmailMutation.isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again ({3 - retryCount} attempts left)
                    </>
                  )}
                </button>
              )}
              <Link
                href="/login"
                className="block bg-[#D7195B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200 text-center"
              >
                Go to Login
              </Link>
              {retryCount >= 3 && (
                <p className="text-sm text-gray-500 mt-4">
                  Maximum retry attempts reached. Please contact support if the
                  issue persists.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
