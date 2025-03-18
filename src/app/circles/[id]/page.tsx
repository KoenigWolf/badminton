"use client";

// ─────────────────────────────
// 外部ライブラリおよびアイコンのインポート
// ─────────────────────────────
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  ChevronRight,
  MessageSquare,
  ExternalLink,
  Globe,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

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
            <Sidebar circle={circle} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────
// ImageGalleryコンポーネント
// ・画像の切り替え、ナビゲーションボタン、サムネイル表示を実装
// ─────────────────────────────
type ImageGalleryProps = {
  images: { id: string; url: string; caption: string }[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
};

function ImageGallery({
  images,
  activeIndex,
  onNext,
  onPrev,
  onSelect,
}: ImageGalleryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm mb-8">
      <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
        {/* 背景グラデーションのプレースホルダー */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400" />
        {/* 前へ戻るボタン */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="前の画像"
        >
          <ChevronRight className="transform rotate-180" size={20} />
        </button>
        {/* 次へ進むボタン */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="次の画像"
        >
          <ChevronRight size={20} />
        </button>
        {/* サムネイルナビゲーション */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={`thumb-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`画像 ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────
// CircleDescriptionコンポーネント
// ・サークルの基本情報、活動情報、対象レベル・年齢層、参加費・設備、公式サイト・SNS情報を表示
// ─────────────────────────────
type CircleDescriptionProps = {
  circle: typeof MOCK_CIRCLE;
};

function CircleDescription({ circle }: CircleDescriptionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      {/* サークル紹介 */}
      <h2 className="text-xl font-bold mb-4 dark:text-white">サークル紹介</h2>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
        {circle.description}
      </p>

      {/* 活動情報 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">活動情報</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoItem
          Icon={Calendar}
          title="活動日"
          content={circle.activityDays.join("・")}
        />
        <InfoItem
          Icon={Clock}
          title="活動時間"
          content={circle.activityTimes.join("、")}
        />
        <InfoItem
          Icon={MapPin}
          title="活動場所"
          content={circle.facilities.join("、")}
        />
        <InfoItem
          Icon={Users}
          title="メンバー"
          content={`現在${circle.memberCount}名（${circle.genderRatio}）`}
        />
      </div>

      {/* 対象レベル・年齢層 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">対象レベル・年齢層</h3>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {circle.skillLevel.map((level) => (
            <span
              key={level}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {level}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          主な年齢層： {circle.ageGroups.join("、")}
        </p>
      </div>

      {/* 参加費・設備 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">参加費・設備</h3>
      <div className="mb-6">
        <p className="font-medium text-gray-900 dark:text-white mb-2">
          月会費: {circle.fee.toLocaleString()}円
        </p>
        <div className="flex flex-wrap gap-2">
          {circle.equipments.map((equipment) => (
            <span
              key={equipment}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >
              {equipment}
            </span>
          ))}
        </div>
      </div>

      {/* 公式サイト・SNS */}
      {(circle.website || circle.socialLinks) && (
        <div>
          <h3 className="text-lg font-bold mb-3 dark:text-white">
            公式サイト・SNS
          </h3>
          <div className="flex flex-wrap gap-3">
            {circle.website && (
              <ExternalLinkItem
                href={circle.website}
                Icon={Globe}
                label="公式サイト"
              />
            )}
            {circle.socialLinks.twitter && (
              <ExternalLinkItem
                href={circle.socialLinks.twitter}
                Icon={Twitter}
                label="Twitter"
              />
            )}
            {circle.socialLinks.instagram && (
              <ExternalLinkItem
                href={circle.socialLinks.instagram}
                Icon={Instagram}
                label="Instagram"
              />
            )}
            {circle.socialLinks.facebook && (
              <ExternalLinkItem
                href={circle.socialLinks.facebook}
                Icon={Facebook}
                label="Facebook"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────
// ExternalLinkItemコンポーネント
// ・公式サイトやSNSのリンクを統一的に表示するためのコンポーネント
// ─────────────────────────────
type ExternalLinkItemProps = {
  href: string;
  Icon: React.FC<{ size: number }>;
  label: string;
};

function ExternalLinkItem({ href, Icon, label }: ExternalLinkItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      <Icon size={16} />
      <span>{label}</span>
      <ExternalLink size={12} />
    </a>
  );
}

// ─────────────────────────────
// InfoItemコンポーネント
// ・活動情報などのアイコン付きテキスト情報を表示するための汎用コンポーネント
// ─────────────────────────────
type InfoItemProps = {
  Icon: React.FC<{ size: number; className?: string }>;
  title: string;
  content: string;
};

function InfoItem({ Icon, title, content }: InfoItemProps) {
  return (
    <div className="flex items-start">
      <Icon className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2" size={18} />
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-gray-600 dark:text-gray-400">{content}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────
// ReviewSectionコンポーネント
// ・サークルのレビュー一覧と「すべて見る」ボタン、レビュー投稿ボタンを表示
// ─────────────────────────────
type ReviewSectionProps = {
  reviews: {
    id: string;
    userName: string;
    userImage: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  reviewCount: number;
};

function ReviewSection({ reviews, reviewCount }: ReviewSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">
          レビュー ({reviewCount})
        </h2>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          すべて見る
        </button>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              {/* ユーザー画像のプレースホルダー */}
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium dark:text-white">
                    {review.userName}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.createdAt}
                  </span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`review-star-${review.id}-${i}`}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-current"
                          : "stroke-current opacity-50"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white w-full py-3 rounded-lg text-center font-medium transition-colors"
        >
          レビューを書く
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// Sidebarコンポーネント
// ・サークル参加申請カードを表示（料金、活動頻度、申請ボタン、質問ボタン）
// ─────────────────────────────
type SidebarProps = {
  circle: typeof MOCK_CIRCLE;
};

function Sidebar({ circle }: SidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 sticky top-20">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        このサークルに参加する
      </h2>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 dark:text-gray-300">月会費</span>
          <span className="font-bold text-lg dark:text-white">
            {circle.fee.toLocaleString()}円
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">活動頻度</span>
          <span className="font-medium dark:text-white">
            {circle.activityFrequency}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            ※参加申請後、サークル管理者による承認が必要です
          </p>
          {circle.isRecruiting ? (
            <Link
              href={`/circles/${circle.id}/apply`}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-center font-medium block transition-colors"
            >
              参加を申請する
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white w-full py-3 rounded-lg text-center font-medium cursor-not-allowed"
            >
              現在募集停止中
            </button>
          )}
        </div>
        <button
          type="button"
          className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 w-full py-2 rounded-lg text-center font-medium border border-current transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <MessageSquare size={18} />
            <span>質問する</span>
          </div>
        </button>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        最終更新: {circle.updatedAt}
      </div>
    </div>
  );
}
