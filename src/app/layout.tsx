// グローバルCSSを読み込む
import "./globals.css";
// Next.js用のMetadata型をインポート
import type { Metadata } from "next";
// Google FontsのInterフォントをNext.js経由でインポート
import { Inter } from "next/font/google";
// テーマ（ライト／ダーク）の管理用プロバイダをインポート
import { ThemeProvider } from "@/components/providers/theme-provider";
// 認証状態の管理用プロバイダをインポート
import { AuthProvider } from "@/components/providers/auth-provider";
// ヘッダーとフッターのレイアウトコンポーネントをインポート
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// 通知（トースター）表示用のUIコンポーネントをインポート
import { Toaster } from "@/components/ui/sonner";

// Google FontsのInterフォント設定（ラテン文字サブセットを有効化）
const inter = Inter({ subsets: ["latin"] });

// ページ全体のメタデータ定義
export const metadata: Metadata = {
  title: "バドミントンサークルファインダー",
  description: "あなたにぴったりのバドミントンサークルを見つけよう",
};

// ─────────────────────────────
// RootLayoutコンポーネント
// サイト全体の共通レイアウトを管理する
// ・HTMLおよびbodyタグの設定
// ・認証とテーマ管理用のプロバイダで全体をラップ
// ・ヘッダー、フッター、子コンテンツ（各ページ固有の内容）を配置
// ─────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTMLルート要素：日本語設定、サーバーサイドレンダリングの水和警告を抑制
    <html lang="ja" suppressHydrationWarning>
      {/* bodyタグにGoogle FontsのInterフォントのクラスを適用 */}
      <body className={inter.className}>
        {/* 認証状態管理プロバイダでアプリ全体をラップ */}
        <AuthProvider>
          {/* テーマ管理プロバイダでライト／ダークモードの切替を提供 */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* サイト全体のレイアウトコンテナ：ヘッダー・メインコンテンツ・フッター */}
            <div className="flex flex-col min-h-screen">
              {/* ヘッダーコンポーネント */}
              <Header />
              {/* メインコンテンツ領域：各ページの固有コンテンツを表示 */}
              <div className="flex-grow">{children}</div>
              {/* フッターコンポーネント */}
              <Footer />
            </div>
            {/* グローバル通知用コンポーネント（例：エラーメッセージや成功通知の表示） */}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
