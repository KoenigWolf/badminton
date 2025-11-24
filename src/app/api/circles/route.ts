import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { circleSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { getQueryParams, validateRequest } from "@/lib/api-handler";
import { PAGINATION } from "@/constants";

// ─────────────────────────────
// GET: サークル一覧の取得
// ─────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { page, limit, search, prefecture, skillLevel } = getQueryParams(request);

    // 検索条件の構築
    const where: Prisma.CircleWhereInput = {
      AND: [
        // キーワード検索（サークル名と説明文）
        search ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        } : {},
        // 都道府県でフィルター
        prefecture ? { prefecture } : {},
        // スキルレベルでフィルター
        skillLevel ? { skillLevel: { has: skillLevel } } : {},
        // 募集中のサークルのみ
        { isRecruiting: true },
      ].filter(condition => Object.keys(condition).length > 0),
    };

    // サークル総数の取得
    const total = await prisma.circle.count({ where });

    // ページネーションを適用してサークル一覧を取得
    const circles = await prisma.circle.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: true,
        _count: {
          select: {
            members: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(
      {
        circles,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          current: page,
          limit,
        },
      },
      "サークル一覧を取得しました"
    );
  } catch (error) {
    logger.error("Circles fetch error", error);
    return serverErrorResponse("サークル情報の取得に失敗しました");
  }
}

// ─────────────────────────────
// POST: 新規サークルの作成
// ─────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const data = await validateRequest(request, circleSchema);

    // サークルの作成
    const circle = await prisma.circle.create({
      data: {
        ...data,
        isRecruiting: true,
      },
      include: {
        images: true,
      },
    });

    return successResponse(circle, "サークルが正常に作成されました", 201);
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    logger.error("Circle creation error", error);
    return serverErrorResponse("サークルの作成に失敗しました");
  }
}

// ─────────────────────────────
// PUT: サークル情報の更新
// ─────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return errorResponse("サークルIDは必須です", 400);
    }

    // バリデーション
    const data = circleSchema.partial().parse(updateData);

    // サークルの存在確認
    const existingCircle = await prisma.circle.findUnique({
      where: { id },
    });

    if (!existingCircle) {
      return notFoundResponse("指定されたサークルが見つかりません");
    }

    // サークル情報の更新
    const updatedCircle = await prisma.circle.update({
      where: { id },
      data,
      include: {
        images: true,
      },
    });

    return successResponse(
      updatedCircle,
      "サークル情報が正常に更新されました"
    );
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    logger.error("Circle update error", error);
    return serverErrorResponse("サークル情報の更新に失敗しました");
  }
}

// ─────────────────────────────
// DELETE: サークルの削除
// ─────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return errorResponse("サークルIDは必須です", 400);
    }

    // サークルの存在確認
    const existingCircle = await prisma.circle.findUnique({
      where: { id },
    });

    if (!existingCircle) {
      return notFoundResponse("指定されたサークルが見つかりません");
    }

    // サークルの削除（関連データも自動的に削除される）
    await prisma.circle.delete({
      where: { id },
    });

    return successResponse(null, "サークルが正常に削除されました");
  } catch (error) {
    logger.error("Circle deletion error", error);
    return serverErrorResponse("サークルの削除に失敗しました");
  }
}