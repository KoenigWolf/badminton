import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { GiShuttlecock } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 定数化：フッター内リンクデータ
const FOOTER_LINKS = [
  {
    title: "サービスについて",
    links: [
      { href: "/about", label: "当サイトについて" },
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/terms", label: "利用規約" },
      { href: "/contact", label: "お問い合わせ" },
    ],
  },
  {
    title: "サークルオーナー向け",
    links: [
      { href: "/register-circle", label: "サークルを登録する" },
      { href: "/manage-circle", label: "サークル管理" },
      { href: "/guides", label: "運用ガイド" },
      { href: "/faq", label: "よくある質問" },
    ],
  },
  {
    title: "サークル検索",
    links: [
      { href: "/search?level=beginner", label: "初心者向けサークル" },
      { href: "/search?level=intermediate", label: "中級者向けサークル" },
      { href: "/search?level=advanced", label: "上級者向けサークル" },
      { href: "/search", label: "すべてのサークル" },
    ],
  },
];

// 定数化：SNSリンクデータ（lucide-react のアイコンを使用）
const SOCIAL_LINKS = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
];

// フッターリンクセクション：Card コンポーネントでリンク群をラップ
const FooterLinks = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <Card className="border-none shadow-none">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {links.map(({ href, label }) => (
        <Button key={href} variant="link" asChild className="p-0">
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </CardContent>
  </Card>
);

// フッターコンポーネント：全体レイアウトはシンプルに shadcn/ui で統一
export default function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        {/* 上部：ロゴ・サービス説明・SNSリンク */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            {/* ロゴ部分：GiShuttlecock を使用して SVG の記述を削減 */}
            <div className="flex items-center space-x-2 mb-4">
              <GiShuttlecock className="w-8 h-8 text-primary" aria-hidden="true" />
              <span className="font-bold text-lg text-foreground">BadFinder</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              バドミントンサークルファインダーは、あなたにぴったりのバドミントンサークルを見つけるための検索プラットフォームです。
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Button key={href} variant="ghost" size="icon" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={20} />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* 各リンクセクション */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <FooterLinks key={title} title={title} links={links} />
          ))}
        </div>

        <Separator className="my-8" />

        {/* 下部：著作権表示 */}
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BadFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
