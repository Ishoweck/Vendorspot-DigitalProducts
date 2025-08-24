"use client";

import { useState } from "react";
import { Star, MessageCircle, ThumbsUp, Flag } from "lucide-react";
import { useProductReviews } from "@/hooks/useAPI";
import { formatDistanceToNow } from "date-fns";

interface ReviewsSectionProps {
  productId: string;
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [page, setPage] = useState(1);
  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    reviewId: string;
  }>({ isOpen: false, reviewId: "" });
  const { data: reviewsData, isLoading } = useProductReviews(productId);

  const reviews = reviewsData?.data?.data?.reviews || [];
  const stats = reviewsData?.data?.data?.stats;
  const pagination = reviewsData?.data?.pagination;

  const handleHelpfulClick = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to mark review as helpful:", error);
    }
  };

  const handleReportClick = (reviewId: string) => {
    setReportModal({ isOpen: true, reviewId });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-current text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const renderRatingDistribution = () => {
    if (!stats?.ratingDistribution) return null;

    const distribution = stats.ratingDistribution;
    const total = stats.total;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count =
            distribution.find((d: any) => d._id === rating)?.count || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 w-4">{rating}</span>
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Customer Reviews
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(stats?.averageRating || 0)}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {stats?.averageRating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-gray-500">({stats?.total || 0} reviews)</span>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Rating Breakdown
              </h3>
              {renderRatingDistribution()}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Review Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Total Reviews: {stats.total}</p>
                <p>
                  Average Rating: {stats.averageRating?.toFixed(1) || "0.0"}/5
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500">
              Be the first to review this product!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div
                key={review._id}
                className="border-b border-gray-100 pb-6 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {review.userId?.firstName?.[0] || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.userId?.firstName} {review.userId?.lastName}
                      </p>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {formatDistanceToNow(new Date(review.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-medium text-gray-900 mb-2">
                    {review.title}
                  </h4>
                )}

                {review.comment && (
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                )}

                {review.response && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-[#D7195B] rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          V
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Vendor Response
                        </p>
                        <p className="text-sm text-gray-700">
                          {review.response.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(
                            new Date(review.response.respondedAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <button
                    onClick={() => handleHelpfulClick(review._id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      review.isHelpful ? "text-blue-600" : "hover:text-gray-700"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${review.isHelpful ? "fill-current" : ""}`}
                    />
                    <span>{review.helpfulCount || 0} helpful</span>
                  </button>
                  <button
                    onClick={() => handleReportClick(review._id)}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pageNum === page
                      ? "bg-[#D7195B] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {reportModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Report Review</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to report this review? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setReportModal({ isOpen: false, reviewId: "" })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `/api/reviews/${reportModal.reviewId}/report`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          reason: "Inappropriate content",
                        }),
                      }
                    );
                    if (response.ok) {
                      setReportModal({ isOpen: false, reviewId: "" });
                      window.location.reload();
                    }
                  } catch (error) {
                    console.error("Failed to report review:", error);
                  }
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
