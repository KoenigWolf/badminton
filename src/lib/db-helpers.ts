import { prisma } from "./prisma";
import { logger } from "./logger";

/**
 * サークルのレビュー評価を更新
 * レビュー作成/更新/削除時に呼び出す
 */
export async function updateCircleRating(circleId: string): Promise<void> {
  try {
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
  } catch (error) {
    logger.error("Failed to update circle rating", error);
    throw error;
  }
}

/**
 * サークルのメンバー数を更新
 * メンバー追加/削除/ステータス変更時に呼び出す
 */
export async function updateCircleMemberCount(circleId: string): Promise<void> {
  try {
    const count = await prisma.circleMember.count({
      where: { circleId, status: "active" },
    });

    await prisma.circle.update({
      where: { id: circleId },
      data: { memberCount: count },
    });
  } catch (error) {
    logger.error("Failed to update circle member count", error);
    throw error;
  }
}

/**
 * 全文検索を使用したサークル検索
 * PostgreSQLの全文検索機能を使用（マイグレーション後）
 */
export async function searchCirclesWithFullText(
  searchTerm: string,
  options: {
    prefecture?: string;
    skillLevel?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{
  circles: unknown[];
  total: number;
}> {
  const { prefecture, skillLevel, page = 1, limit = 10 } = options;
  const offset = (page - 1) * limit;

  try {
    // 全文検索を使用したクエリ
    // 注意: PrismaのRawクエリを使用
    const whereConditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    // 全文検索条件
    // 注意: 日本語全文検索を使用する場合は、'japanese'を指定してください
    if (searchTerm) {
      whereConditions.push(
        `search_vector @@ plainto_tsquery('simple', $${paramIndex})`
      );
      params.push(searchTerm);
      paramIndex++;
    }

    // 都道府県フィルター
    if (prefecture) {
      whereConditions.push(`"prefecture" = $${paramIndex}`);
      params.push(prefecture);
      paramIndex++;
    }

    // スキルレベルフィルター
    if (skillLevel) {
      whereConditions.push(`$${paramIndex} = ANY("skillLevel")`);
      params.push(skillLevel);
      paramIndex++;
    }

    // 募集中のみ
    whereConditions.push(`"isRecruiting" = true`);

    const whereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // 総数取得
    const countQuery = `
      SELECT COUNT(*)::int as total
      FROM "Circle"
      ${whereClause}
    `;

    const countResult = await prisma.$queryRawUnsafe<[{ total: number }]>(
      countQuery,
      ...params
    );
    const total = countResult[0]?.total || 0;

    // データ取得（全文検索のスコアでソート）
    // 注意: 日本語全文検索を使用する場合は、'japanese'を指定してください
    const orderByClause = searchTerm
      ? `ORDER BY ts_rank(search_vector, plainto_tsquery('simple', $1)) DESC, "createdAt" DESC`
      : `ORDER BY "createdAt" DESC`;

    const dataQuery = `
      SELECT *
      FROM "Circle"
      ${whereClause}
      ${orderByClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    const circles = (await prisma.$queryRawUnsafe(dataQuery, ...params)) as unknown[];

    return { circles, total };
  } catch (error) {
    logger.error("Full text search error", error);
    // フォールバック: 通常の検索に戻る
    throw error;
  }
}

/**
 * 地理的検索を使用したサークル検索
 * PostGIS拡張を使用（将来的に実装）
 */
export async function searchCirclesByLocation(
  latitude: number,
  longitude: number,
  radiusKm: number = 10,
  options: {
    skillLevel?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{
  circles: unknown[];
  total: number;
}> {
  const { skillLevel, page = 1, limit = 10 } = options;
  const offset = (page - 1) * limit;

  try {
    // PostGISを使用した地理的検索
    // 注意: PostGIS拡張が必要
    const whereConditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    // 地理的検索条件
    whereConditions.push(`
      ST_DWithin(
        ST_MakePoint(longitude, latitude)::geography,
        ST_MakePoint($${paramIndex}, $${paramIndex + 1})::geography,
        $${paramIndex + 2} * 1000
      )
    `);
    params.push(longitude, latitude, radiusKm);
    paramIndex += 3;

    // スキルレベルフィルター
    if (skillLevel) {
      whereConditions.push(`$${paramIndex} = ANY("skillLevel")`);
      params.push(skillLevel);
      paramIndex++;
    }

    // 募集中のみ
    whereConditions.push(`"isRecruiting" = true`);

    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    // 総数取得
    const countQuery = `
      SELECT COUNT(*)::int as total
      FROM "Circle"
      ${whereClause}
    `;

    const countResult = await prisma.$queryRawUnsafe<[{ total: number }]>(
      countQuery,
      ...params
    );
    const total = countResult[0]?.total || 0;

    // データ取得（距離でソート）
    const dataQuery = `
      SELECT 
        *,
        ST_Distance(
          ST_MakePoint(longitude, latitude)::geography,
          ST_MakePoint($1, $2)::geography
        ) / 1000 as distance_km
      FROM "Circle"
      ${whereClause}
      ORDER BY distance_km ASC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    const circles = (await prisma.$queryRawUnsafe(dataQuery, ...params)) as unknown[];

    return { circles, total };
  } catch (error) {
    logger.error("Geographic search error", error);
    throw error;
  }
}

