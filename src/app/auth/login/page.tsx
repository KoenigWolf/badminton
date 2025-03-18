"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      
      if (result?.error) {
        toast.error("ログインエラー", {
          description: "認証情報が正しくありません。もう一度お試しください。",
        });
        return;
      }
      
      toast.success("ログイン成功", {
        description: "ようこそ！",
      });
      
      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("ログインエラー", {
        description: "処理中にエラーが発生しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          メールアドレス
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          autoComplete="email"
          {...register("email")}
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            パスワード
          </label>
          <a
            href="/auth/forgot-password"
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            パスワードをお忘れですか？
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="********"
          autoComplete="current-password"
          {...register("password")}
          disabled={isLoading}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5"
      >
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">または</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => signIn("google", { callbackUrl })}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Google でログイン
        </Button>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <User className="h-8 w-8 text-blue-600 dark:text-blue-400" weight="fill" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ログイン
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            アカウントにログインして、最適なバドミントンサークルを見つけましょう
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4">読み込み中...</div>}>
          <LoginForm />
        </Suspense>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          アカウントをお持ちでない方は{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
} 