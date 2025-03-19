/**
 * @file faq/page.tsx
 * @description よくある質問（FAQ）ページ
 */

import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItemWithContext,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "よくある質問 | BadFinder",
  description: "バドミントンサークル探しに関するよくある質問と回答をご紹介します。",
};

/**
 * FAQの型定義
 */
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

/**
 * よくある質問ページ
 * 
 * @returns FAQPageコンポーネント
 */
export default function FAQPage() {
  const faqs: FAQ[] = [
    {
      id: "register",
      question: "サークルの登録方法を教えてください",
      answer: "サイト上部メニューの「サークルを登録する」から、必要な情報を入力することでサークルを登録できます。基本情報、活動内容、写真などを登録してください。登録後、管理者による確認を経て掲載されます。",
    },
    {
      id: "free",
      question: "利用料金は必要ですか？",
      answer: "BadFinderの基本的な機能（サークル検索、閲覧など）は無料でご利用いただけます。サークルの登録・管理も無料です。将来的に有料のプレミアム機能を導入する可能性がありますが、その際は別途お知らせいたします。",
    },
    {
      id: "search",
      question: "希望の条件に合うサークルを探すにはどうすればよいですか？",
      answer: "「サークルを探す」ページで、地域、活動頻度、レベルなど、様々な条件で絞り込み検索が可能です。マップ検索を使用すれば、活動場所から近いサークルを見つけることもできます。",
    },
    {
      id: "contact",
      question: "サークルへの問い合わせ方法は？",
      answer: "各サークルの詳細ページに問い合わせフォームがあります。会員登録後、そちらから直接サークル管理者へメッセージを送ることができます。サークルによっては外部の連絡先（メールアドレスなど）が公開されている場合もあります。",
    },
    {
      id: "level",
      question: "初心者でも参加できるサークルはありますか？",
      answer: "はい、多くのサークルが初心者を受け入れています。検索時に「レベル」で絞り込むことで、初心者向けのサークルを見つけることができます。サークルの詳細ページでは、必要な経験やレベルが明記されています。",
    },
    {
      id: "update",
      question: "登録したサークル情報の更新方法は？",
      answer: "ログイン後、マイページから登録サークルの管理ページにアクセスできます。そこから情報の編集、写真の追加・削除、お知らせの投稿などが行えます。",
    },
    {
      id: "delete",
      question: "サークル情報を削除したい場合はどうすればよいですか？",
      answer: "マイページのサークル管理ページから削除申請を行うことができます。なお、誤って削除してしまった場合は、30日以内であれば復元が可能です。",
    },
    {
      id: "report",
      question: "不適切な内容を見つけた場合の報告方法は？",
      answer: "各サークルの詳細ページ下部にある「違反を報告する」ボタンから報告できます。スパムや不適切な内容は、管理者が確認次第対応いたします。",
    }
  ];

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダーセクション */}
        <div className="text-center mb-16">
          <IconBadge
            icon={<HelpCircle className="h-4 w-4" />}
            variant="default"
            className="mx-auto mb-4"
          >
            FAQ
          </IconBadge>
          <h1 className="text-4xl font-bold mb-6">よくある質問</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            BadFinderの使い方やサークル探しに関する疑問にお答えします。
            お探しの答えが見つからない場合は、お気軽にお問い合わせください。
          </p>
        </div>

        {/* FAQ一覧 */}
        <div className="max-w-3xl mx-auto">
          <Accordion className="w-full" defaultValue={faqs[0].id}>
            {faqs.map((faq) => (
              <AccordionItemWithContext key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItemWithContext>
            ))}
          </Accordion>
        </div>

        {/* 追加の問い合わせ案内 */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            その他のご質問やお問い合わせは、
            <a 
              href="mailto:support@badfinder.jp"
              className="text-primary hover:underline"
              aria-label="サポートメールを送信"
            >
              support@badfinder.jp
            </a>
            までお願いいたします。
          </p>
        </div>
      </div>
    </main>
  );
}