import { ChevronRight } from "lucide-react";

/**
 * 画像ギャラリーのプロパティ
 */
interface ImageGalleryProps {
  images: { id: string; url: string; caption: string }[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}

/**
 * 画像ギャラリーコンポーネント
 * 画像の切り替え、ナビゲーションボタン、サムネイル表示を実装
 */
export function ImageGallery({
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

