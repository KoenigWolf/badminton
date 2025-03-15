"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { z } from "zod";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

// サインアップフォームのスキーマを定義
const signupSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上入力してください",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

// 認証フォームからの入力値の型
type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 型を明示的に指定
  const handleSignup = async (values: AuthFormValues) => {
    setIsLoading(true);
    
    // 必要なフィールドがあるか確認
    if (!values.name || !values.confirmPassword) {
      toast.error("必須フィールドが不足しています");
      setIsLoading(false);
      return;
    }
    
    try {
      // サインアップAPIエンドポイントを呼び出し
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "ユーザー登録に失敗しました");
      }
      
      // 登録成功
      toast.success("アカウント作成完了", {
        description: "アカウントが正常に作成されました。ログインしてください。",
      });
      
      // 自動的にログイン
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      
      if (result?.error) {
        router.push("/auth/login");
        return;
      }
      
      // ログイン成功 - ダッシュボードへリダイレクト
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("アカウント作成エラー", {
        description: error instanceof Error ? error.message : "ユーザー登録に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <FaUserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            アカウント作成
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            会員登録して、サークルへの参加申請やお気に入り登録をしよう
          </p>
        </div>

        <AuthForm type="signup" onSubmit={handleSignup} />

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          すでにアカウントをお持ちですか？{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
} 