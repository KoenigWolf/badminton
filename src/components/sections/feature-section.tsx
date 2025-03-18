"use client";

/**
 * @file FeatureSection - 機能紹介セクション
 * @description サービスの主要機能を紹介するセクション
 */

import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Search, Shield, Zap } from "lucide-react";
import { Card } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";

/**
 * 機能項目の型定義
 */
interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

/**
 * 機能セクションコンポーネント
 * 
 * @returns 機能セクションコンポーネント
 * @description
 * - サービスの特徴を分かりやすく表示
 * - アイコンと簡潔な説明文でユーザビリティを向上
 * - アニメーションでユーザー体験を向上
 */
export function FeatureSection() {
  // 機能リスト
  const features: Feature[] = [
    {
      id: "search",
      icon: <Search className="w-12 h-12" />,
      title: "スマート検索",
      description: "エリア、スキルレベル、活動頻度など、あなたの希望に合ったサークルを簡単に検索できます。",
      color: "bg-blue-500 text-white"
    },
    {
      id: "community",
      icon: <Users className="w-12 h-12" />,
      title: "コミュニティ形成",
      description: "実際のメンバーのレビューや評価を参考に、自分に合ったサークルを見つけることができます。",
      color: "bg-purple-500 text-white"
    },
    {
      id: "locations",
      icon: <MapPin className="w-12 h-12" />,
      title: "地域密着",
      description: "全国各地のサークル情報を網羅。あなたの近くのバドミントンサークルがすぐに見つかります。",
      color: "bg-green-500 text-white"
    },
    {
      id: "schedule",
      icon: <Calendar className="w-12 h-12" />,
      title: "スケジュール管理",
      description: "サークルの活動予定を簡単に確認でき、参加・不参加の意思表示もワンタップで行えます。",
      color: "bg-orange-500 text-white"
    },
    {
      id: "secure",
      icon: <Shield className="w-12 h-12" />,
      title: "安心設計",
      description: "信頼できる情報と安全な環境で、安心してサークル探しや交流を楽しめます。",
      color: "bg-red-500 text-white"
    },
    {
      id: "quick",
      icon: <Zap className="w-12 h-12" />,
      title: "クイック参加",
      description: "面倒な手続きなし。気になるサークルにすぐにコンタクトを取れるシンプル設計です。",
      color: "bg-yellow-500 text-white"
    }
  ];

  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* 背景装飾 */}
      <motion.div
        // 装飾的な背景要素
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg className="absolute top-0 right-0 w-64 h-64 text-blue-100 dark:text-blue-900/20" viewBox="0 0 100 100" aria-hidden="true">
          <title>装飾的な背景要素</title>
          <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-64 h-64 text-indigo-100 dark:text-indigo-900/20" viewBox="0 0 100 100" aria-hidden="true">
          <title>装飾的な背景要素</title>
          <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <IconBadge 
            variant="primary" 
            className="mb-4 mx-auto"
            icon={<Zap className="w-4 h-4" />}
          >
            主な機能
          </IconBadge>
          
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            サービスの特徴
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            バドミントンサークルを探す際のストレスをなくし、あなたに最適なコミュニティと出会えるよう設計されています
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                variant="ghost"
                className="h-full group hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className={`rounded-lg w-16 h-16 flex items-center justify-center mb-5 ${feature.color} transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-auto">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 