import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

// Google Fonts の Inter フォント設定（ラテン文字サブセットを有効化）
const inter = Inter({ subsets: ["latin"] });

// ページ全体のメタデータ定義
// タイトルおよび説明文を設定する
export const metadata: Metadata = {
  title: "バドミントンサークルファインダー",
  description: "あなたにぴったりのバドミントンサークルを見つけよう",
};

// LayoutProviders コンポーネント
// 認証状態とテーマ設定のプロバイダで子コンテンツをラップする
// グローバル通知コンポーネントも含む
function LayoutProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 認証状態管理プロバイダでアプリ全体をラップ
    <AuthProvider>
      {/* テーマ管理プロバイダでライト／ダークモードの切替を提供
          attribute：HTML 属性名（ここでは "class"）を使用してテーマ設定を反映
          defaultTheme：システム設定に準じた初期テーマを指定
          enableSystem：システムテーマの変更に追従
          disableTransitionOnChange：テーマ切替時の CSS トランジションを無効化 */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* 子コンテンツ（ヘッダー、メイン、フッターなど）を表示 */}
        {children}
        {/* グローバル通知（例：エラーメッセージや成功通知）を表示 */}
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

// RootLayout コンポーネント：サイト全体の共通レイアウトを管理するコンポーネント
// HTML および body タグの設定、プロバイダの適用、ヘッダー・フッターの配置を行う
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML ルート要素：言語設定を日本語に指定しサーバーサイドレンダリングの水和警告を抑制
    <html lang="ja" suppressHydrationWarning>
      {/* body タグに Google Fonts の Inter フォントのクラスを適用 */}
      <body className={inter.className}>
        {/* プロバイダ群で全体をラップ */}
        <LayoutProviders>
          {/* サイト全体のレイアウトコンテナ：
              - flex コンテナで縦方向に配置
              - 最低画面高さを設定してフッターを常に下部に配置 */}
          <div className="flex flex-col min-h-screen">
            {/* ヘッダーコンポーネント：サイト上部に固定表示 */}
            <Header />
            {/* メインコンテンツ領域：各ページ固有の内容を表示する領域 */}
            <main className="flex-grow">{children}</main>
            {/* フッターコンポーネント：サイト下部に固定表示 */}
            <Footer />
          </div>
        </LayoutProviders>
      </body>
    </html>
  );
}
