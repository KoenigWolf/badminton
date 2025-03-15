# BadFinder - バドミントンサークル検索サイト

![BadFinder](https://placehold.jp/30/3d4070/ffffff/1200x630.png?text=BadFinder)

バドミントンサークルを探したい人と、メンバーを募集しているサークルをつなぐマッチングプラットフォームです。地域、活動頻度、レベル、会費などの条件から最適なサークルを見つけることができます。

## 🎯 主な機能

- **サークル検索**: 地域、活動頻度、スキルレベル、会費などの条件で絞り込み検索
- **サークル詳細**: 各サークルの詳細情報、写真、レビュー、アクセス情報を確認
- **ユーザー認証**: メール/パスワード、Google、Facebook、Twitter、GitHub でのログイン
- **マイページ**: お気に入り登録、参加申請状況の管理
- **サークル登録**: 新しいサークル情報の登録・管理機能
- **レビュー機能**: サークルの評価・口コミ投稿

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 14**: App Router を使用したページ・ルーティング
- **React 19**: UI コンポーネント構築
- **TypeScript**: 型安全なコード開発
- **Tailwind CSS**: ユーティリティファーストのスタイリング
- **shadcn/ui**: 再利用可能な UI コンポーネント
- **Framer Motion**: アニメーション効果
- **react-icons**: アイコンライブラリ
- **Zod**: フォームバリデーション

### バックエンド

- **Next.js API Routes**: RESTful API エンドポイント
- **NextAuth.js**: 認証システム
- **Prisma ORM**: データベースの操作
- **Supabase/PlanetScale**: データベース（PostgreSQL/MySQL）
- **bcrypt**: パスワードハッシュ化

### その他ツール

- **ESLint/Prettier**: コードフォーマット・品質管理
- **Vercel**: デプロイ・ホスティング

## 🚀 インストール方法

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/badminton.git
cd badminton

# 依存パッケージをインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.local を編集して必要な環境変数を設定

# Prismaクライアントの生成
npx prisma generate

# 開発サーバーを起動
npm run dev
```

## 🔧 環境変数の設定

`.env.local` ファイルに以下の環境変数を設定してください：

```
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth Providers (必要に応じて)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## 📋 使用方法

1. 開発サーバーを起動: `npm run dev`
2. ブラウザで http://localhost:3000 にアクセス
3. バドミントンサークルの検索や登録が可能

## 🧪 テスト

```bash
# テスト実行
npm test

# カバレッジレポート付きでテスト実行
npm test -- --coverage
```

## 📦 ビルド & デプロイ

```bash
# 本番用ビルド
npm run build

# 本番モードで起動
npm start
```

Vercel へのデプロイ：

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

## 🌱 今後の開発予定

- モバイルアプリ対応（React Native）
- リアルタイムチャット機能
- イベント管理機能の強化
- レコメンデーションアルゴリズムの改善

## 👥 貢献方法

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

[MIT License](LICENSE)

## 📞 お問い合わせ

質問や提案がある場合は、Issues を通じてお知らせください。
