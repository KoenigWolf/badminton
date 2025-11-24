"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
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
import { toast } from "sonner";
import { loginSchema, signupSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";

// フォームの型定義
import type { LoginSchema, SignupSchema } from "@/lib/validations";

type LoginFormValues = LoginSchema;
type SignupFormValues = SignupSchema;

export function AuthForm({
  type,
  onSubmit: onExternalSubmit,
}: {
  type: "login" | "signup";
  onSubmit?: (values: LoginFormValues | SignupFormValues) => Promise<void>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  
  // 状態管理
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // フォームの設定
  const schema = type === "login" ? loginSchema : signupSchema;
  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "signup" && { name: "", confirmPassword: "" }),
    },
  });

  // CredentialsProviderを使用した認証
  async function onSubmit(values: LoginFormValues | SignupFormValues) {
    setIsLoading(true);
    setError(null);
    
    try {
      // 外部のサブミットハンドラが提供されている場合はそちらを使用
      if (onExternalSubmit) {
        await onExternalSubmit(values);
        return;
      }
      
      // 内部ログイン処理（type === "login"のとき）
      if (type === "login") {
        try {
          const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });
          
          if (result?.error) {
            setError("メールアドレスまたはパスワードが正しくありません");
            toast.error("ログインエラー", {
              description: "認証情報が正しくありません。もう一度お試しください。",
            });
            return;
          }
          
          // ログイン成功
          toast.success("ログイン成功", {
            description: "ようこそ！",
          });
          
          // リダイレクト先に遷移
          router.push(callbackUrl);
          router.refresh(); // 認証状態をページに反映するためにリフレッシュ
        } catch (error) {
          logger.error("Login error", error);
          toast.error("ログインエラー", {
            description: "処理中にエラーが発生しました。もう一度お試しください。",
          });
        }
      }
    } catch (e) {
      setError("エラーが発生しました。もう一度お試しください。");
      toast.error("エラー", {
        description: "処理中にエラーが発生しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // ソーシャルログイン処理
  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl,
      });
    } catch (error) {
      logger.error(`${provider} login error`, error);
      toast.error("ログインエラー", {
        description: `${provider}でのログインに失敗しました。もう一度お試しください。`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "signup" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>氏名</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="山田 太郎"
                      {...field}
                      disabled={isLoading}
                      aria-disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
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
                    {...field}
                    disabled={isLoading}
                    aria-disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoComplete={type === "login" ? "current-password" : "new-password"}
                    {...field}
                    disabled={isLoading}
                    aria-disabled={isLoading}
                  />
                </FormControl>
                {type === "login" && (
                  <div className="text-sm text-right">
                    <a
                      href="/auth/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      パスワードをお忘れですか？
                    </a>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          {type === "signup" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード（確認）</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                      disabled={isLoading}
                      aria-disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {error && (
            <div className="text-sm text-red-500 font-medium">{error}</div>
          )}
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading && <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? "ログイン" : "アカウント作成"}
          </Button>
        </form>
      </Form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            または
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          aria-disabled={isLoading}
          onClick={() => handleSocialLogin("google")}
          className="flex items-center justify-center"
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          aria-disabled={isLoading}
          onClick={() => handleSocialLogin("facebook")}
          className="flex items-center justify-center"
        >
          <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          aria-disabled={isLoading}
          onClick={() => handleSocialLogin("twitter")}
          className="flex items-center justify-center"
        >
          <FaTwitter className="mr-2 h-4 w-4 text-blue-400" />
          X
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          aria-disabled={isLoading}
          onClick={() => handleSocialLogin("github")}
          className="flex items-center justify-center"
        >
          <FaGithub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  );
} 