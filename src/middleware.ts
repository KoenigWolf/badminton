import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// 認証が必要なパス
const protectedPaths = [
  "/dashboard",
  "/manage-circle",
  "/profile",
];

// 公開パス（常にアクセス可能）
const publicPaths = [
  "/",
  "/search",
  "/circles",
  "/about",
  "/faq",
  "/auth/login",
  "/auth/signup",
  "/auth/error",
  "/api/auth",
];

// ログイン済みユーザーがアクセスできないパス（ログイン後はダッシュボードへリダイレクト）
const authRoutes = [
  "/auth/login",
  "/auth/signup",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 認証トークンの取得
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // ログイン済みの場合、authRoutesへのアクセスはダッシュボードへリダイレクト
  if (token && authRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // パスが認証必須であり、かつログインしていない場合はログインページへリダイレクト
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  if (isProtectedPath && !token) {
    // 現在のURLをリダイレクト先としてクエリパラメーターに追加
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}

// Middlewareが適用されるパス
export const config = {
  matcher: [
    // 保護されたルート
    ...protectedPaths,
    // 認証ルート
    ...authRoutes,
  ],
}; 