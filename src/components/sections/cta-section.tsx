"use client";

/**
 * @file CTASection - コールトゥアクションセクション
 * @description ユーザーにサービス登録または利用を促すセクション
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Bookmark, ArrowRight, MapPin, Users, Calendar, CheckCircle } from "lucide-react";
import { IconBadge } from "../ui/icon-badge";

/**
 * CTAセクションコンポーネント
 * 
 * @returns CTAセクションコンポーネント
 * @description
 * - サービス利用の最終的な呼びかけ
 * - 魅力的な背景とアニメーション
 * - 直感的なCTAボタン
 */
export function CTASection() {
  // アクションアイテムのリスト
  const actionItems = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "あなたの近くのサークルを検索"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "新しい仲間との出会い"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      text: "定期的な活動で上達"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "レベルに合ったサークル選び"
    }
  ];

  return (
    <section className="w-full py-32 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat opacity-30" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-30" />
      </div>
      
      {/* 浮遊するシャトル装飾 */}
      <motion.div 
        className="absolute top-40 left-10 w-16 h-16 text-white/30 transform rotate-45"
        animate={{ y: [0, -30, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,22c5.52285,0,10-4.47715,10-10S17.52285,2,12,2S2,6.47715,2,12S6.47715,22,12,22z M12,18c-3.31371,0-6-2.68629-6-6 s2.68629-6,6-6s6,2.68629,6,6S15.31371,18,12,18z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 right-10 w-12 h-12 text-white/20 transform -rotate-12"
        animate={{ y: [0, 40, 0], rotate: [-12, 45, -12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,22c5.52285,0,10-4.47715,10-10S17.52285,2,12,2S2,6.47715,2,12S6.47715,22,12,22z M12,18c-3.31371,0-6-2.68629-6-6 s2.68629-6,6-6s6,2.68629,6,6S15.31371,18,12,18z" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <IconBadge 
              variant="default" 
              className="bg-white/10 text-white border-0 mb-6 mx-auto"
              icon={<Bookmark className="w-4 h-4" />}
            >
              始めましょう
            </IconBadge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"
          >
            理想のバドミントンサークルを
            <br className="hidden md:inline" />
            今すぐ見つけましょう
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
          >
            {actionItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 text-white/90 bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="bg-white/20 rounded-full p-2">
                  {item.icon}
                </div>
                <p className="font-medium">{item.text}</p>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
          >
            <Link href="/search">
              <Button 
                size="lg" 
                variant="default"
                className="w-full sm:w-auto text-base font-medium px-8 py-6 h-auto bg-white text-blue-700 hover:bg-white/90 shadow-lg group"
              >
                サークルを探す <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-base font-medium px-8 py-6 h-auto bg-transparent text-white border-white hover:bg-white/10 shadow-lg"
              >
                会員登録する
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 