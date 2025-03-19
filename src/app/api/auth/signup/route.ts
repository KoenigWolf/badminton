import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// サインアップリクエストボディのバリデーションスキーマ
// ユーザーが入力したデータの形式とルールを定義
const userSchema = z.object({
  // ユーザー名は2文字以上必須
  name: z.string().min(2, {
    message: "名前は2文字以上である必要があります",
  }),
  // メールアドレスは有効な形式でなければならない
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  // パスワードは8文字以上必須
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
});

// POSTエンドポイント：ユーザー登録処理
export async function POST(request: Request) {
  try {
    // リクエストボディの取得：クライアントから送信されたJSONデータを取得する
    const body = await request.json();

    // 入力データのバリデーション
    // 定義済みのuserSchemaを使い、リクエストボディの内容を検証
    // エラーがあれば、詳細なエラーメッセージとともに400エラーを返す
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力データが不正です", errors: result.error.errors },
        { status: 400 }
      );
    }

    // バリデーション済みのデータを変数に展開
    const { name, email, password } = result.data;

    // 重複登録の確認：同じメールアドレスを持つユーザーが既に存在しないか確認する
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "このメールアドレスは既に登録されています" },
        { status: 409 }
      );
    }

    // パスワードのハッシュ化：ユーザーのパスワードを安全に保管するため、bcryptを使ってハッシュ化する
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新規ユーザーの作成：Prismaを利用して、ユーザー情報をデータベースに保存する
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // レスポンス用ユーザーオブジェクトの整形：セキュリティのため、ハッシュ化済みパスワードはレスポンスから除外する
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    // 成功レスポンスの返却
    return NextResponse.json(
      {
        message: "ユーザーが正常に作成されました",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    // エラーハンドリング
    // 処理中にエラーが発生した場合は、500エラーとして返却
    // エラー内容はサーバーログに出力し、クライアントには一般的なエラーメッセージを返す
    console.error("User registration error:", error);
    return NextResponse.json(
      { message: "ユーザー登録中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
