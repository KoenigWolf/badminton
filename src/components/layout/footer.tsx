import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴとサービス紹介 */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              >
                <path
                  d="M7.5 4.5L7.5 11.25M7.5 11.25L7.5 19.5M7.5 11.25L17.25 19.5M7.5 11.25L16.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                BadFinder
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              バドミントンサークルファインダーは、あなたにぴったりのバドミントンサークルを見つけるための検索プラットフォームです。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* リンクセクション */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              サービスについて
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "当サイトについて" },
                { href: "/privacy", label: "プライバシーポリシー" },
                { href: "/terms", label: "利用規約" },
                { href: "/contact", label: "お問い合わせ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              サークルオーナー向け
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/register-circle", label: "サークルを登録する" },
                { href: "/manage-circle", label: "サークル管理" },
                { href: "/guides", label: "運用ガイド" },
                { href: "/faq", label: "よくある質問" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              サークル検索
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/search?level=beginner", label: "初心者向けサークル" },
                { href: "/search?level=intermediate", label: "中級者向けサークル" },
                { href: "/search?level=advanced", label: "上級者向けサークル" },
                { href: "/search", label: "すべてのサークル" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} BadFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 