"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import { FaUser, FaHeart, FaCommentAlt, FaSignOutAlt, FaCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // 未認証の場合はログインページへリダイレクト
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
  
  // ログアウト処理
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      toast.success("ログアウトしました");
      router.push("/");
    } catch (error) {
      toast.error("ログアウト中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };
  
  // 読み込み中
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    );
  }
  
  // 認証済みでない場合は何も表示しない（useEffectでリダイレクト）
  if (status !== "authenticated") {
    return null;
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー部分 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <FaUser className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold dark:text-white">
                    こんにちは、{session.user?.name || "ゲスト"}さん
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <FaSignOutAlt className="h-4 w-4" />
                ログアウト
              </Button>
            </div>
          </div>
          
          {/* メインコンテンツ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* ユーザープロフィール */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <CgProfile className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold dark:text-white">プロフィール</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">名前</p>
                  <p className="font-medium dark:text-white">{session.user?.name || "未設定"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">メールアドレス</p>
                  <p className="font-medium dark:text-white">{session.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">レベル</p>
                  <p className="font-medium dark:text-white">未設定</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">都道府県</p>
                  <p className="font-medium dark:text-white">未設定</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/profile")}
                >
                  プロフィールを編集
                </Button>
              </div>
            </div>
            
            {/* お気に入りサークル */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaHeart className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-bold dark:text-white">お気に入りサークル</h2>
              </div>
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  まだお気に入りに登録したサークルがありません
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/search")}
                >
                  サークルを探す
                </Button>
              </div>
            </div>
            
            {/* 参加申請状況 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaCommentAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold dark:text-white">参加申請状況</h2>
              </div>
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  現在申請中のサークルはありません
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/search")}
                >
                  サークルを探す
                </Button>
              </div>
            </div>
          </div>
          
          {/* 所属サークル */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaCog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold dark:text-white">所属サークル</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/register-circle")}
              >
                サークルを登録する
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                現在所属しているサークルはありません
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/search")}
              >
                サークルを探す
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 