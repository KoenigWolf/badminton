import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class", // ダークモードを `class` ベースに
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // ShadCN コンポーネントを適用するために `src` も含める
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // メインの青
        secondary: "#9333ea", // メインの紫
        accent: "#14b8a6", // アクセントのエメラルド
        muted: "#64748b", // グレー系の muted カラー
        "muted-foreground": "#94a3b8", // muted のテキストカラー
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Inter フォントを優先
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // ShadCN のアニメーションプラグイン
    plugin(({ addBase }) => {
      addBase({
        "h1, h2, h3, h4, h5, h6": {
          fontWeight: "bold",
        },
      });
    }),
  ],
};

export default config;
