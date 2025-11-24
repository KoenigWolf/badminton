/**
 * アプリケーション全体で使用する定数
 */

// ページネーション
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// 認証関連
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
} as const;

// 保護されたルート
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/manage-circle",
  "/profile",
] as const;

// ナビゲーションリンク
export const NAV_LINKS = [
  {
    href: "/search",
    label: "サークルを探す",
    ariaLabel: "バドミントンサークルを探す",
  },
  {
    href: "/register-circle",
    label: "サークルを登録する",
    ariaLabel: "あなたのバドミントンサークルを登録する",
  },
  {
    href: "/about",
    label: "当サイトについて",
    ariaLabel: "BadFinderサイトの詳細情報",
  },
  {
    href: "/faq",
    label: "よくある質問",
    ariaLabel: "よくある質問と回答",
  },
] as const;

// ユーザーメニュー項目
export const USER_MENU_ITEMS = [
  { href: "/dashboard", label: "マイページ", ariaLabel: "マイページに移動" },
  { href: "/profile", label: "プロフィール", ariaLabel: "プロフィール設定に移動" },
] as const;

// スキルレベル
export const SKILL_LEVELS = ["初心者", "中級者", "上級者"] as const;

// 都道府県リスト（主要な都道府県）
export const PREFECTURES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;

