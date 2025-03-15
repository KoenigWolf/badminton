"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Clock, Users, Circle, Star } from "lucide-react";

// 仮のデータ
const MOCK_CIRCLES = [
  {
    id: "1",
    name: "渋谷バドミントンクラブ",
    prefecture: "東京都",
    city: "渋谷区",
    rating: 4.8,
    reviewCount: 42,
    skillLevel: ["初心者歓迎", "中級者向け"],
    activityFrequency: "週2回",
    fee: 3000,
    image: "/images/circle1.jpg",
  },
  {
    id: "2",
    name: "新宿バドミントンサークル",
    prefecture: "東京都",
    city: "新宿区",
    rating: 4.5,
    reviewCount: 38,
    skillLevel: ["初心者歓迎", "中級者向け", "上級者向け"],
    activityFrequency: "週1回",
    fee: 2500,
    image: "/images/circle2.jpg",
  },
  {
    id: "3",
    name: "目黒バドミントン友の会",
    prefecture: "東京都",
    city: "目黒区",
    rating: 4.2,
    reviewCount: 27,
    skillLevel: ["中級者向け", "上級者向け"],
    activityFrequency: "月3回",
    fee: 3500,
    image: "/images/circle3.jpg",
  },
  {
    id: "4",
    name: "横浜中央バドミントン",
    prefecture: "神奈川県",
    city: "横浜市",
    rating: 4.6,
    reviewCount: 52,
    skillLevel: ["初心者歓迎", "中級者向け"],
    activityFrequency: "週2回",
    fee: 3200,
    image: "/images/circle4.jpg",
  },
  {
    id: "5",
    name: "川崎バドミントンサークル",
    prefecture: "神奈川県",
    city: "川崎市",
    rating: 4.3,
    reviewCount: 31,
    skillLevel: ["中級者向け"],
    activityFrequency: "週1回",
    fee: 2800,
    image: "/images/circle5.jpg",
  },
  {
    id: "6",
    name: "千葉バドミントンクラブ",
    prefecture: "千葉県",
    city: "千葉市",
    rating: 4.4,
    reviewCount: 36,
    skillLevel: ["初心者歓迎", "中級者向け"],
    activityFrequency: "月4回",
    fee: 3000,
    image: "/images/circle6.jpg",
  },
];

// 都道府県データ
const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

// スキルレベルデータ
const SKILL_LEVELS = [
  { id: "beginner", label: "初心者歓迎" },
  { id: "intermediate", label: "中級者向け" },
  { id: "advanced", label: "上級者向け" }
];

// 活動頻度データ
const FREQUENCIES = [
  { id: "weekly-multiple", label: "週複数回" },
  { id: "weekly", label: "週1回" },
  { id: "biweekly", label: "隔週" },
  { id: "monthly", label: "月1〜2回" }
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<string[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>([]);
  const [maxFee, setMaxFee] = useState<number>(10000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // スキルレベル選択のトグル
  const toggleSkillLevel = (levelId: string) => {
    setSelectedSkillLevels((prev) =>
      prev.includes(levelId)
        ? prev.filter((id) => id !== levelId)
        : [...prev, levelId]
    );
  };

  // 活動頻度選択のトグル
  const toggleFrequency = (frequencyId: string) => {
    setSelectedFrequencies((prev) =>
      prev.includes(frequencyId)
        ? prev.filter((id) => id !== frequencyId)
        : [...prev, frequencyId]
    );
  };

  // 検索結果のフィルタリング (実際のAPIがある場合はサーバーサイドで行う)
  const filteredCircles = MOCK_CIRCLES
    .filter((circle) => 
      (searchTerm === "" || 
       circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       circle.prefecture.includes(searchTerm) ||
       circle.city.includes(searchTerm)) &&
      (selectedPrefecture === "" || circle.prefecture === selectedPrefecture) &&
      (selectedSkillLevels.length === 0 || 
       selectedSkillLevels.some(level => 
          circle.skillLevel.some(s => s.includes(
            level === "beginner" ? "初心者" : 
            level === "intermediate" ? "中級者" : "上級者"
          ))
       )) &&
      (selectedFrequencies.length === 0 || 
       selectedFrequencies.some(freq => {
         if (freq === "weekly-multiple" && circle.activityFrequency.includes("週") && !circle.activityFrequency.includes("週1")) return true;
         if (freq === "weekly" && circle.activityFrequency.includes("週1")) return true;
         if (freq === "biweekly" && circle.activityFrequency.includes("隔週")) return true;
         if (freq === "monthly" && circle.activityFrequency.includes("月")) return true;
         return false;
       })) &&
      circle.fee <= maxFee
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">サークルを探す</h1>

      {/* 検索バー */}
      <div className="flex w-full max-w-2xl mx-auto mb-8">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="サークル名や地域で検索"
            className="w-full pl-10 pr-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg transition-colors flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter size={20} />
          <span className="ml-2 hidden sm:inline">絞り込み</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* フィルターサイドバー (モバイルではモーダル) */}
        <div className={`
          lg:w-64 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4
          ${isFilterOpen ? 'block' : 'hidden'} lg:block
        `}>
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">都道府県</h3>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
              value={selectedPrefecture}
              onChange={(e) => setSelectedPrefecture(e.target.value)}
            >
              <option value="">すべての都道府県</option>
              {PREFECTURES.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">レベル</h3>
            <div className="space-y-2">
              {SKILL_LEVELS.map((level) => (
                <label key={level.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={selectedSkillLevels.includes(level.id)}
                    onChange={() => toggleSkillLevel(level.id)}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">活動頻度</h3>
            <div className="space-y-2">
              {FREQUENCIES.map((frequency) => (
                <label key={frequency.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={selectedFrequencies.includes(frequency.id)}
                    onChange={() => toggleFrequency(frequency.id)}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{frequency.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">月会費（最大）</h3>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {maxFee.toLocaleString()}円
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors"
            onClick={() => {
              setSelectedPrefecture("");
              setSelectedSkillLevels([]);
              setSelectedFrequencies([]);
              setMaxFee(10000);
            }}
          >
            フィルターをリセット
          </button>
        </div>

        {/* 検索結果 */}
        <div className="flex-grow">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">{filteredCircles.length}</span> 件のサークルが見つかりました
            </p>
            <select className="border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white">
              <option>新着順</option>
              <option>評価の高い順</option>
              <option>会費の安い順</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCircles.map((circle) => (
              <div 
                key={circle.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {circle.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(circle.rating) ? 'fill-current' : 'stroke-current opacity-50'} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
                      {circle.rating} ({circle.reviewCount}件)
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {circle.prefecture} {circle.city}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Clock size={14} className="mr-1" />
                      {circle.activityFrequency}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Users size={14} className="mr-1" />
                      {circle.skillLevel.join(', ')}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold dark:text-white">
                      月会費: {circle.fee.toLocaleString()}円
                    </span>
                    <Link
                      href={`/circles/${circle.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCircles.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <Circle size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">見つかりませんでした</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                検索条件に一致するサークルが見つかりませんでした。<br />
                条件を変更してもう一度お試しください。
              </p>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedPrefecture("");
                  setSelectedSkillLevels([]);
                  setSelectedFrequencies([]);
                  setMaxFee(10000);
                }}
              >
                検索条件をリセット
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 