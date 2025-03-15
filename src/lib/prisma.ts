import { PrismaClient } from '@prisma/client';

// グローバルスコープでPrismaクライアントのインスタンスを保持するための型定義
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// グローバルインスタンスが存在すればそれを使用し、なければ新しいインスタンスを作成
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // 開発環境のみで詳細なログを出力
    ...(process.env.NODE_ENV === 'development'
      ? { log: [{ level: 'query', emit: 'stdout' }] }
      : {})
  });

// 開発環境でのホットリロード時に複数のインスタンスが作成されるのを防ぐ
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} 