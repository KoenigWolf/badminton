import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { validateRequest } from "@/lib/api-handler";

// POSTエンドポイント：ユーザー登録処理
export async function POST(request: NextRequest) {
  try {
    // リクエストボディの取得とバリデーション
    const { name, email, password } = await validateRequest(request, userSchema);

    // 重複登録の確認
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return errorResponse(
        "このメールアドレスは既に登録されています",
        409
      );
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新規ユーザーの作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // レスポンス用ユーザーオブジェクトの整形（パスワードを除外）
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return successResponse(
      userWithoutPassword,
      "ユーザーが正常に作成されました",
      201
    );
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    logger.error("User registration error", error);
    return serverErrorResponse("ユーザー登録中にエラーが発生しました");
  }
}
