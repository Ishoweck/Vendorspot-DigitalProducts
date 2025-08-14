"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hooks/useAPI";
import Link from "next/link";
import { CheckCircle, XCircle, Mail } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [hasAttempted, setHasAttempted] = useState(false);

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (token && !hasAttempted && !verifyEmailMutation.isLoading) {
      setHasAttempted(true);
      verifyEmailMutation.mutate(
        { token },
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
    } else if (!token) {
      setVerificationStatus("error");
    }
  }, [token, hasAttempted, verifyEmailMutation.isLoading]);

  if (verificationStatus === "pending") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7195B] mx-auto"></div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Verifying Your Email
            </h2>
            <p className="mt-2 text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Email Verified Successfully!
            </h2>
            <p className="mt-2 text-gray-600">
              Your email has been verified. You'll be redirected to your
              dashboard in a few seconds.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="bg-[#D7195B] text-white px-6 py-3 rounded-lg hover:bg-[#B01548] transition-colors"
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verification Failed
          </h2>
          <p className="mt-2 text-gray-600">
            The verification link is invalid or has expired.
          </p>
          <div className="mt-6 space-y-4">
            <Link
              href="/login"
              className="block bg-[#D7195B] text-white px-6 py-3 rounded-lg hover:bg-[#B01548] transition-colors"
            >
              Back to Login
            </Link>
            <p className="text-sm text-gray-500">
              Need a new verification link? Log in and we'll send you another
              one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7195B]"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}