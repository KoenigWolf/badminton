"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { GiShuttlecock } from "react-icons/gi";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiLogIn, FiUserPlus, FiChevronDown } from "react-icons/fi";
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

// ナビゲーションリンク
const NAV_LINKS = [
  { href: "/search", label: "サークルを探す" },
  { href: "/register-circle", label: "サークルを登録する" },
  { href: "/about", label: "当サイトについて" },
  { href: "/faq", label: "よくある質問" },
];

// モバイルメニュー
const MobileMenu = ({ isAuthenticated, session, handleLogout }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <FaBars className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col space-y-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Button key={href} variant="link" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>
        <Separator className="my-4" />
        {isAuthenticated ? (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{session?.user?.name || "ユーザー"}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">マイページ</Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>ログアウト</Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Button asChild>
              <Link href="/auth/login">
                <FiLogIn className="mr-2 h-4 w-4" />
                ログイン
              </Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">
                <FiUserPlus className="mr-2 h-4 w-4" />
                新規登録
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

// ヘッダーコンポーネント
export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

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
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <GiShuttlecock className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl">BadFinder</span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex space-x-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Button key={href} variant={pathname === href ? "default" : "ghost"} asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>

        {/* 右側アイテム */}
        <div className="flex items-center space-x-4">
          {/* テーマ切り替え */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <BsSunFill className="h-5 w-5" /> : <BsMoonFill className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <FiChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">マイページ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">プロフィール</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  アカウント <FiChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">
                    <FiLogIn className="mr-2 h-4 w-4" />
                    ログイン
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup">
                    <FiUserPlus className="mr-2 h-4 w-4" />
                    新規登録
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* モバイルメニュー */}
          <MobileMenu isAuthenticated={isAuthenticated} session={session} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
