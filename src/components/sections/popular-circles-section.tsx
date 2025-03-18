"use client"

// @file PopularCirclesSection.tsx
// @description 人気のバドミントンサークル情報をカード形式で紹介するセクション
// このコンポーネントはサークル情報をカードにまとめ、視覚的な魅力とアニメーション効果で注目のサークルを紹介する

import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { IconBadge } from "../ui/icon-badge"
import { Star, ChevronRight, MapPin, Clock, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

// アニメーションバリアント生成ヘルパー関数
// 上方向にフェードインするアニメーションのバリアントを生成する関数
const fadeUpVariant = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration, delay },
  viewport: { once: true },
})

// 右方向にフェードインするアニメーションのバリアントを生成する関数
const fadeRightVariant = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration, delay },
  viewport: { once: true },
})

// サークル情報の型定義
interface CircleData {
  id: string
  name: string
  location: string
  rating: number
  reviewCount: number
  level: string
  frequency: string
  image: string
  members?: number // オプショナル：サークルのメンバー数
}

// CircleCard コンポーネント
// 個々のサークル情報をカード形式で表示する
function CircleCard({ circle }: { circle: CircleData }) {
  return (
    <Card className="h-full overflow-hidden group">
      {/* カード上部の画像コンテナ */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={circle.image}
          alt={circle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* ホバー時に現れるグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* カード上部左側に表示されるレベルバッジ */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="font-medium">
            {circle.level}
          </Badge>
        </div>
      </div>

      {/* カードの本文部分 */}
      <CardContent className="p-5">
        {/* サークル名：ホバー時にテキストカラーが変化 */}
        <h3 className="mb-2 text-xl font-semibold line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {circle.name}
        </h3>

        {/* サークルの位置情報 */}
        <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{circle.location}</span>
        </div>

        {/* サークルの活動情報：開催頻度とメンバー数（任意） */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{circle.frequency}</span>
            </div>
            {/* メンバー数が提供されている場合のみ表示 */}
            {circle.members && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>{circle.members}名</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* カードのフッター部分：評価情報と詳細リンク */}
      <CardFooter className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800">
        {/* 評価表示エリア */}
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-medium">{circle.rating}</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">
            ({circle.reviewCount})
          </span>
        </div>
        {/* 詳細ページへのリンクボタン */}
        <Button asChild variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
          <Link
            href={`/circles/${circle.id}`}
            className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400"
          >
            詳細を見る
            <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// PopularCirclesSection コンポーネント
// 人気サークル情報をセクション形式で表示する
export function PopularCirclesSection() {
  // モックデータ：サークル情報のサンプル
  const popularCircles: CircleData[] = [
    {
      id: "1",
      name: "渋谷バドミントンクラブ",
      location: "東京都渋谷区",
      rating: 4.8,
      reviewCount: 42,
      level: "初心者歓迎",
      frequency: "週2回",
      image:
        "https://placehold.jp/3d4070/ffffff/320x180.png?text=渋谷バドミントンクラブ",
      members: 30,
    },
    {
      id: "2",
      name: "新宿バドミントンサークル",
      location: "東京都新宿区",
      rating: 4.5,
      reviewCount: 38,
      level: "初〜中級者",
      frequency: "週1回",
      image:
        "https://placehold.jp/3d4070/ffffff/320x180.png?text=新宿バドミントンサークル",
      members: 25,
    },
    {
      id: "3",
      name: "目黒バドミントン友の会",
      location: "東京都目黒区",
      rating: 4.2,
      reviewCount: 27,
      level: "中級〜上級者",
      frequency: "月3回",
      image:
        "https://placehold.jp/3d4070/ffffff/320x180.png?text=目黒バドミントン友の会",
      members: 18,
    },
  ]

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー：タイトルとサブタイトル、及び全体リンク */}
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            {/* 人気急上昇中のバッジ表示 */}
            <motion.div {...fadeUpVariant(0, 0.5)} className="mb-4">
              <IconBadge
                variant="warning"
                size="default"
                icon={<TrendingUp className="w-4 h-4" />}
              >
                人気急上昇中
              </IconBadge>
            </motion.div>
            {/* セクションタイトル */}
            <motion.h2 {...fadeUpVariant(0.1, 0.5)} className="text-3xl font-bold dark:text-white">
              注目のサークル
            </motion.h2>
          </div>
          {/* すべてのサークルを表示するためのリンクボタン */}
          <motion.div {...fadeRightVariant(0, 0.5)}>
            <Button asChild variant="outline" className="flex items-center gap-1">
              <Link href="/search" className="text-blue-600 dark:text-blue-400">
                すべて見る <ChevronRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* サークルカードのグリッド表示 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularCircles.map((circle, index) => (
            <motion.div
              key={circle.id}
              {...fadeUpVariant(index * 0.1, 0.5)}
              className="block h-full"
            >
              <Link href={`/circles/${circle.id}`} className="block h-full">
                <CircleCard circle={circle} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
