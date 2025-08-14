"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import { useVerifyEmail } from "@/hooks/useAPI";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");

    const verifyEmailMutation = useVerifyEmail();

    useEffect(() => {
        if (token) {
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
                                Your email address has been verified. You can now access all features of your account.
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
                            The verification link is invalid or has expired. Please request a new verification email.
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="/login"
                                className="block bg-[#D7195B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B01548] transition-colors duration-200"
                            >
                                Go to Login
                            </Link>
                            <Link
                                href="/resend-verification"
                                className="block text-[#D7195B] hover:text-[#B01548] font-medium"
                            >
                                Resend Verification Email
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            );
  }
}