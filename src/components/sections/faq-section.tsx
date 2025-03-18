"use client";

/**
 * @file FAQSection - よくある質問セクション
 * @description サービスに関するよくある質問と回答をアコーディオン形式で表示するセクション
 */

import { motion } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { Card } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";

/**
 * FAQ項目の型定義
 */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string; // オプショナル：質問カテゴリ
}

/**
 * FAQアコーディオンアイテムコンポーネント - 個々のQ&Aを表示
 * 
 * @param props - FAQ項目のプロパティとインデックス
 * @returns FAQアコーディオンアイテムコンポーネント
 */
function FAQAccordionItem({ faq, index }: { faq: FAQItem; index: number }) {
  return (
    <motion.div
      key={faq.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="overflow-hidden mb-4 last:mb-0"
    >
      <Card
        variant="ghost"
        className="border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800"
      >
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer p-6 [&::-webkit-details-marker]:hidden focus:outline-none">
            <span className="text-lg font-semibold dark:text-white">
              {faq.question}
            </span>
            <ChevronDown 
              size={20} 
              className="text-gray-500 transition-transform duration-300 group-open:rotate-180" 
            />
          </summary>
          <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 mt-3">
            <p className="leading-relaxed">{faq.answer}</p>
            {faq.category && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                カテゴリ：{faq.category}
              </div>
            )}
          </div>
        </details>
      </Card>
    </motion.div>
  );
}

/**
 * FAQセクションコンポーネント
 * 
 * @returns よくある質問を表示するセクション
 * @description
 * - アコーディオン形式でのQ&A表示
 * - 自然な開閉アニメーション
 * - アクセシビリティに配慮した実装
 */
export function FAQSection() {
  // FAQデータ
  const faqs: FAQItem[] = [
    {
      id: "beginners",
      question: "初心者でも参加できますか？",
      answer:
        "はい、多くのサークルでは初心者歓迎としています。検索条件で「初心者歓迎」のサークルを絞り込むことができます。初めての方でも安心して参加できるよう、基本的な指導を行っているサークルも多数掲載しています。",
      category: "参加条件",
    },
    {
      id: "equipment",
      question: "用具を持っていなくても大丈夫ですか？",
      answer:
        "サークルによって異なりますが、多くのサークルではラケットの貸し出しを行っています。各サークルの詳細ページの「設備・用具」セクションでご確認いただけます。初心者向けのサークルほど貸出用具が充実している傾向があります。",
      category: "用具・設備",
    },
    {
      id: "join",
      question: "参加したいサークルが見つかったらどうすればいいですか？",
      answer:
        "サークル詳細ページから「参加申請」ボタンをクリックすると、サークル管理者に問い合わせメッセージを送ることができます。サークルによっては体験参加から始めることもできますので、まずはお気軽にお問い合わせください。",
      category: "利用方法",
    },
    {
      id: "register",
      question: "自分のサークルを登録したいのですが？",
      answer:
        "「サークルを登録する」から必要情報を入力するだけで簡単に登録できます。登録後は活動内容の更新やメンバー管理も行えます。写真や動画を追加して、サークルの魅力をアピールすることもできます。",
      category: "サークル運営",
    },
    {
      id: "fee",
      question: "参加費はかかりますか？",
      answer:
        "サークルごとに会費や参加費は異なります。検索時に予算に合わせた検索も可能です。詳細はサークルのページでご確認ください。一般的には、施設利用料やシャトル代などを会費として徴収しているサークルが多いです。",
      category: "費用",
    }
  ];

  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/20" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-50 dark:bg-indigo-900/20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <IconBadge 
            variant="secondary"
            icon={<Lightbulb className="w-4 h-4" />}
            className="mb-4 mx-auto"
          >
            サポート
          </IconBadge>
          
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            よくある質問
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            バドミントンサークルへの参加に関するよくある質問をまとめました。
            さらに詳しい情報は<span className="text-blue-600 dark:text-blue-400 font-medium">お問い合わせ</span>からご連絡ください。
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQAccordionItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 