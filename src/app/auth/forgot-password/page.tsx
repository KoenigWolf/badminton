"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// パスワードリセットフォームのスキーマ
const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // フォームの設定
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // リセットリンク送信処理
  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    
    try {
      // 実際の環境では、APIエンドポイントを呼び出してリセットメールを送信
      // ここでは仮の実装としてタイムアウトで成功したことにします
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // 成功メッセージ
      toast.success("リセットリンクを送信しました", {
        description: "入力いただいたメールアドレスにパスワードリセットリンクを送信しました。メールをご確認ください。",
      });
      
      // フォームをリセット
      form.reset();
      
    } catch (error) {
      toast.error("エラーが発生しました", {
        description: "パスワードリセットリンクの送信に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            パスワードをお忘れですか？
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            アカウントに登録したメールアドレスを入力してください。
            <br />
            パスワードリセットのリンクをお送りします。
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      aria-disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading && <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />}
              リセットリンクを送信
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ログインページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
} 