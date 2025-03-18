"use client";

/**
 * @file header.tsx
 * @description サイト全体のヘッダーコンポーネント
 * 主な機能：
 *  - ロゴ表示、デスクトップ用ナビゲーション
 *  - ユーザーメニュー（認証状態に応じた表示切替）
 *  - テーマ切替（ダーク/ライトモード）
 *  - レスポンシブ対応のモバイルメニュー
 *  - アクセシビリティ対応（aria属性など）
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

// 型定義

/**
 * ナビゲーションリンクの型定義
 * @property href - リンク先のURL
 * @property label - 表示するリンクテキスト
 * @property ariaLabel - アクセシビリティのための詳細なラベル（任意）
 */
interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
}

/**
 * ユーザーメニュー関連のプロパティ型定義
 * @property session - ユーザーセッション情報
 * @property handleLogout - ログアウト処理を行う関数
 */
interface UserMenuProps {
  session: Session;
  handleLogout: () => Promise<void>;
}

/**
 * モバイルメニューのプロパティ型定義
 * @property isAuthenticated - 認証状態（ログイン済みかどうか）
 * @property session - ユーザーセッション情報（未認証時はnull）
 * @property handleLogout - ログアウト処理を行う関数
 */
interface MobileMenuProps {
  isAuthenticated: boolean;
  session: Session | null;
  handleLogout: () => Promise<void>;
}

// 定数

/**
 * グローバルナビゲーションリンク
 * - サイト内の主要なページへのリンクを定義
 * - アクセシビリティ向上のためariaLabelを設定
 */
const NAV_LINKS: NavLink[] = [
  { 
    href: "/search", 
    label: "サークルを探す", 
    ariaLabel: "バドミントンサークルを探す" 
  },
  { 
    href: "/register-circle", 
    label: "サークルを登録する", 
    ariaLabel: "あなたのバドミントンサークルを登録する" 
  },
  { 
    href: "/about", 
    label: "当サイトについて", 
    ariaLabel: "BadFinderサイトの詳細情報" 
  },
  { 
    href: "/faq", 
    label: "よくある質問", 
    ariaLabel: "よくある質問と回答" 
  },
];

/**
 * 認証済みユーザー用メニュー項目
 * オブジェクト配列で管理することで将来的な拡張が容易
 */
const USER_MENU_ITEMS = [
  { href: "/dashboard", label: "マイページ", ariaLabel: "マイページに移動" },
  { href: "/profile", label: "プロフィール", ariaLabel: "プロフィール設定に移動" },
];

// ヘルパー関数

/**
 * ユーザーのアバターイメージまたはフォールバックを生成
 * @param session - ユーザーセッション情報
 * @param size - アバターのサイズクラス（オプション）
 * @returns Avatarコンポーネント
 */
const renderUserAvatar = (session: Session | null, size = "h-8 w-8") => (
  <Avatar className={size}>
    <AvatarImage 
      src={session?.user?.image || ""} 
      alt={`${session?.user?.name || "ユーザー"}のプロフィール画像`} 
    />
    <AvatarFallback aria-hidden="true">
      {session?.user?.name?.charAt(0) || "U"}
    </AvatarFallback>
  </Avatar>
);

// サブコンポーネント
/**
 * サイトロゴコンポーネント
 * サイトのブランディング表示とトップページへのリンク
 */
const HeaderLogo = () => (
  <Link 
    href="/" 
    className="flex items-center space-x-2" 
    aria-label="BadFinder トップページへ"
  >
    <GiShuttlecock className="w-8 h-8 text-primary" aria-hidden="true" />
    <span className="font-bold text-xl">BadFinder</span>
  </Link>
);

/**
 * テーマ切替ボタンコンポーネント
 * ダークモードとライトモードを切り替えるボタン
 */
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      aria-label={isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
    >
      {isDarkMode ? (
        <BsSunFill className="h-5 w-5" aria-hidden="true" />
      ) : (
        <BsMoonFill className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
};

/**
 * デスクトップ用ナビゲーションコンポーネント
 * 現在のパスに基づいてアクティブなリンクのスタイルを変更
 */
const HeaderNavigation = () => {
  const pathname = usePathname();
  
  return (
    <nav className="hidden md:flex space-x-4" aria-label="メインナビゲーション">
      {NAV_LINKS.map(({ href, label, ariaLabel }) => {
        const isActive = pathname === href;
        
        return (
          <Button
            key={href}
            variant={isActive ? "default" : "ghost"}
            asChild
          >
            <Link
              href={href}
              aria-label={ariaLabel}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

/**
 * ログイン済みユーザー用メニューコンポーネント
 * ユーザーアバターとドロップダウンメニューを表示
 */
const HeaderUserMenu = ({ session, handleLogout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        aria-label="ユーザーメニューを開く"
      >
        {renderUserAvatar(session)}
        <FiChevronDown className="h-4 w-4" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {USER_MENU_ITEMS.map((item) => (
        <DropdownMenuItem key={item.href} asChild>
          <Link href={item.href} aria-label={item.ariaLabel}>
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem 
        onClick={handleLogout} 
        aria-label="ログアウトする"
        className="text-destructive focus:text-destructive"
      >
        ログアウト
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * 未ログインユーザー用アカウントメニューコンポーネント
 * ログインと新規登録へのリンクを表示
 */
const HeaderAccountMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        aria-label="アカウントメニューを開く"
      >
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
 * モバイル用ナビゲーションメニューコンポーネント
 * 小画面デバイス用のサイドメニュー（Sheet）を実装
 */
const MobileMenu = ({ isAuthenticated, session, handleLogout }: MobileMenuProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="メニューを開く"
      >
        <FaBars className="h-6 w-6" aria-hidden="true" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      {/* サイトロゴ */}
      <div className="mb-6">
        <HeaderLogo />
      </div>
      
      {/* ナビゲーションリンク */}
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
          {/* ユーザー情報表示 */}
          <div className="flex items-center space-x-3">
            {renderUserAvatar(session)}
            <div>
              <p className="text-sm font-medium">{session?.user?.name || "ユーザー"}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          
          {/* ユーザーメニュー項目 */}
          {USER_MENU_ITEMS.map((item) => (
            <Button key={item.href} variant="outline" asChild>
              <Link href={item.href} aria-label={item.ariaLabel}>
                {item.label}
              </Link>
            </Button>
          ))}
          
          {/* ログアウトボタン */}
          <Button 
            variant="destructive" 
            onClick={handleLogout} 
            aria-label="ログアウトする"
          >
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
      
      {/* テーマ切替 */}
      <div className="mt-6">
        <ThemeToggleButton />
      </div>
    </SheetContent>
  </Sheet>
);

// メインコンポーネント
/**
 * ヘッダーコンポーネント
 * サイト全体のヘッダー部分を構成する
 * 主な機能：
 * - 認証状態に応じたUI表示の切り替え
 * - レスポンシブ対応（デスクトップ/モバイル）
 * - ログアウト処理
 */
export default function Header() {
  // 認証状態取得
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  /**
   * ログアウト処理
   * サインアウト後、成功/失敗の通知を表示
   */
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("ログアウトしました");
    } catch (error) {
      console.error("ログアウトエラー：", error);
      toast.error("ログアウト中にエラーが発生しました");
    }
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* サイトロゴ */}
        <HeaderLogo />
        
        {/* デスクトップナビゲーション（中画面以上で表示） */}
        <HeaderNavigation />
        
        {/* 右側操作エリア：テーマ切替とユーザーメニュー */}
        <div className="flex items-center space-x-4">
          {/* テーマ切替ボタン */}
          <ThemeToggleButton />
          
          {/* ユーザー/アカウントメニュー（認証状態で切替） */}
          {isAuthenticated && session ? (
            <HeaderUserMenu session={session} handleLogout={handleLogout} />
          ) : (
            <HeaderAccountMenu />
          )}
          
          {/* モバイルメニュー（中画面未満で表示） */}
          <div className="md:hidden">
            <MobileMenu 
              isAuthenticated={isAuthenticated} 
              session={session} 
              handleLogout={handleLogout} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
