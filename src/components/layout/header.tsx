"use client";

// ─────────────────────────────
// ライブラリおよびコンポーネントのインポート
// ─────────────────────────────
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes"; // テーマ切替用のフック
import { useSession, signOut } from "next-auth/react"; // 認証状態管理用のフックとサインアウト関数
import { toast } from "sonner"; // 通知表示用ライブラリ
import { GiShuttlecock } from "react-icons/gi";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

// ─────────────────────────────
// ナビゲーションリンクの定義
// ─────────────────────────────
const navLinks = [
  { href: "/search", label: "サークルを探す" },
  { href: "/register-circle", label: "サークルを登録する" },
  { href: "/about", label: "当サイトについて" },
  { href: "/faq", label: "よくある質問" },
];

// ─────────────────────────────
// Headerコンポーネント：サイト全体のヘッダーを管理
// ・デスクトップとモバイルの両方のナビゲーションを含む
// ・テーマ切替および認証状態に基づくリンクを表示
// ─────────────────────────────
export default function Header() {
  // テーマの現在値と更新関数を取得
  const { theme, setTheme } = useTheme();
  // 現在のURLパスを取得（アクティブリンク判定に使用）
  const pathname = usePathname();
  // モバイルメニューの開閉状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 認証情報を取得（セッション情報と認証ステータス）
  const { data: session, status } = useSession();
  // 認証済みかどうかの真偽値（"authenticated"の場合はtrue）
  const isAuthenticated = status === "authenticated";

  // ─────────────────────────────
  // メニューの開閉を切り替える関数
  // ─────────────────────────────
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  // ─────────────────────────────
  // メニューを閉じる関数
  // ─────────────────────────────
  const closeMenu = () => setIsMenuOpen(false);

  // ─────────────────────────────
  // ログアウト処理
  // ・サインアウト後、成功通知を表示し、モバイルメニューを閉じる
  // ・エラー発生時はエラーメッセージを表示
  // ─────────────────────────────
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("ログアウトしました");
      closeMenu();
    } catch (error) {
      toast.error("ログアウト中にエラーが発生しました");
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ─────────────────────────────
              ロゴ部分：サイト名とシンプルなロゴアイコン
              ・クリックでトップページに遷移し、メニューを閉じる
              ───────────────────────────── */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <GiShuttlecock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              BadFinder
            </span>
          </Link>

          {/* ─────────────────────────────
              デスクトップナビゲーション
              ・中サイズ以上の画面で表示
              ・現在のパスと比較しアクティブリンクを強調
              ───────────────────────────── */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ─────────────────────────────
              右側の操作エリア：テーマ切替、認証関連リンク、モバイルメニュートグル
              ───────────────────────────── */}
          <div className="flex items-center space-x-4">
            {/* テーマ切替ボタン：クリックでライトとダークを切り替え */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="テーマ切り替え"
              type="button"
            >
              {theme === "dark" ? (
                <BsSunFill className="h-5 w-5" />
              ) : (
                <BsMoonFill className="h-5 w-5" />
              )}
            </button>

            {/* 認証済みか否かによって表示内容を切替 */}
            {isAuthenticated ? (
              // 認証済みユーザー向け：マイページ、ログアウト、プロフィール画像リンク
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    pathname === "/dashboard"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  マイページ
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  type="button"
                >
                  ログアウト
                </button>
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "ユーザー"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaUser className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </Link>
              </div>
            ) : (
              // 未認証ユーザー向け：ログインおよび新規登録リンク
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  新規登録
                </Link>
              </div>
            )}

            {/* ─────────────────────────────
                モバイルメニュートグルボタン
                ・小さい画面ではメニューの開閉を制御
                ───────────────────────────── */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="メニュー"
              type="button"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────
          モバイルメニュー
          ・mdサイズ未満の画面で表示
          ・ナビゲーションリンクと認証関連の情報を縦方向に配置
          ───────────────────────────── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    {/* ユーザー情報表示部分 */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        {session?.user?.image ? (
                          <img
                            src={session.user.image}
                            alt={session.user.name || "ユーザー"}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <FaUser className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">
                          {session?.user?.name || "ユーザー"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    {/* マイページへのリンク */}
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={closeMenu}
                    >
                      マイページ
                    </Link>
                    {/* ログアウトボタン */}
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-left"
                      type="button"
                    >
                      ログアウト
                    </button>
                  </>
                ) : (
                  <>
                    {/* 未認証ユーザー用のリンク：ログインと新規登録 */}
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={closeMenu}
                    >
                      ログイン
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center"
                      onClick={closeMenu}
                    >
                      新規登録
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
