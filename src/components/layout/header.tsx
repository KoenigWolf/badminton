"use client";

/**
 * @file header.tsx
 * @description サイト全体のヘッダーコンポーネント
 *  - ロゴ表示、デスクトップ用ナビゲーション、ユーザーメニュー（認証状態に応じて表示）
 *  - テーマ切替、モバイルメニュー（Sheet）を含む
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { GiShuttlecock } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiLogIn, FiUserPlus, FiChevronDown } from "react-icons/fi";
import type { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// ─────────────────────────────
// 型定義と定数
// ─────────────────────────────

/**
 * ナビゲーションリンクの型定義
 */
interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
}

/**
 * ヘッダー用のナビゲーションリンク定数
 */
const NAV_LINKS: NavLink[] = [
  { href: "/search", label: "サークルを探す", ariaLabel: "バドミントンサークルを探す" },
  { href: "/register-circle", label: "サークルを登録する", ariaLabel: "あなたのバドミントンサークルを登録する" },
  { href: "/about", label: "当サイトについて", ariaLabel: "BadFinderサイトの詳細情報" },
  { href: "/faq", label: "よくある質問", ariaLabel: "よくある質問と回答" },
];

/**
 * モバイルメニューに必要なプロパティの型定義
 */
interface MobileMenuProps {
  isAuthenticated: boolean;
  session: Session | null;
  handleLogout: () => Promise<void>;
}

// ─────────────────────────────
// 各コンポーネント
// ─────────────────────────────

/**
 * HeaderLogo コンポーネント
 * サイトロゴ（react-icons の GiShuttlecock を利用）とサイト名を表示
 */
const HeaderLogo = () => (
  <Link href="/" className="flex items-center space-x-2" aria-label="BadFinder トップページへ">
    <GiShuttlecock className="w-8 h-8 text-primary" aria-hidden="true" />
    <span className="font-bold text-xl">BadFinder</span>
  </Link>
);

/**
 * HeaderNavigation コンポーネント
 * デスクトップ用のナビゲーションリンクを表示
 * 現在のパスに応じてボタンの variant を切り替える
 */
const HeaderNavigation = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex space-x-4" aria-label="メインナビゲーション">
      {NAV_LINKS.map(({ href, label, ariaLabel }) => (
        <Button
          key={href}
          variant={pathname === href ? "default" : "ghost"}
          asChild
        >
          <Link
            href={href}
            aria-label={ariaLabel}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

/**
 * HeaderUserMenu コンポーネント
 * 認証済みユーザー向けのドロップダウンメニューを表示
 * Avatar によりユーザー画像（またはイニシャル）を表示
 */
const HeaderUserMenu = ({ session, handleLogout }: { session: Session; handleLogout: () => Promise<void> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="flex items-center gap-1" aria-label="ユーザーメニューを開く">
        <Avatar className="h-8 w-8">
          <AvatarImage src={session?.user?.image || ""} alt={`${session?.user?.name || "ユーザー"}のプロフィール画像`} />
          <AvatarFallback aria-hidden="true">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <FiChevronDown className="h-4 w-4" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href="/dashboard" aria-label="マイページに移動">マイページ</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/profile" aria-label="プロフィール設定に移動">プロフィール</Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleLogout} aria-label="ログアウトする">
        ログアウト
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * HeaderAccountMenu コンポーネント
 * 未認証ユーザー向けのアカウントメニューを表示
 */
const HeaderAccountMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="flex items-center gap-1" aria-label="アカウントメニューを開く">
        アカウント <FiChevronDown className="h-4 w-4" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href="/auth/login" aria-label="ログインページへ移動">
          <FiLogIn className="mr-2 h-4 w-4" aria-hidden="true" />
          ログイン
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/auth/signup" aria-label="新規登録ページへ移動">
          <FiUserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
          新規登録
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * MobileMenu コンポーネント
 * モバイル表示用のナビゲーションメニューを Sheet コンポーネントで実装
 */
const MobileMenu = ({ isAuthenticated, session, handleLogout }: MobileMenuProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="メニューを開く">
        <FaBars className="h-6 w-6" aria-hidden="true" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      {/* モバイルナビゲーションリンク */}
      <nav className="flex flex-col space-y-4" aria-label="モバイルナビゲーション">
        {NAV_LINKS.map(({ href, label, ariaLabel }) => (
          <Button key={href} variant="link" asChild>
            <Link href={href} aria-label={ariaLabel}>
              {label}
            </Link>
          </Button>
        ))}
      </nav>
      <Separator className="my-4" />
      {/* 認証状態に応じたメニュー */}
      {isAuthenticated ? (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} alt={`${session?.user?.name || "ユーザー"}のプロフィール画像`} />
              <AvatarFallback aria-hidden="true">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session?.user?.name || "ユーザー"}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard" aria-label="マイページに移動">マイページ</Link>
          </Button>
          <Button variant="destructive" onClick={handleLogout} aria-label="ログアウトする">
            ログアウト
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/auth/login" aria-label="ログインページへ移動">
              <FiLogIn className="mr-2 h-4 w-4" aria-hidden="true" />
              ログイン
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup" aria-label="新規登録ページへ移動">
              <FiUserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
              新規登録
            </Link>
          </Button>
        </div>
      )}
    </SheetContent>
  </Sheet>
);

/**
 * Header コンポーネント
 * サイト全体のヘッダーとして、ロゴ、ナビゲーション、ユーザー/アカウントメニュー、テーマ切替、モバイルメニューを統合
 */
export default function Header() {
  // テーマ切替用フック（next-themes）
  const { theme, setTheme } = useTheme();
  // 現在の URL パス取得（アクティブリンク判定用）
  const pathname = usePathname();
  // 認証状態取得（next-auth）
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  /**
   * ログアウト処理
   * サインアウト後、通知を表示
   */
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("ログアウトしました");
    } catch {
      toast.error("ログアウト中にエラーが発生しました");
    }
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* ロゴ部分 */}
        <HeaderLogo />
        {/* デスクトップナビゲーション */}
        <HeaderNavigation />
        {/* 右側操作エリア：テーマ切替とユーザー/アカウントメニュー */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"}
          >
            {theme === "dark" ? (
              <BsSunFill className="h-5 w-5" aria-hidden="true" />
            ) : (
              <BsMoonFill className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
          {isAuthenticated && session ? (
            <HeaderUserMenu session={session} handleLogout={handleLogout} />
          ) : (
            <HeaderAccountMenu />
          )}
          {/* モバイルメニュー（小画面用） */}
          <div className="md:hidden">
            <MobileMenu isAuthenticated={isAuthenticated} session={session} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
