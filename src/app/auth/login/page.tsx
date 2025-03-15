import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { FaSignInAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "ログイン | バドミントンサークルファインダー",
  description: "アカウントにログインして、バドミントンサークルを探したり、管理したりしましょう。",
};

export default function LoginPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <FaSignInAlt className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ログイン
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            アカウントにログインして、最適なバドミントンサークルを見つけましょう
          </p>
        </div>

        <AuthForm type="login" />

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