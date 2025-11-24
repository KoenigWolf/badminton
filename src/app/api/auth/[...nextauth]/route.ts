import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuthハンドラーの初期化
// ビルド時のエラーを防ぐため、try-catchでラップ
let handler: ReturnType<typeof NextAuth>;

try {
  handler = NextAuth(authOptions);
} catch (error) {
  // ビルド時や初期化時のエラーをキャッチ
  console.error("NextAuth initialization error:", error);
  // フォールバックハンドラーを提供
  handler = NextAuth({
    providers: [],
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { handler as GET, handler as POST }; 