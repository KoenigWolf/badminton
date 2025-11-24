import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Prismaアダプターの設定（DATABASE_URLが設定されている場合のみ）
  // ビルド時にデータベース接続エラーを防ぐため
  ...(process.env.DATABASE_URL ? { adapter: PrismaAdapter(prisma) } : {}),
  
  // シークレットキーの設定（ビルドエラーを防ぐため明示的に設定）
  secret: process.env.NEXTAUTH_SECRET,
  
  // セッションの設定
  session: {
    strategy: "jwt",
  },
  
  // 認証プロバイダーの設定
  providers: [
    // メール/パスワード認証
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // データベースからユーザーを検索
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // ユーザーが存在しない、またはパスワードが設定されていない場合
        if (!user || !user.password) {
          return null;
        }

        // パスワードの検証
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
    
    // Googleでのログイン（環境変数が設定されている場合のみ）
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    
    // Facebookでのログイン（環境変数が設定されている場合のみ）
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),
    
    // Twitterでのログイン（環境変数が設定されている場合のみ）
    ...(process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET
      ? [
          TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
          }),
        ]
      : []),
    
    // GitHubでのログイン（環境変数が設定されている場合のみ）
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  
  // 認証関連のページのカスタマイズ
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  
  // コールバック関数の設定
  callbacks: {
    // JWTコールバック - トークンにユーザー情報を追加
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    
    // セッションコールバック - トークンからセッションにユーザー情報を追加
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  
  // デバッグオプション (開発環境のみtrueに設定)
  debug: process.env.NODE_ENV === "development",
}; 