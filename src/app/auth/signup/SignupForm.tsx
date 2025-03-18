"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

type SignupFormValues = z.infer<typeof signupSchema>;

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);

    try {
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

      toast.success("アカウント作成完了", {
        description: "アカウントが正常に作成されました。ログインしています。",
      });

      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          console.error("Auto login error:", result.error);
          toast.error("自動ログインに失敗しました", {
            description: "ログインページでログインしてください。",
          });
          router.push("/auth/login");
          return;
        }

        router.push(callbackUrl);
        router.refresh();
      } catch (loginError) {
        console.error("Auto login error:", loginError);
        toast.error("自動ログインに失敗しました", {
          description: "ログインページでログインしてください。",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("アカウント作成エラー", {
        description:
          error instanceof Error
            ? error.message
            : "ユーザー登録に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          氏名
        </label>
        <Input
          id="name"
          type="text"
          placeholder="山田 太郎"
          autoComplete="name"
          {...register("name")}
          disabled={isLoading}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          パスワード
        </label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          {...register("password")}
          disabled={isLoading}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          パスワード（確認）
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          {...register("confirmPassword")}
          disabled={isLoading}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5"
      >
        {isLoading ? "登録中..." : "アカウント作成"}
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
          Google で登録
        </Button>
      </div>
    </form>
  );
}

// useSearchParamsを使用するクライアントコンポーネントをSuspenseで囲む
export default function SignupForm() {
  return (
    <Suspense fallback={<div className="text-center py-4">読み込み中...</div>}>
      <SignupFormContent />
    </Suspense>
  );
} 