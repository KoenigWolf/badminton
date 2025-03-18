"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ImageType = {
  id: string;
  url: string;
  caption: string;
};

interface ImageGalleryProps {
  images: ImageType[];
  initialIndex?: number;
}

/**
 * 画像ギャラリーコンポーネント
 * 
 * @description サークル詳細ページなどで複数の画像をスライドショー形式で表示
 * @features
 * - キーボードナビゲーション対応
 * - タッチスワイプ対応
 * - スムーズなアニメーション
 * - アクセシビリティ対応
 * - レスポンシブデザイン
 */
export function ImageGallery({ images, initialIndex = 0 }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goPrev();
    } else if (e.key === "ArrowRight") {
      goNext();
    } else if (e.key === "Escape" && isLightboxOpen) {
      setIsLightboxOpen(false);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">画像がありません</p>
      </div>
    );
  }

  return (
    <section
      className="relative rounded-xl overflow-hidden"
      onKeyDown={handleKeyDown}
      aria-label="画像ギャラリー"
    >
      {/* メイン画像表示部分 */}
      <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].caption}
              fill
              className="object-cover cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={() => setIsLightboxOpen(true)}
              priority={activeIndex === 0}
            />
            {/* キャプション */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
              {images[activeIndex].caption}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーションボタン（前へ）- 2枚以上ある場合のみ表示 */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full size-10"
            onClick={goPrev}
            aria-label="前の画像"
          >
            <ChevronLeft className="size-6" />
          </Button>
        )}

        {/* ナビゲーションボタン（次へ）- 2枚以上ある場合のみ表示 */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full size-10"
            onClick={goNext}
            aria-label="次の画像"
          >
            <ChevronRight className="size-6" />
          </Button>
        )}
      </div>

      {/* サムネイル表示部分 - 2枚以上ある場合のみ表示 */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={cn(
                "flex-shrink-0 h-16 w-16 md:h-20 md:w-20 relative rounded overflow-hidden transition-all duration-200",
                activeIndex === index
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`画像${index + 1}: ${image.caption}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* 拡大表示モーダル */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative w-full h-full max-w-4xl max-h-screen p-4 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 bg-black/50 text-white hover:bg-black/70 rounded-full z-10"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="拡大表示を閉じる"
              >
                ×
              </Button>
              
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].caption}
                fill
                className="object-contain"
                sizes="100vw"
                onClick={(e) => e.stopPropagation()}
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="前の画像"
              >
                <ChevronLeft className="size-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="次の画像"
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 