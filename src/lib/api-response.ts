import { NextResponse } from "next/server";

/**
 * APIレスポンスの統一形式
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ path: string[]; message: string }>;
}

/**
 * 成功レスポンスを返す
 */
export function successResponse<T>(
  data: T,
  message: string = "処理が正常に完了しました",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * エラーレスポンスを返す
 */
export function errorResponse(
  message: string,
  status: number = 500,
  errors?: Array<{ path: string[]; message: string }>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}

/**
 * バリデーションエラーレスポンスを返す
 */
export function validationErrorResponse(
  errors: Array<{ path: string[]; message: string }>
): NextResponse<ApiResponse> {
  return errorResponse("入力データが不正です", 400, errors);
}

/**
 * 認証エラーレスポンスを返す
 */
export function unauthorizedResponse(
  message: string = "認証が必要です"
): NextResponse<ApiResponse> {
  return errorResponse(message, 401);
}

/**
 * 権限エラーレスポンスを返す
 */
export function forbiddenResponse(
  message: string = "この操作を実行する権限がありません"
): NextResponse<ApiResponse> {
  return errorResponse(message, 403);
}

/**
 * リソースが見つからないエラーレスポンスを返す
 */
export function notFoundResponse(
  message: string = "リソースが見つかりません"
): NextResponse<ApiResponse> {
  return errorResponse(message, 404);
}

/**
 * サーバーエラーレスポンスを返す
 */
export function serverErrorResponse(
  message: string = "サーバーエラーが発生しました"
): NextResponse<ApiResponse> {
  return errorResponse(message, 500);
}

