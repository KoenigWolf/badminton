import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// ─────────────────────────────
// バリデーションスキーマの定義
// ─────────────────────────────
const circleSchema = z.object({
  name: z.string().min(1, { message: "サークル名は必須です" }),
  description: z.string().min(1, { message: "説明文は必須です" }),
  prefecture: z.string().min(1, { message: "都道府県は必須です" }),
  city: z.string().min(1, { message: "市区町村は必須です" }),
  address: z.string().optional(),
  activityFrequency: z.string().min(1, { message: "活動頻度は必須です" }),
  activityDays: z.array(z.string()).min(1, { message: "活動曜日は1つ以上選択してください" }),
  activityTimes: z.array(z.string()).min(1, { message: "活動時間帯は1つ以上選択してください" }),
  skillLevel: z.array(z.string()).min(1, { message: "対象レベルは1つ以上選択してください" }),
  fee: z.number().min(0, { message: "月会費は0以上の数値を入力してください" }),
  memberCount: z.number().optional(),
  website: z.string().url().optional().nullable(),
  socialLinks: z.any().optional(),
  facilities: z.array(z.string()).optional(),
  equipments: z.array(z.string()).optional(),
  ageGroups: z.array(z.string()).optional(),
  genderRatio: z.string().optional(),
});

// ─────────────────────────────
// GET: サークル一覧の取得
// ─────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const prefecture = searchParams.get("prefecture");
    const skillLevel = searchParams.get("skillLevel");

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

    return NextResponse.json({
      circles,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Circles fetch error:", error);
    return NextResponse.json(
      { message: "サークル情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────
// POST: 新規サークルの作成
// ─────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // バリデーション
    const result = circleSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力データが不正です", errors: result.error.errors },
        { status: 400 }
      );
    }

    // サークルの作成
    const circle = await prisma.circle.create({
      data: {
        ...result.data,
        isRecruiting: true,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      { message: "サークルが正常に作成されました", circle },
      { status: 201 }
    );
  } catch (error) {
    console.error("Circle creation error:", error);
    return NextResponse.json(
      { message: "サークルの作成に失敗しました" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────
// PUT: サークル情報の更新
// ─────────────────────────────
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "サークルIDは必須です" },
        { status: 400 }
      );
    }

    // バリデーション
    const result = circleSchema.partial().safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力データが不正です", errors: result.error.errors },
        { status: 400 }
      );
    }

    // サークルの存在確認
    const existingCircle = await prisma.circle.findUnique({
      where: { id },
    });

    if (!existingCircle) {
      return NextResponse.json(
        { message: "指定されたサークルが見つかりません" },
        { status: 404 }
      );
    }

    // サークル情報の更新
    const updatedCircle = await prisma.circle.update({
      where: { id },
      data: result.data,
      include: {
        images: true,
      },
    });

    return NextResponse.json({
      message: "サークル情報が正常に更新されました",
      circle: updatedCircle,
    });
  } catch (error) {
    console.error("Circle update error:", error);
    return NextResponse.json(
      { message: "サークル情報の更新に失敗しました" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────
// DELETE: サークルの削除
// ─────────────────────────────
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "サークルIDは必須です" },
        { status: 400 }
      );
    }

    // サークルの存在確認
    const existingCircle = await prisma.circle.findUnique({
      where: { id },
    });

    if (!existingCircle) {
      return NextResponse.json(
        { message: "指定されたサークルが見つかりません" },
        { status: 404 }
      );
    }

    // サークルの削除（関連データも自動的に削除される）
    await prisma.circle.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "サークルが正常に削除されました",
    });
  } catch (error) {
    console.error("Circle deletion error:", error);
    return NextResponse.json(
      { message: "サークルの削除に失敗しました" },
      { status: 500 }
    );
  }
}