"use client";

/**
 * @file PopularCirclesSection - 人気サークル紹介セクション
 * @description 人気のバドミントンサークル情報をカード形式で紹介するセクション
 */

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge"; 
import { IconBadge } from "../ui/icon-badge";
import { Star, ChevronRight, MapPin, Clock, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

/**
 * サークル情報の型定義
 */
interface CircleData {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  level: string;
  frequency: string;
  image: string;
  members?: number; // オプショナル：メンバー数
}

/**
 * サークルカードコンポーネント - 個々のサークル情報を表示
 * 
 * @param props - サークル情報のプロパティ
 * @returns サークルカードコンポーネント
 */
function CircleCard({ circle }: { circle: CircleData }) {
  return (
    <Card className="h-full overflow-hidden group">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={circle.image}
          alt={circle.name}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="font-medium">
            {circle.level}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {circle.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{circle.location}</span>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{circle.frequency}</span>
            </div>
            
            {circle.members && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>{circle.members}名</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-medium">{circle.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            ({circle.reviewCount})
          </span>
        </div>
        
        <Button asChild variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
          <Link
            href={`/circles/${circle.id}`}
            className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center"
          >
            詳細を見る
            <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * 人気サークルセクションコンポーネント
 * 
 * @returns 人気のサークルを紹介するセクション
 * @description
 * - カード形式での視覚的なサークル情報表示
 * - 画像、評価、位置情報などの重要データの表示
 * - レスポンシブデザイン対応
 */
export function PopularCirclesSection() {
  // サークルのモックデータ
  const popularCircles: CircleData[] = [
    {
      id: "1",
      name: "渋谷バドミントンクラブ",
      location: "東京都渋谷区",
      rating: 4.8,
      reviewCount: 42,
      level: "初心者歓迎",
      frequency: "週2回",
      image: "https://placehold.jp/3d4070/ffffff/320x180.png?text=渋谷バドミントンクラブ",
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
      image: "https://placehold.jp/3d4070/ffffff/320x180.png?text=新宿バドミントンサークル",
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
      image: "https://placehold.jp/3d4070/ffffff/320x180.png?text=目黒バドミントン友の会",
      members: 18,
    },
  ];

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <IconBadge
                variant="warning"
                icon={<TrendingUp className="w-4 h-4" />}
                size="default"
              >
                人気急上昇中
              </IconBadge>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold dark:text-white"
            >
              注目のサークル
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="flex items-center gap-1">
              <Link href="/search" className="text-blue-600 dark:text-blue-400">
                すべて見る <ChevronRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCircles.map((circle, index) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/circles/${circle.id}`} className="block h-full">
                <CircleCard circle={circle} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 