// page.ts - これはサーバーコンポーネントです
import SignupForm from "./SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            新規登録
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            アカウントを作成して、バドミントンサークルを見つけよう
          </p>
        </div>

        <SignupForm />
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          すでにアカウントをお持ちの方は{" "}
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