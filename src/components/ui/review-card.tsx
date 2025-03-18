import React from "react";
import Image from "next/image";
import { Star, ThumbsUp, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ReviewProps = {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount?: number;
  isHelpful?: boolean;
  className?: string;
};

/**
 * レビューカードコンポーネント
 * 
 * @description ユーザーのレビューを表示するカード
 * @features
 * - 評価（星）の表示
 * - ユーザーのアバター表示
 * - 「参考になった」ボタン
 * - 不適切なレビューの報告機能
 */
export function ReviewCard({
  userName,
  userImage,
  rating,
  comment,
  createdAt,
  helpfulCount = 0,
  isHelpful = false,
  className,
}: ReviewProps) {
  // 日付を相対時間に変換（例：「3日前」）
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ja,
  });

  return (
    <div className={cn("p-4 border border-gray-200 dark:border-gray-700 rounded-lg", className)}>
      <div className="flex items-start gap-3">
        {/* ユーザーアバター */}
        <div className="shrink-0 size-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={40}
              height={40}
              className="object-cover size-full"
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-primary/10 text-primary">
              {userName[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* ユーザー名と評価 */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{userName}</h4>
            <div className="flex items-center">
              {/* 星評価の表示 */}
              <div className="flex items-center" aria-label={`評価 ${rating}点`}>
                {[1, 2, 3, 4, 5].map((starNumber) => (
                  <Star
                    key={`star-${starNumber}`}
                    className={cn(
                      "size-4", 
                      starNumber <= rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300 dark:text-gray-600"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 日付の表示 */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{timeAgo}</p>

          {/* レビュー本文 */}
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words mt-2">
            {comment}
          </p>

          {/* アクション：役に立ったボタンと報告 */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 gap-1.5 text-xs p-1",
                isHelpful && "text-primary dark:text-primary"
              )}
            >
              <ThumbsUp
                className={cn("size-3.5", isHelpful && "fill-primary")}
              />
              参考になった
              {helpfulCount > 0 && <span className="text-xs">({helpfulCount})</span>}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 gap-1.5 text-xs p-1"
            >
              <Flag className="size-3.5" />
              報告
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 