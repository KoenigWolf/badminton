import { type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * セッションのUser型を拡張してidフィールドを追加
   */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
} 