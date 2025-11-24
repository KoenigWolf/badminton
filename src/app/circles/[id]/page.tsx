"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Star, Heart, Share2, ChevronRight } from "lucide-react";
import { ImageGallery } from "@/components/circles/image-gallery";
import { CircleDescription } from "@/components/circles/circle-description";
import { ReviewSection } from "@/components/circles/review-section";
import { CircleSidebar } from "@/components/circles/circle-sidebar";

// ─────────────────────────────
// 仮のサークルデータ（実際はAPIからフェッチ）
// ─────────────────────────────
const MOCK_CIRCLE = {
  id: "1",
  name: "渋谷バドミントンクラブ",
  description:
    "渋谷区を拠点に活動する、初心者から経験者まで幅広く受け入れているバドミントンサークルです。和気あいあいとした雰囲気で、技術向上と交流を楽しむことを目的としています。定期的な練習会に加え、年に数回の大会参加や合宿なども行っています。",
  prefecture: "東京都",
  city: "渋谷区",
  address: "渋谷区神南1-1-1",
  rating: 4.8,
  reviewCount: 42,
  skillLevel: ["初心者歓迎", "中級者向け"],
  activityFrequency: "週2回（水曜日・土曜日）",
  activityDays: ["水曜日", "土曜日"],
  activityTimes: ["19:00-21:00", "13:00-17:00"],
  fee: 3000,
  memberCount: 35,
  ageGroups: ["20代", "30代", "40代"],
  genderRatio: "男性:女性 = 6:4",
  facilities: ["渋谷区スポーツセンター", "代々木第一体育館"],
  equipments: ["シャトル代込み", "ラケットレンタルあり"],
  website: "https://example.com/shibuya-badminton",
  socialLinks: {
    twitter: "https://twitter.com/example",
    instagram: "https://instagram.com/example",
    facebook: "https://facebook.com/example",
  },
  isRecruiting: true,
  createdAt: "2023-01-15",
  updatedAt: "2023-05-20",
  images: [
    { id: "1", url: "/images/circle1.jpg", caption: "活動風景1" },
    { id: "2", url: "/images/circle2.jpg", caption: "活動風景2" },
    { id: "3", url: "/images/circle3.jpg", caption: "合宿の様子" },
  ],
  reviews: [
    {
      id: "1",
      userName: "田中太郎",
      userImage: "/images/user1.jpg",
      rating: 5,
      comment:
        "初心者でも親切に教えてもらえて、すぐに馴染むことができました。道具の貸し出しもあるので、気軽に始められます！",
      createdAt: "2023-04-15",
    },
    {
      id: "2",
      userName: "鈴木花子",
      userImage: "/images/user2.jpg",
      rating: 4,
      comment:
        "アットホームな雰囲気で楽しく活動できています。たまに会場が変更になることがありますが、事前連絡はきちんとしてもらえるので安心です。",
      createdAt: "2023-03-10",
    },
    {
      id: "3",
      userName: "佐藤健",
      userImage: "/images/user3.jpg",
      rating: 5,
      comment:
        "久しぶりにバドミントンを再開しましたが、とても充実した活動内容で満足しています。メンバーも親切で、すぐに溶け込めました。",
      createdAt: "2023-02-22",
    },
  ],
};

// ─────────────────────────────
// CircleDetailPageコンポーネント：サークル詳細ページ全体のレイアウトを管理
// ─────────────────────────────
export default function CircleDetailPage() {
  // URLパラメータを取得（実際のアプリではデータフェッチに利用）
  const params = useParams();
  // 仮のデータとしてMOCK_CIRCLEを使用
  const circle = MOCK_CIRCLE;

  // 画像ギャラリーの現在の表示インデックスを管理
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // お気に入り登録状態の管理
  const [isFavorite, setIsFavorite] = useState(false);

  // ─────────────────────────────
  // 画像ギャラリーの操作：次の画像に進む
  // ─────────────────────────────
  const nextImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === circle.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // ─────────────────────────────
  // 画像ギャラリーの操作：前の画像に戻る
  // ─────────────────────────────
  const prevImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? circle.images.length - 1 : prevIndex - 1
    );
  };

  // ─────────────────────────────
  // お気に入り登録のトグル処理
  // ・お気に入り状態を切り替え、API連携があればそこで登録/解除処理を実行
  // ─────────────────────────────
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // API呼び出しなどの処理をここに追加可能
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 pb-16">
      {/* ─────────────────────────────
          ヒーローセクション：サークル検索リンクとサークル名、評価・住所情報を表示
          ───────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              {/* パンくずリスト */}
              <div className="flex items-center mb-2">
                <Link
                  href="/search"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  サークル検索
                </Link>
                <ChevronRight className="mx-1" size={16} />
                <span>サークル詳細</span>
              </div>
              {/* サークル名称 */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {circle.name}
              </h1>
              {/* 評価表示 */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-300 mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      size={18}
                      className={
                        i < Math.floor(circle.rating)
                          ? "fill-current"
                          : "stroke-current opacity-75"
                      }
                    />
                  ))}
                </div>
                <span>
                  {circle.rating} ({circle.reviewCount}件のレビュー)
                </span>
              </div>
              {/* 住所情報 */}
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-1" />
                <span>
                  {circle.prefecture} {circle.city} {circle.address}
                </span>
              </div>
            </div>
            {/* ─────────────────────────────
                アクションボタン群：お気に入り登録とシェア
                ───────────────────────────── */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isFavorite
                    ? "bg-pink-500 text-white"
                    : "bg-white/20 hover:bg-white/30"
                }`}
                aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
              >
                <Heart
                  size={18}
                  className={isFavorite ? "fill-current" : ""}
                />
                <span className="hidden sm:inline">
                  {isFavorite ? "お気に入り登録済み" : "お気に入り"}
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="シェア"
              >
                <Share2 size={18} />
                <span className="hidden sm:inline">シェア</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────
          メインコンテンツエリア：画像ギャラリー、サークル詳細情報、レビューセクション、サイドバー
          ───────────────────────────── */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側のメインコンテンツ */}
          <div className="lg:col-span-2">
            <ImageGallery
              images={circle.images}
              activeIndex={activeImageIndex}
              onNext={nextImage}
              onPrev={prevImage}
              onSelect={(index) => setActiveImageIndex(index)}
            />
            <CircleDescription circle={circle} />
            <ReviewSection reviews={circle.reviews} reviewCount={circle.reviewCount} />
          </div>

          {/* 右側のサイドバー */}
          <div className="lg:col-span-1">
            <CircleSidebar circle={circle} />
          </div>
        </div>
      </div>
    </main>
  );
}

