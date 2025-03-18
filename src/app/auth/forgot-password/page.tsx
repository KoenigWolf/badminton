"use client";

// ─────────────────────────────
// 外部ライブラリとコンポーネントのインポート
// ─────────────────────────────
import { useState } from "react"; // Reactの状態管理フック
import Link from "next/link"; // Next.jsのリンクコンポーネント
import { useRouter } from "next/navigation"; // ページ遷移用のフック
import { z } from "zod"; // 入力検証ライブラリ
import { useForm } from "react-hook-form"; // フォーム管理ライブラリ
import { zodResolver } from "@hookform/resolvers/zod"; // Zodとreact-hook-formの統合用リゾルバ
import { toast } from "sonner"; // ユーザー通知ライブラリ
import { AiOutlineLoading } from "react-icons/ai"; // ローディングアイコン（React Icons）

// ─────────────────────────────
// UIコンポーネントのインポート
// ─────────────────────────────
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

// ─────────────────────────────
// パスワードリセットフォームの検証スキーマ
// ─────────────────────────────
// ユーザーが入力するメールアドレスが正しい形式かを検証するために、Zodを使用
const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
});

// ─────────────────────────────
// フォームの入力値の型定義
// ─────────────────────────────
// forgotPasswordSchemaに基づいて、入力値の型を自動生成
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ─────────────────────────────
// ForgotPasswordPageコンポーネント
// ─────────────────────────────
// このページは、パスワードリセットリンクをユーザーに送信するためのフォームを提供します。
// ユーザーは自身の登録済みメールアドレスを入力し、送信ボタンをクリックすることで処理が開始されます。
export default function ForgotPasswordPage() {
  // API呼び出し中の状態管理（ローディング表示用）
  const [isLoading, setIsLoading] = useState(false);

  // ─────────────────────────────
  // react-hook-formの初期設定
  // ─────────────────────────────
  // zodResolverを使用して、Zodのスキーマに基づいたバリデーションを行う
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // ─────────────────────────────
  // onSubmit関数：パスワードリセットリンク送信処理
  // ─────────────────────────────
  async function onSubmit(values: ForgotPasswordFormValues) {
    // API呼び出し中はローディング状態を有効にする
    setIsLoading(true);

    try {
      // ─────────────────────────────
      // シミュレーション：パスワードリセットメール送信処理
      // ─────────────────────────────
      // 実際の運用環境では、ここでバックエンドAPIを呼び出し、ユーザーのメールアドレスにリセットリンクを送信します。
      // ここでは例として1.5秒間のタイムアウトで処理成功を模擬します。
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ─────────────────────────────
      // 成功時のユーザー通知
      // ─────────────────────────────
      toast.success("リセットリンクを送信しました", {
        description:
          "入力いただいたメールアドレスにパスワードリセットリンクを送信しました。メールをご確認ください。",
      });

      // ─────────────────────────────
      // フォームのリセット
      // ─────────────────────────────
      form.reset();
    } catch (e) {
      // ─────────────────────────────
      // エラー発生時の処理
      // ─────────────────────────────
      toast.error("エラーが発生しました", {
        description:
          "パスワードリセットリンクの送信に失敗しました。もう一度お試しください。",
      });
    } finally {
      // ─────────────────────────────
      // API呼び出し終了後、ローディング状態を解除
      // ─────────────────────────────
      setIsLoading(false);
    }
  }

  // ─────────────────────────────
  // コンポーネントのレンダリング
  // ─────────────────────────────
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      {/* フォームのコンテナ：中央揃えでカード型レイアウトを実現 */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* ヘッダー部分：タイトルと説明文 */}
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

        {/* 入力フォーム：react-hook-formとカスタムUIコンポーネントを利用 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ─────────────────────────────
                メールアドレス入力フィールド
                ・ユーザーがメールアドレスを入力するためのフィールド
                ・フォームの状態管理およびバリデーションはreact-hook-formにより実施
                ───────────────────────────── */}
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
                      disabled={isLoading} // ローディング中は入力を無効化
                      aria-disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ─────────────────────────────
                送信ボタン
                ・クリック時にフォームの送信をトリガー
                ・ローディング状態の場合はスピナーアイコンを表示
                ───────────────────────────── */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading && (
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              )}
              リセットリンクを送信
            </Button>
          </form>
        </Form>

        {/* ─────────────────────────────
            ナビゲーションリンク：ログインページへ戻るためのリンク
            ───────────────────────────── */}
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
