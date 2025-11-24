# データベース設計ドキュメント

## 概要

このドキュメントでは、バドミントンサークルファインダーアプリケーションのデータベース設計について説明します。

## データベース選択

### PostgreSQL を選択した理由

1. **リレーショナルデータの管理**

   - ユーザー、サークル、レビューなどの複雑なリレーションシップを効率的に管理
   - ACID 準拠によるデータ整合性の保証

2. **全文検索機能**

   - PostgreSQL の`tsvector`と`tsquery`を使用した高速な全文検索
   - サークル名や説明文の検索を最適化

3. **配列型のサポート**

   - `activityDays`, `skillLevel`, `facilities`などの配列フィールドを直接サポート
   - GIN インデックスによる高速な配列検索

4. **JSON 型のサポート**

   - `socialLinks`などの柔軟なデータ構造を保存

5. **拡張性**

   - PostGIS 拡張による地理的検索（将来的な地図検索機能に対応）
   - 複雑なクエリと集計処理に対応

6. **パフォーマンス**
   - 高度なインデックス戦略（B-tree, GIN, GiST）
   - クエリオプティマイザによる最適化

## データモデル設計

### 主要なエンティティ

1. **User（ユーザー）**

   - 認証情報とプロフィール情報を管理
   - レビュー、お気に入り、サークルメンバーシップなどの関連データ

2. **Circle（サークル）**

   - サークルの基本情報と詳細情報
   - レビュー評価の集計値（非正規化によるパフォーマンス向上）

3. **Review（レビュー）**

   - ユーザーによるサークルの評価とコメント
   - 1 ユーザー 1 サークルにつき 1 レビュー（制約）

4. **Favorite（お気に入り）**

   - ユーザーがお気に入り登録したサークル

5. **CircleMember（サークルメンバー）**

   - サークルへの参加情報とステータス

6. **CircleAdmin（サークル管理者）**

   - サークルの管理権限

7. **Application（参加申請）**

   - サークルへの参加申請とそのステータス

8. **Event（イベント）**

   - サークルのイベント情報

9. **CircleImage（サークル画像）**
   - サークルの画像と表示順序

## インデックス戦略

### 単一カラムインデックス

- **User**: `email`, `prefecture`, `skillLevel`
- **Circle**: `prefecture`, `city`, `isRecruiting`, `averageRating`, `fee`, `createdAt`
- **Review**: `circleId`, `userId`, `createdAt`
- **Favorite**: `userId`, `circleId`
- **Event**: `circleId`, `startDate`

### 複合インデックス

- **Circle**:

  - `[isRecruiting, prefecture]` - 募集中サークルの都道府県検索
  - `[isRecruiting, averageRating]` - 募集中サークルの評価順ソート
  - `[prefecture, city]` - 都道府県と市区町村での検索

- **Favorite**: `[userId, createdAt]` - ユーザーのお気に入りを日付順で取得

- **Event**: `[circleId, startDate]` - サークルの今後のイベントを取得

### 特殊インデックス

- **配列フィールド**: `skillLevel`に GIN インデックス（PostgreSQL の配列検索用）
- **全文検索**: `name`と`description`に全文検索インデックス（マイグレーション後に追加）

## パフォーマンス最適化

### 1. 非正規化による集計値の保存

`Circle`モデルに`averageRating`と`reviewCount`を追加し、レビュー評価の集計を毎回計算するのではなく、保存された値を使用します。

**更新タイミング**:

- レビュー作成時
- レビュー更新時
- レビュー削除時

### 2. 全文検索の最適化

PostgreSQL の全文検索機能を使用して、サークル名と説明文の検索を高速化します。

```sql
-- マイグレーション後に実行
ALTER TABLE "Circle" ADD COLUMN search_vector tsvector;
CREATE INDEX circle_search_idx ON "Circle" USING gin(search_vector);

-- トリガーで自動更新
CREATE TRIGGER circle_search_update BEFORE INSERT OR UPDATE ON "Circle"
FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(
  search_vector, 'pg_catalog.japanese', name, description
);
```

### 3. 地理的検索の準備

将来的な地図検索機能に対応するため、`latitude`と`longitude`フィールドを追加しました。

PostGIS 拡張を使用する場合:

```sql
-- PostGIS拡張の有効化
CREATE EXTENSION IF NOT EXISTS postgis;

-- 地理的インデックスの追加
CREATE INDEX circle_location_idx ON "Circle" USING gist(
  ST_MakePoint(longitude, latitude)
);
```

### 4. ページネーションの最適化

カーソルベースのページネーションを検討（大量データの場合）:

- `createdAt`と`id`を使用したカーソル
- `OFFSET`の代わりに`WHERE id > lastId`を使用

## データ整合性

### 制約

1. **一意制約**

   - `User.email`: メールアドレスの重複防止
   - `Favorite[userId, circleId]`: 1 ユーザーが同じサークルを複数回お気に入り登録できない
   - `Review[userId, circleId]`: 1 ユーザーが同じサークルに複数レビューできない
   - `CircleMember[userId, circleId]`: 1 ユーザーが同じサークルに複数回参加できない

2. **外部キー制約**

   - すべての関連テーブルに`onDelete: Cascade`を設定
   - 親レコード削除時に子レコードも自動削除

3. **デフォルト値**
   - `Circle.isRecruiting`: `true`
   - `CircleMember.status`: `"active"`
   - `Application.status`: `"pending"`
   - `Circle.memberCount`: `0`
   - `Circle.averageRating`: `0`
   - `Circle.reviewCount`: `0`

## マイグレーション手順

### 1. スキーマの更新

```bash
npx prisma migrate dev --name optimize_database_design
```

### 2. 全文検索インデックスの追加

マイグレーションファイルに以下を追加:

```sql
-- 全文検索用カラムの追加
ALTER TABLE "Circle" ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- 既存データの更新
UPDATE "Circle" SET search_vector =
  to_tsvector('japanese', COALESCE(name, '') || ' ' || COALESCE(description, ''));

-- インデックスの作成
CREATE INDEX IF NOT EXISTS circle_search_idx ON "Circle" USING gin(search_vector);

-- 自動更新トリガーの作成
CREATE OR REPLACE FUNCTION circle_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('japanese', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER circle_search_update
BEFORE INSERT OR UPDATE ON "Circle"
FOR EACH ROW EXECUTE FUNCTION circle_search_vector_update();
```

### 3. レビュー評価の集計値更新

既存のレビューデータから集計値を計算:

```sql
-- 既存データの集計値更新
UPDATE "Circle" c
SET
  average_rating = COALESCE((
    SELECT AVG(rating)::float
    FROM "Review"
    WHERE "circleId" = c.id
  ), 0),
  review_count = (
    SELECT COUNT(*)
    FROM "Review"
    WHERE "circleId" = c.id
  );
```

## クエリ最適化のベストプラクティス

### 1. 検索クエリ

```typescript
// 全文検索を使用した検索（マイグレーション後）
const circles = await prisma.$queryRaw`
  SELECT * FROM "Circle"
  WHERE search_vector @@ plainto_tsquery('japanese', ${search})
  AND "isRecruiting" = true
  ORDER BY ts_rank(search_vector, plainto_tsquery('japanese', ${search})) DESC
  LIMIT ${limit} OFFSET ${offset}
`;
```

### 2. レビュー評価の更新

レビュー作成/更新/削除時に集計値を更新:

```typescript
// レビュー作成後の集計値更新
async function updateCircleRating(circleId: string) {
  const stats = await prisma.review.aggregate({
    where: { circleId },
    _avg: { rating: true },
    _count: true,
  });

  await prisma.circle.update({
    where: { id: circleId },
    data: {
      averageRating: stats._avg.rating || 0,
      reviewCount: stats._count,
    },
  });
}
```

### 3. メンバー数の更新

メンバー追加/削除時に集計値を更新:

```typescript
async function updateCircleMemberCount(circleId: string) {
  const count = await prisma.circleMember.count({
    where: { circleId, status: "active" },
  });

  await prisma.circle.update({
    where: { id: circleId },
    data: { memberCount: count },
  });
}
```

## スケーラビリティの考慮

### 1. 読み取りレプリカ

大量の読み取りクエリに対応するため、読み取り専用レプリカを検討:

```typescript
// Prismaの読み取りレプリカ設定
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_READ_REPLICA_URL,
    },
  },
});
```

### 2. キャッシュ戦略

- Redis を使用した頻繁にアクセスされるデータのキャッシュ
- サークル一覧、人気サークルなどのキャッシュ

### 3. パーティショニング

将来的にデータ量が増加した場合:

- レビューテーブルの日付によるパーティショニング
- イベントテーブルの日付によるパーティショニング

## 監視とメンテナンス

### 1. インデックスの使用状況

定期的にインデックスの使用状況を確認:

```sql
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan;
```

### 2. スロークエリの特定

PostgreSQL のログ設定でスロークエリを記録:

```sql
-- postgresql.conf
log_min_duration_statement = 1000  -- 1秒以上かかるクエリを記録
```

### 3. 統計情報の更新

定期的に統計情報を更新:

```sql
ANALYZE;
```

## まとめ

このデータベース設計により、以下の利点が得られます:

1. **高速な検索**: インデックスと全文検索による最適化
2. **スケーラビリティ**: 将来の機能拡張に対応可能
3. **データ整合性**: 適切な制約とリレーションシップ
4. **パフォーマンス**: 非正規化とインデックス戦略による最適化
5. **拡張性**: 地理的検索、全文検索などの高度な機能に対応
