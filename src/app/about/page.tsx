import { Metadata } from "next";
import { Bookmark, Users, Search, Shield } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

export const metadata: Metadata = {
  title: "サイトについて | BadFinder",
  description: "BadFinderはバドミントンサークルのマッチングプラットフォームです。サークル探しからコミュニティ作りまで、あなたのバドミントンライフをサポートします。",
};

/**
 * サイトについてページ
 * 
 * @returns AboutPageコンポーネント
 */
export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダーセクション */}
        <div className="text-center mb-16">
          <IconBadge
            icon={<Bookmark className="h-4 w-4" />}
            variant="default"
            className="mx-auto mb-4"
          >
            About Us
          </IconBadge>
          <h1 className="text-4xl font-bold mb-6">
            バドミントンを通じて、
            <br className="hidden sm:inline" />
            新しいコミュニティを見つけよう
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            BadFinderは、バドミントン愛好者のためのプラットフォームです。
            サークル探しからコミュニティ作りまで、あなたのバドミントンライフをサポートします。
          </p>
        </div>

        {/* ミッションセクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <Users className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">コミュニティ形成</h3>
            <p className="text-muted-foreground">
              バドミントンを通じて、地域の仲間との出会いと交流を促進します。
              共通の趣味を持つ仲間と一緒に成長できる環境を提供します。
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <Search className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">マッチング</h3>
            <p className="text-muted-foreground">
              レベルや活動頻度、地域など、あなたの希望に合ったサークルを
              簡単に見つけることができます。
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <Shield className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">信頼性</h3>
            <p className="text-muted-foreground">
              サークル情報は厳重に審査され、信頼できる情報のみを掲載。
              安心して活動できる環境を確保します。
            </p>
          </div>
        </div>

        {/* プラットフォーム概要 */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">プラットフォームについて</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              BadFinderは、バドミントンサークルとプレイヤーを結ぶオンラインプラットフォームです。
              地域やレベル、活動頻度などの条件に基づいて、最適なサークルを見つけることができます。
            </p>
            <p>
              サークル運営者は、自身のサークル情報を登録・管理することができ、
              新しいメンバーとの出会いの機会を得ることができます。
            </p>
            <p>
              また、プレイヤーは各サークルの詳細な情報を閲覧でき、
              自分に合ったサークルを効率的に見つけることができます。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}