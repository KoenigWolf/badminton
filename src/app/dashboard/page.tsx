"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentMatches } from "@/components/dashboard/recent-matches";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { LoadingSpinner } from "@/components/dashboard/loading-spinner";

/**
 * DashboardPageコンポーネント
 * ユーザーのダッシュボードページ
 */
export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  // 認証状態が「unauthenticated」の場合、ログインページへ自動リダイレクト
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // ローディング中の場合は、スピナー表示
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // 認証済みでない場合、何も表示しない（useEffectでリダイレクト済み）
  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMatches />
        <UpcomingEvents />
      </div>
    </div>
  );
}

