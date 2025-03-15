import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// リクエストボディのバリデーションスキーマ
const userSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上である必要があります",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
});

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    
    // バリデーション
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          message: "入力データが不正です", 
          errors: result.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "このメールアドレスは既に登録されています" },
        { status: 409 }
      );
    }
    
    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ユーザーの作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // パスワードを除外したユーザー情報を返す
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: "ユーザーが正常に作成されました", 
        user: userWithoutPassword 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration error:", error);
    return NextResponse.json(
      { message: "ユーザー登録中にエラーが発生しました" },
      { status: 500 }
    );
  }
} 