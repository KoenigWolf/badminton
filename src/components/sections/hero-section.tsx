"use client";

/**
 * @file HeroSection.tsx
 * @description ウェブサイトのメインヒーローセクション。主要な価値提案、CTAボタン、そして右側のデザイン要素を表示します。
 * このコンポーネントは、テキストコンテンツとイラストレーション部分に分割しており、可読性と拡張性を向上させています。
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { IconBadge } from "../ui/icon-badge";
import { Search, MapPin, Calendar, Users, ChevronRight, BadgeCheck, Bookmark } from "lucide-react";

// ─────────────────────────────
// HeroSectionコンポーネント
// ─────────────────────────────
export function HeroSection() {
  return (
    <section
      className="w-full min-h-[90vh] flex items-center justify-center 
                 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 py-20 overflow-hidden relative"
    >
      {/* 背景の装飾要素 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* 左側のテキストコンテンツ */}
        <HeroTextContent />

        {/* 右側のイラストレーション部分 */}
        <HeroIllustration />
      </div>
    </section>
  );
}

// ─────────────────────────────
// HeroTextContentコンポーネント
// ─────────────────────────────
// このコンポーネントは、タイトル、説明文、CTAボタン群を表示します。
// Framer Motionを用いたアニメーションが適用され、ユーザーに視覚的なインパクトを与えます。
function HeroTextContent() {
  return (
    <motion.div
      // 初期状態はやや左にオフセットし、フェードインしながら表示
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 max-w-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <IconBadge 
          variant="primary" 
          size="lg"
          icon={<BadgeCheck className="w-4 h-4" />}
          className="mb-6"
        >
          バドミントンサークル検索サービス
        </IconBadge>
      </motion.div>

      <motion.h1
        // タイトルのフェードインと上方向からのアニメーション
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold 
                   text-gray-900 dark:text-white mb-6 leading-tight"
      >
        理想の
        <span className="text-blue-600 dark:text-blue-400 relative">
          バドミントン
          <svg className="absolute w-full h-3 left-0 -bottom-1" viewBox="0 0 200 8" preserveAspectRatio="none">
            <path d="M0,5 Q40,0 80,5 T160,5 T200,5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <br />仲間に出会おう
      </motion.h1>

      <motion.p
        // 説明文も同様にアニメーションを適用
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-700 dark:text-gray-300 mb-8"
      >
        スキルレベル、活動エリア、活動頻度から、あなたにぴったりのバドミントンサークルを
        簡単に検索。新しい仲間と一緒に楽しくバドミントンを始めましょう！
      </motion.p>

      <motion.div
        // 特徴バッジ
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> 全国対応
        </Badge>
        <Badge variant="success" className="flex items-center gap-1">
          <Users className="w-3 h-3" /> 初心者歓迎
        </Badge>
        <Badge variant="warning" className="flex items-center gap-1">
          <Calendar className="w-3 h-3" /> 活動日検索
        </Badge>
        <Badge variant="info" className="flex items-center gap-1">
          <Bookmark className="w-3 h-3" /> お気に入り登録
        </Badge>
      </motion.div>

      <motion.div
        // CTAボタン群もアニメーション付きで表示
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href="/search">
          <Button size="lg" className="text-base font-semibold w-full sm:w-auto group">
            サークルを探す{" "}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button
            size="lg"
            variant="outline"
            className="text-base font-semibold w-full sm:w-auto"
          >
            会員登録する
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────
// HeroIllustrationコンポーネント
// ─────────────────────────────
// このコンポーネントは、右側に配置されるビジュアル要素です。
// シンプルなデザイン要素とアニメーションを組み合わせ、印象的な見た目を実現しています。
function HeroIllustration() {
  return (
    <motion.div
      // 初期状態は右にオフセットし、フェードインしながら表示
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex-1 flex justify-center items-center relative"
    >
      {/* メインのビジュアル要素 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md aspect-square relative"
      >
        <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/badminton-illustration.png"
            alt="バドミントンイラスト"
            width={400}
            height={400}
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // フォールバックとして円形の背景を表示
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-blue-600', 'dark:from-blue-600', 'dark:to-blue-800', 'rounded-full', 'opacity-80');
                
                // テキストコンテンツを追加
                const textDiv = document.createElement('div');
                textDiv.className = 'text-white text-center p-8';
                textDiv.innerHTML = '<h3 class="text-2xl font-bold mb-2">新しい出会い</h3><p class="text-lg">バドミントンを通じて</p>';
                parent.appendChild(textDiv);
              }
            }}
          />
        </div>
      </motion.div>

      {/* 浮遊する要素 */}
      <Card
        variant="default"
        padding="sm"
        className="absolute top-1/4 -left-16 shadow-lg animate-float"
      >
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
            <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">かんたん検索</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">条件指定でぴったりのサークルを</p>
          </div>
        </div>
      </Card>

      <Card
        variant="default"
        padding="sm"
        className="absolute bottom-1/4 -right-8 shadow-lg animate-float-delayed"
      >
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full dark:bg-green-900">
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">仲間づくり</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">一緒に上達できる環境</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
