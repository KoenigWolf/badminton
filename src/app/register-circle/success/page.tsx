import Link from "next/link";
import { CheckCircle, Home, Search, Settings } from "lucide-react";

export default function RegistrationSuccessPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900 p-5 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              サークル登録が完了しました！
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              サークル情報の審査を行った後、サイトに公開されます。審査完了までに数時間〜最大2営業日程度かかる場合があります。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
              <Link
                href="/"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-gray-900 dark:text-white font-medium">ホームへ戻る</span>
              </Link>
              
              <Link
                href="/search"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-gray-900 dark:text-white font-medium">サークルを探す</span>
              </Link>
              
              <Link
                href="/manage-circle"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-gray-900 dark:text-white font-medium">サークル管理</span>
              </Link>
            </div>
            
            <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg w-full max-w-lg">
              <h2 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                次のステップ
              </h2>
              <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                  <span>サークルのプロフィールを充実させましょう（写真の追加など）</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                  <span>イベントやスケジュールを登録して、活動をアピールしましょう</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                  <span>SNSと連携して、さらに多くの方にサークルを知ってもらいましょう</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 