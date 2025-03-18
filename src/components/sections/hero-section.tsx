"use client"

/**
 * @file HeroSection.tsx
 * @description ウェブサイトのメインヒーローセクションを表示するコンポーネント
 * 主要な価値提案、コールトゥアクション（CTA）ボタン、右側のビジュアル要素を分離して管理する
 */

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { IconBadge } from "../ui/icon-badge"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  BadgeCheck,
  Bookmark,
} from "lucide-react"

// ─────────────────────────────
// アニメーション用ヘルパー設定
// ─────────────────────────────

// 垂直方向のフェードインアニメーション設定を生成する関数
const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

// 左からの水平フェードインアニメーション設定（コンテナ用）
const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

// 右からの水平フェードインアニメーション設定を生成する関数
const fadeInRight = (delay = 0.2, duration = 0.8) => ({
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration, delay },
})

// ─────────────────────────────
// HeroSection コンポーネント
// サービスの魅力を伝えるヒーローセクション全体を表示する
// ─────────────────────────────
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-20 w-full min-h-[90vh] flex items-center justify-center
                 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900"
    >
      {/* 背景装飾要素　※クリックなどのイベントは無効 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* 左側テキストコンテンツ */}
        <HeroTextContent />
        {/* 右側ビジュアルイラスト */}
        <HeroIllustration />
      </div>
    </section>
  )
}

// ─────────────────────────────
// HeroTextContent コンポーネント
// タイトル、説明文、特徴バッジ、CTAボタン群を表示する
// ─────────────────────────────
function HeroTextContent() {
  return (
    <motion.div
      // 左側からのフェードインアニメーションを適用
      {...fadeInLeft}
      className="flex-1 max-w-xl"
    >
      {/* サービス説明バッジ　※アイコン付き */}
      <motion.div {...fadeInUp(0.05)}>
        <IconBadge
          variant="primary"
          size="lg"
          icon={<BadgeCheck className="w-4 h-4" />}
          className="mb-6"
        >
          バドミントンサークル検索サービス
        </IconBadge>
      </motion.div>

      {/* サービスタイトル　※装飾的下線付き */}
      <motion.h1
        {...fadeInUp(0.1)}
        className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
      >
        理想の
        <span className="relative text-blue-600 dark:text-blue-400">
          バドミントン
          <svg
            className="absolute left-0 -bottom-1 w-full h-3"
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <title>装飾的下線</title>
            <path
              d="M0,5 Q40,0 80,5 T160,5 T200,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
        <br />
        仲間に出会おう
      </motion.h1>

      {/* サービス説明文　※詳細な利用メリットを記述 */}
      <motion.p
        {...fadeInUp(0.2)}
        className="mb-8 text-lg text-gray-700 dark:text-gray-300"
      >
        スキルレベル、活動エリア、活動頻度から、あなたにぴったりのバドミントンサークルを
        簡単に検索。新しい仲間と一緒に楽しくバドミントンを始めましょう！
      </motion.p>

      {/* 特徴バッジ群　※各機能の魅力をアイコンと共に表示 */}
      <motion.div
        {...fadeInUp(0.25)}
        className="mb-8 flex flex-wrap gap-3"
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

      {/* CTA ボタン群　※サークル検索と会員登録への誘導 */}
      <motion.div
        {...fadeInUp(0.3)}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <Link href="/search">
          <Button
            size="lg"
            className="group w-full sm:w-auto text-base font-semibold"
          >
            サークルを探す
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-base font-semibold"
          >
            会員登録する
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────
// HeroIllustration コンポーネント
// 右側に配置されるイラストと、浮遊する補助カード（クイック検索や仲間づくりの案内）を表示する
// ─────────────────────────────
function HeroIllustration() {
  // イラスト画像読み込み失敗時のフォールバック処理
  function handleImageError(
    e: React.SyntheticEvent<HTMLImageElement>
  ) {
    const target = e.currentTarget
    // 画像表示を無効化
    target.style.display = "none"
    const parent = target.parentElement
    if (parent) {
      // 背景グラデーションと丸み付けを適用してフォールバック表示
      parent.classList.add(
        "bg-gradient-to-br",
        "from-blue-400",
        "to-blue-600",
        "dark:from-blue-600",
        "dark:to-blue-800",
        "rounded-full",
        "opacity-80"
      )
      // フォールバック用テキスト要素を作成
      const fallbackText = document.createElement("div")
      fallbackText.className = "p-8 text-center text-white"
      fallbackText.innerHTML =
        '<h3 class="mb-2 text-2xl font-bold">新しい出会い</h3><p class="text-lg">バドミントンを通じて</p>'
      parent.appendChild(fallbackText)
    }
  }

  return (
    <motion.div
      {...fadeInRight(0.2, 0.8)}
      className="relative flex-1 flex items-center justify-center"
    >
      {/* イラスト表示用コンテナ　※アスペクト比を保持 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md aspect-square"
      >
        {/* 背景パルスアニメーション */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/10" />
        {/* イラスト画像　※読み込み失敗時にフォールバック処理を実施 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/badminton-illustration.png"
            alt="バドミントンイラスト"
            width={400}
            height={400}
            className="object-contain"
            onError={handleImageError}
          />
        </div>
      </motion.div>

      {/* 浮遊するカード　※かんたん検索案内 */}
      <Card
        variant="default"
        padding="sm"
        className="absolute -left-16 top-1/4 shadow-lg animate-float"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">かんたん検索</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              条件指定でぴったりのサークルを
            </p>
          </div>
        </div>
      </Card>

      {/* 浮遊するカード　※仲間づくり案内 */}
      <Card
        variant="default"
        padding="sm"
        className="absolute -right-8 bottom-1/4 shadow-lg animate-float-delayed"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">仲間づくり</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              一緒に上達できる環境
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
