import { Star } from "lucide-react";

/**
 * レビューの型定義
 */
interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  reviewCount: number;
}

/**
 * レビューセクションコンポーネント
 */
export function ReviewSection({ reviews, reviewCount }: ReviewSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">
          レビュー ({reviewCount})
        </h2>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          すべて見る
        </button>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              {/* ユーザー画像のプレースホルダー */}
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium dark:text-white">
                    {review.userName}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.createdAt}
                  </span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`review-star-${review.id}-${i}`}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-current"
                          : "stroke-current opacity-50"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white w-full py-3 rounded-lg text-center font-medium transition-colors"
        >
          レビューを書く
        </button>
      </div>
    </div>
  );
}

