"use client";

// ─────────────────────────────
// 外部ライブラリのインポート
// ─────────────────────────────
import { useSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  FaUser,
  FaHeart,
  FaCommentAlt,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Trophy, Activity } from "@phosphor-icons/react";

// ─────────────────────────────
// DashboardPageコンポーネント：ユーザーのダッシュボードページ
// ・認証状態のチェック、リダイレクト、ログアウト処理、各種情報カードの表示を管理
// ─────────────────────────────
export default function DashboardPage() {
  // セッションと認証状態の取得
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 認証状態が「unauthenticated」の場合、ログインページへ自動リダイレクト
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // ログアウト処理：signOutを呼び出し、成功時にトップページへ遷移
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      toast.success("ログアウトしました");
      router.push("/");
    } catch (e) {
      toast.error("ログアウト中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // ローディング中の場合は、スピナー表示
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 認証済みでない場合、何も表示しない（useEffectでリダイレクト済み）
  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今後の試合</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              今週の予定された試合数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">チームメンバー</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              アクティブなメンバー数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">勝率</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              直近10試合の勝率
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活動時間</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">
              今週の合計活動時間
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近の試合結果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">対戦相手 {i}</p>
                    <p className="text-sm text-muted-foreground">
                      2024-03-{i} 14:00
                    </p>
                  </div>
                  <Button variant={i % 2 === 0 ? "default" : "destructive"}>
                    {i % 2 === 0 ? "勝利" : "敗北"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今後の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">練習会 {i}</p>
                    <p className="text-sm text-muted-foreground">
                      2024-03-{i + 10} 19:00
                    </p>
                  </div>
                  <Button variant="outline">詳細</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────
// LoadingSpinnerコンポーネント
// ・認証状態のロード中に表示するスピナーコンポーネント
// ─────────────────────────────
function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {/* 回転するスピナー */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
      </div>
    </div>
  );
}

// ─────────────────────────────
// DashboardHeaderコンポーネント
// ・ユーザーの名前、メール、ログアウトボタンなどの情報を表示するヘッダー部分
// ─────────────────────────────
type DashboardHeaderProps = {
  session: Session | null;
  onLogout: () => void;
  isLoading: boolean;
};

function DashboardHeader({ session, onLogout, isLoading }: DashboardHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* ユーザーの基本情報 */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <FaUser className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              こんにちは、{session?.user?.name || "ゲスト"}さん
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
        {/* ログアウトボタン */}
        <Button
          variant="outline"
          onClick={onLogout}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <FaSignOutAlt className="h-4 w-4" />
          ログアウト
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// UserProfileCardコンポーネント
// ・ユーザーのプロフィール情報を表示し、プロフィール編集ページへ遷移するリンクを含む
// ─────────────────────────────
type UserProfileCardProps = {
  session: Session | null;
  router: ReturnType<typeof useRouter>;
};

function UserProfileCard({ session, router }: UserProfileCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <CgProfile className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold dark:text-white">プロフィール</h2>
      </div>
      <div className="space-y-4">
        {/* ユーザー名 */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">名前</p>
          <p className="font-medium dark:text-white">
            {session?.user?.name || "未設定"}
          </p>
        </div>
        {/* ユーザーメール */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">メールアドレス</p>
          <p className="font-medium dark:text-white">
            {session?.user?.email}
          </p>
        </div>
        {/* ユーザーのレベル */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">レベル</p>
          <p className="font-medium dark:text-white">未設定</p>
        </div>
        {/* ユーザーの居住地 */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">都道府県</p>
          <p className="font-medium dark:text-white">未設定</p>
        </div>
        {/* プロフィール編集ボタン */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/profile")}
        >
          プロフィールを編集
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// FavoriteCirclesCardコンポーネント
// ・お気に入りサークルの状態を表示し、サークル検索ページへのリンクを提供
// ─────────────────────────────
type FavoriteCirclesCardProps = {
  router: ReturnType<typeof useRouter>;
};

function FavoriteCirclesCard({ router }: FavoriteCirclesCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaHeart className="h-5 w-5 text-red-500" />
        <h2 className="text-lg font-bold dark:text-white">お気に入りサークル</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-48 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          まだお気に入りに登録したサークルがありません
        </p>
        <Button variant="outline" onClick={() => router.push("/search")}>
          サークルを探す
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// ApplicationStatusCardコンポーネント
// ・参加申請中のサークルの状況を表示し、サークル検索ページへのリンクを提供
// ─────────────────────────────
type ApplicationStatusCardProps = {
  router: ReturnType<typeof useRouter>;
};

function ApplicationStatusCard({ router }: ApplicationStatusCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaCommentAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold dark:text-white">参加申請状況</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-48 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          現在申請中のサークルはありません
        </p>
        <Button variant="outline" onClick={() => router.push("/search")}>
          サークルを探す
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// AffiliatedCirclesCardコンポーネント
// ・所属サークルの情報を表示し、サークル登録や検索へのリンクを提供
// ─────────────────────────────
type AffiliatedCirclesCardProps = {
  router: ReturnType<typeof useRouter>;
};

function AffiliatedCirclesCard({ router }: AffiliatedCirclesCardProps) {
  return (
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
        <Button variant="outline" onClick={() => router.push("/search")}>
          サークルを探す
        </Button>
      </div>
    </div>
  );
}
