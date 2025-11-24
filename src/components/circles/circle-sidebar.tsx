import Link from "next/link";
import { MessageSquare } from "lucide-react";

/**
 * サークル情報の型定義
 */
interface Circle {
  id: string;
  fee: number;
  activityFrequency: string;
  isRecruiting: boolean;
  updatedAt: string;
}

interface CircleSidebarProps {
  circle: Circle;
}

/**
 * サイドバーコンポーネント
 * サークル参加申請カードを表示
 */
export function CircleSidebar({ circle }: CircleSidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 sticky top-20">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        このサークルに参加する
      </h2>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 dark:text-gray-300">月会費</span>
          <span className="font-bold text-lg dark:text-white">
            {circle.fee.toLocaleString()}円
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">活動頻度</span>
          <span className="font-medium dark:text-white">
            {circle.activityFrequency}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            ※参加申請後、サークル管理者による承認が必要です
          </p>
          {circle.isRecruiting ? (
            <Link
              href={`/circles/${circle.id}/apply`}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-center font-medium block transition-colors"
            >
              参加を申請する
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white w-full py-3 rounded-lg text-center font-medium cursor-not-allowed"
            >
              現在募集停止中
            </button>
          )}
        </div>
        <button
          type="button"
          className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 w-full py-2 rounded-lg text-center font-medium border border-current transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <MessageSquare size={18} />
            <span>質問する</span>
          </div>
        </button>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        最終更新: {circle.updatedAt}
      </div>
    </div>
  );
}

