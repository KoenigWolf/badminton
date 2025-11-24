# BadFinder - バドミントンサークル検索サイト

BadFinder は、地域やスキルレベルなどの条件からバドミントンサークルを簡単に検索・発見できるサービスです。サークル運営者はサークル情報を登録でき、バドミントン愛好家は自分に合ったサークルを見つけることができます。

## 特徴・機能

### ユーザー向け機能

- **高度な検索機能**: 地域、スキルレベル、活動頻度、会費などの条件でサークルを検索
- **全文検索**: サークル名や説明文からキーワード検索が可能
- **詳細なサークル情報**: 活動内容、場所、頻度、写真、レビューなどを確認
- **お気に入り機能**: 気になるサークルを保存して後から確認
- **レビュー・評価**: 実際に参加した人のレビューと評価を確認
- **モバイル対応**: スマートフォンやタブレットからも快適に利用可能

### サークル管理者向け機能

- **サークル登録・管理**: サークル情報を登録・編集
- **イベント管理**: 練習会や大会などのイベントを登録・管理
- **メンバー管理**: メンバーリストの管理や出欠確認
- **お知らせ機能**: メンバーへのお知らせや連絡事項を投稿

## 技術スタック

### フロントエンド

- **Next.js 14** (App Router): ページのルーティングとデータ取得
- **React 18**: コンポーネントベースの UI 構築
- **TypeScript**: 型安全な JavaScript 開発
- **TailwindCSS 4**: ユーティリティファーストの CSS フレームワーク
- **Shadcn/UI**: Radix UI ベースの UI コンポーネント
- **Framer Motion**: アニメーション
- **React Hook Form**: フォーム管理
- **Zod**: スキーマ検証と型安全性

### バックエンド/データベース

- **Next.js API Routes**: バックエンド API 開発
- **PostgreSQL**: リレーショナルデータベース
- **Prisma**: データベース管理とタイプセーフなクエリ
- **全文検索**: PostgreSQL の `tsvector` を使用した高速な全文検索
- **地理的検索**: 将来的な地図検索機能に対応（緯度・経度フィールド）

### 認証/セキュリティ

- **NextAuth.js**: 認証ライブラリ (OAuth, JWT)
- **Prisma Adapter**: NextAuth と Prisma の統合
- **bcrypt**: パスワードハッシュ化
- **Zod**: スキーマ検証と型安全性

### その他ツール

- **ESLint**: コード品質チェック
- **統一ロガー**: アプリケーション全体での一貫したロギング
- **API レスポンス標準化**: 統一された API レスポンス形式

## セットアップ手順

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn
- PostgreSQL 12 以上

### インストール手順

1. **リポジトリをクローン**:

```bash
git clone https://github.com/yourusername/badminton.git
cd badminton
```

2. **依存関係をインストール**:

```bash
npm install
```

3. **環境変数を設定**:

`.env.example`ファイルを`.env`にコピーして必要な値を設定します:

```bash
cp .env.example .env
```

`.env`ファイルに以下の環境変数を設定してください:

```env
# データベース接続URL
DATABASE_URL="postgresql://username:password@localhost:5432/badminton?schema=public"

# NextAuth.jsのシークレットキー
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuthプロバイダー（オプション）
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
TWITTER_CLIENT_ID=""
TWITTER_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

`NEXTAUTH_SECRET`は以下のコマンドで生成できます:

```bash
openssl rand -base64 32
```

4. **データベースのセットアップ**:

PostgreSQL にデータベースを作成します:

```bash
# PostgreSQLに接続
psql -U postgres

# データベースを作成
CREATE DATABASE badminton;
\q
```

5. **Prisma マイグレーションの実行**:

スキーマをデータベースに適用します:

```bash
npx prisma migrate dev
```

6. **データベース最適化の適用**:

マイグレーション後、追加の最適化を適用します:

```bash
# 最適化SQLスクリプトを実行
psql -U postgres -d badminton -f prisma/migrations/optimize_database.sql
```

または、PostgreSQL に直接接続して実行:

```bash
psql -U postgres -d badminton
\i prisma/migrations/optimize_database.sql
```

この最適化スクリプトは以下を実行します:

- 全文検索インデックスの作成
- レビュー評価の集計値更新
- メンバー数の集計値更新
- 自動更新トリガーの設定

7. **開発サーバーを起動**:

```bash
npm run dev
```

8. **ブラウザでアクセス**:

```
http://localhost:3000
```

## データベース設計

### 主な特徴

- **インデックス戦略**: 単一カラム、複合、GIN インデックスによる高速検索
- **全文検索**: PostgreSQL の `tsvector` を使用したサークル名・説明文の検索
- **非正規化**: 集計値（平均評価、レビュー数、メンバー数）を直接保存してパフォーマンス向上
- **自動更新トリガー**: レビューやメンバー変更時に集計値を自動更新
- **地理的検索準備**: 将来的な地図検索機能に対応（緯度・経度フィールド）

詳細は [docs/database-design.md](./docs/database-design.md) を参照してください。

## プロジェクト構造

```
badminton/
├── prisma/
│   ├── schema.prisma          # Prismaスキーマ定義
│   └── migrations/            # データベースマイグレーション
│       └── optimize_database.sql  # データベース最適化SQL
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API ルート
│   │   ├── auth/             # 認証ページ
│   │   ├── circles/          # サークル関連ページ
│   │   └── ...
│   ├── components/           # React コンポーネント
│   │   ├── auth/             # 認証コンポーネント
│   │   ├── circles/          # サークル関連コンポーネント
│   │   ├── dashboard/        # ダッシュボードコンポーネント
│   │   ├── layout/           # レイアウトコンポーネント
│   │   └── ui/               # UI コンポーネント
│   ├── lib/                  # ユーティリティ関数
│   │   ├── api-handler.ts    # API ハンドラー
│   │   ├── api-response.ts   # API レスポンス標準化
│   │   ├── auth.ts           # NextAuth 設定
│   │   ├── db-helpers.ts     # データベースヘルパー
│   │   ├── logger.ts         # ロガー
│   │   ├── prisma.ts         # Prisma クライアント
│   │   ├── validations.ts    # Zod スキーマ
│   │   └── utils.ts          # ユーティリティ関数
│   ├── constants/            # 定数定義
│   └── types/                # TypeScript 型定義
├── docs/                     # ドキュメント
│   ├── database-design.md    # データベース設計ドキュメント
│   └── database-setup.md     # データベースセットアップガイド
└── public/                   # 静的ファイル
```

## 開発コマンド

```bash
# 開発サーバーを起動
npm run dev

# 本番用ビルド
npm run build

# 本番サーバーを起動
npm start

# リンターを実行
npm run lint

# Prisma クライアントを生成
npx prisma generate

# Prisma マイグレーションを実行
npx prisma migrate dev

# Prisma Studio を起動（データベースGUI）
npx prisma studio
```

## Vercel へのデプロイ

### 環境変数の設定

Vercel のプロジェクト設定で以下の環境変数を設定してください:

- `DATABASE_URL`: PostgreSQL データベースの接続 URL
- `NEXTAUTH_SECRET`: NextAuth のシークレットキー
- `NEXTAUTH_URL`: アプリケーションの URL（例: `https://your-app.vercel.app`）
- OAuth プロバイダーを使用する場合: 各プロバイダーの `CLIENT_ID` と `CLIENT_SECRET`

### ビルド設定

プロジェクトは自動的に以下を実行します:

- `postinstall`: `npm install` 後に Prisma Client を自動生成
- `build`: ビルド前に Prisma Client を生成してから Next.js をビルド

### データベースマイグレーション

Vercel への初回デプロイ時は、データベースマイグレーションを手動で実行する必要があります:

```bash
npx prisma migrate deploy
```

または、Vercel のビルドコマンドに追加:

```json
{
  "scripts": {
    "build": "prisma migrate deploy && prisma generate && next build --no-lint"
  }
}
```

## パフォーマンス最適化

### データベース最適化

- **インデックス**: 頻繁に検索されるカラムにインデックスを設定
- **非正規化**: 集計値を直接保存してクエリを高速化
- **全文検索**: GIN インデックスによる高速な全文検索
- **自動更新トリガー**: 集計値のリアルタイム更新

### コード最適化

- **コンポーネント分解**: 大きなコンポーネントを小さな再利用可能なコンポーネントに分割
- **API レスポンス標準化**: 統一された API レスポンス形式
- **エラーハンドリング**: 一貫したエラーハンドリングとロギング
- **バリデーション**: Zod による型安全なバリデーション

## ライセンス

このプロジェクトは [LICENSE](./LICENSE) ファイルに記載されているライセンスの下で公開されています。

## 貢献

貢献を歓迎します！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## ドキュメント

- [データベース設計](./docs/database-design.md)
- [データベースセットアップガイド](./docs/database-setup.md)
