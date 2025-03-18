/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js の画像設定
  // 外部の画像を利用する場合、許可するドメインを指定する必要がある
  // placehold.jp を許可し、next/image で使用可能にする
  images: {
    domains: [
      'placehold.jp', // プレースホルダー画像用
    ],
  },

  // パフォーマンス最適化設定
  // Strict Mode を有効化し、React の開発環境を強化
  reactStrictMode: true, // 開発時にバグを早期検出できるようにする

  // 将来的な拡張を考慮
  // API ルートや環境変数の設定などを追加する場合に備えて柔軟な構造を維持
};

module.exports = nextConfig;
