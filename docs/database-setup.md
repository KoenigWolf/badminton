# データベースセットアップガイド

## 概要

このガイドでは、バドミントンサークルファインダーアプリケーションのデータベースをセットアップする手順を説明します。

## 前提条件

- PostgreSQL 12 以上がインストールされていること
- Node.js と npm がインストールされていること
- プロジェクトの依存パッケージがインストールされていること

## セットアップ手順

### 1. 環境変数の設定

`.env`ファイルにデータベース接続 URL を設定します：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/badminton?schema=public"
```

### 2. データベースの作成

PostgreSQL にデータベースを作成します：

```bash
# PostgreSQLに接続
psql -U postgres

# データベースを作成
CREATE DATABASE badminton;

# 日本語全文検索用の拡張を有効化（オプション）
\c badminton
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

### 3. Prisma マイグレーションの実行

スキーマをデータベースに適用します：

```bash
# マイグレーションファイルの生成と適用
npx prisma migrate dev --name init

# Prismaクライアントの生成
npx prisma generate
```

### 4. データベース最適化の適用

マイグレーション後、追加の最適化を適用します：

```bash
# 最適化SQLスクリプトを実行
psql -U postgres -d badminton -f prisma/migrations/optimize_database.sql
```

または、PostgreSQL に直接接続して実行：

```bash
psql -U postgres -d badminton
\i prisma/migrations/optimize_database.sql
```

### 5. 初期データの投入（オプション）

開発用の初期データを投入する場合：

```bash
# シードスクリプトを実行（作成する場合）
npx prisma db seed
```

## データベース設計の特徴

### インデックス戦略

- **単一カラムインデックス**: 頻繁に検索されるカラムに設定
- **複合インデックス**: よく使われる検索条件の組み合わせに設定
- **GIN インデックス**: 配列フィールド（`skillLevel`など）の検索を高速化
- **全文検索インデックス**: サークル名と説明文の検索を高速化

### パフォーマンス最適化

1. **非正規化による集計値の保存**

   - `Circle.averageRating`: レビューの平均評価
   - `Circle.reviewCount`: レビュー数
   - `Circle.memberCount`: アクティブなメンバー数

2. **自動更新トリガー**

   - レビュー作成/更新/削除時に評価を自動更新
   - メンバー追加/削除/更新時にメンバー数を自動更新

3. **全文検索**
   - PostgreSQL の`tsvector`を使用した高速な全文検索
   - 日本語に対応

## 確認方法

### データベース接続の確認

```bash
# Prisma Studioでデータベースを確認
npx prisma studio
```

### インデックスの確認

```sql
-- インデックスの一覧を確認
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### 全文検索の確認

```sql
-- 全文検索が動作するか確認
SELECT
  name,
  description,
  ts_rank(search_vector, plainto_tsquery('japanese', 'バドミントン')) as rank
FROM "Circle"
WHERE search_vector @@ plainto_tsquery('japanese', 'バドミントン')
ORDER BY rank DESC
LIMIT 10;
```

## トラブルシューティング

### マイグレーションエラー

マイグレーションでエラーが発生した場合：

```bash
# マイグレーションをリセット（開発環境のみ）
npx prisma migrate reset

# 再度マイグレーションを実行
npx prisma migrate dev
```

### 全文検索が動作しない

全文検索が動作しない場合、以下を確認：

1. `pg_trgm`拡張が有効になっているか
2. `optimize_database.sql`が実行されているか
3. `search_vector`カラムが存在するか

```sql
-- 拡張の確認
SELECT * FROM pg_extension WHERE extname = 'pg_trgm';

-- カラムの確認
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'Circle' AND column_name = 'search_vector';
```

### インデックスが作成されない

インデックスが作成されない場合：

```sql
-- インデックスの手動作成
CREATE INDEX IF NOT EXISTS circle_search_idx ON "Circle" USING gin(search_vector);
```

## 本番環境へのデプロイ

### 1. マイグレーションの適用

```bash
# 本番環境でマイグレーションを適用
npx prisma migrate deploy
```

### 2. 最適化スクリプトの実行

本番環境でも最適化スクリプトを実行：

```bash
psql $DATABASE_URL -f prisma/migrations/optimize_database.sql
```

### 3. バックアップの設定

定期的なバックアップを設定：

```bash
# バックアップスクリプトの例
pg_dump -U postgres -d badminton > backup_$(date +%Y%m%d).sql
```

## パフォーマンス監視

### スロークエリの確認

```sql
-- スロークエリのログを有効化（postgresql.conf）
log_min_duration_statement = 1000  -- 1秒以上

-- クエリの統計情報を確認
SELECT
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### インデックスの使用状況

```sql
-- インデックスの使用状況を確認
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

## まとめ

このデータベース設計により、以下の利点が得られます：

- **高速な検索**: インデックスと全文検索による最適化
- **自動更新**: トリガーによる集計値の自動更新
- **スケーラビリティ**: 将来の機能拡張に対応可能
- **データ整合性**: 適切な制約とリレーションシップ

詳細は`database-design.md`を参照してください。
