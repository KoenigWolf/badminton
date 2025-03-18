// page.ts - サーバーコンポーネントとして実装されたサインアップページ

import SignupForm from "./SignupForm";
import Link from "next/link";

// サインアップページコンポーネント
// このコンポーネントはユーザーが新規登録を行うためのページを提供する
export default function SignupPage() {
  // メインコンテナ
  // 画面全体に背景色を適用し中央にコンテンツを配置する
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
      {/*
        コンテンツセクション
        ・幅の上限とパディングによりコンテンツのレイアウトを制御
        ・背景色と角丸、影を適用し視覚的に区切りを付ける
      */}
      <section className="max-w-md w-full p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/*
          ヘッダー部
          ・ページのタイトルと説明文を中央寄せで表示する
        */}
        <header className="text-center">
          {/*
            ページタイトル
            ・太字で大きめの文字サイズにより視認性を向上
          */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            新規登録
          </h1>
          {/*
            ページ説明文
            ・ユーザーに対して登録のメリットを簡潔に伝える
          */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            アカウントを作成して、バドミントンサークルを見つけよう
          </p>
        </header>

        {/*
          ユーザー登録フォーム
          ・SignupForm コンポーネントにより入力フォームと登録処理を分離して管理
        */}
        <SignupForm />

        {/*
          フッター部
          ・既存ユーザー向けにログインページへのリンクを表示する
        */}
        <footer className="text-center text-sm text-gray-600 dark:text-gray-400">
          すでにアカウントをお持ちの方は{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ログイン
          </Link>
        </footer>
      </section>
    </main>
  );
}
