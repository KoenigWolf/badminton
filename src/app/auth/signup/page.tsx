"use client";

// ─────────────────────────────
// 外部ライブラリとコンポーネントのインポート
// ─────────────────────────────
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form"; // 認証フォームコンポーネント
import { z } from "zod"; // 入力検証用ライブラリ
import { toast } from "sonner"; // ユーザー通知用ライブラリ
import { UserPlus } from "@phosphor-icons/react"; // アイコンライブラリからインポート

// ─────────────────────────────
// サインアップフォームの入力検証スキーマ
// ・Zodを利用して、ユーザー入力の妥当性をチェックする
// ・name, email, password, confirmPasswordの各フィールドを検証
// ・passwordとconfirmPasswordが一致していることを確認
// ─────────────────────────────
const signupSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// ─────────────────────────────
// 認証フォームから渡される入力値の型
// ・ログインやサインアップで共通して使用できる形にしておく
// ─────────────────────────────
type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

// ─────────────────────────────
// SignupPageコンポーネント：新規ユーザー登録ページ
// ・サインアップAPIエンドポイントへのリクエストと、サインイン処理を実装
// ・UIはAuthFormコンポーネントを利用している
// ─────────────────────────────
export default function SignupPage() {
  // Next.jsのルーターを利用してページ遷移を制御
  const router = useRouter();
  // APIリクエスト中のローディング状態を管理
  const [isLoading, setIsLoading] = useState(false);

  // ─────────────────────────────
  // handleSignup関数：サインアップ処理の実行
  // ・フォームの値を受け取り、入力検証後APIへPOSTリクエストを送信
  // ・成功時は自動サインインし、ダッシュボードへリダイレクト
  // ・エラー発生時は通知を表示
  // ─────────────────────────────
  const handleSignup = async (values: AuthFormValues) => {
    setIsLoading(true);

    // 必須フィールド（nameとconfirmPassword）が存在するか確認
    if (!values.name || !values.confirmPassword) {
      toast.error("必須フィールドが不足しています");
      setIsLoading(false);
      return;
    }

    try {
      // サインアップAPIエンドポイントへリクエストを送信
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 必要なフィールドだけを送信
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      // APIからのレスポンスをJSON形式で取得
      const data = await response.json();

      // レスポンスがOKでない場合はエラーとして処理
      if (!response.ok) {
        throw new Error(data.message || "ユーザー登録に失敗しました");
      }

      // 登録成功の通知を表示
      toast.success("アカウント作成完了", {
        description: "アカウントが正常に作成されました。ログインしています。",
      });

      try {
        // 自動サインイン処理（credentials認証を利用）
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        // サインインにエラーがあった場合、ログインページへリダイレクト
        if (result?.error) {
          console.error("Auto login error:", result.error);
          toast.error("自動ログインに失敗しました", {
            description: "ログインページでログインしてください。",
          });
          router.push("/auth/login");
          return;
        }

        // サインイン成功の場合は、ダッシュボードへ遷移しページをリフレッシュ
        router.push("/dashboard");
        router.refresh();
      } catch (loginError) {
        console.error("Auto login error:", loginError);
        toast.error("自動ログインに失敗しました", {
          description: "ログインページでログインしてください。",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      // エラー内容をコンソールに出力し、ユーザーに通知
      console.error("Signup error:", error);
      toast.error("アカウント作成エラー", {
        description:
          error instanceof Error
            ? error.message
            : "ユーザー登録に失敗しました。もう一度お試しください。",
      });
    } finally {
      // API処理完了後、ローディング状態を解除
      setIsLoading(false);
    }
  };

  // ─────────────────────────────
  // UIのレンダリング
  // ・背景とフォームを中央に配置し、シンプルかつ直感的なレイアウトを実現
  // ─────────────────────────────
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* ヘッダー部分：アイコンとタイトル、サブテキスト */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <UserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            アカウント作成
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            会員登録して、サークルへの参加申請やお気に入り登録をしよう
          </p>
        </div>

        {/* AuthFormコンポーネント：入力フォームを表示
            ・type="signup"を指定して、サインアップ用のフォームをレンダリング
            ・handleSignup関数をonSubmitとして渡す */}
        <AuthForm type="signup" onSubmit={handleSignup} />

        {/* 既存ユーザー向けのログインリンク */}
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
