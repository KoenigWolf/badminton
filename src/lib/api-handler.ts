import { NextRequest } from "next/server";
import { ZodError, ZodSchema } from "zod";
import { logger } from "./logger";
import {
  errorResponse,
  serverErrorResponse,
  validationErrorResponse,
} from "./api-response";

/**
 * APIハンドラーのラッパー関数
 * エラーハンドリングとロギングを統一
 */
export async function apiHandler<T>(
  handler: (request: NextRequest) => Promise<T>,
  request: NextRequest,
  context?: string
): Promise<T> {
  try {
    return await handler(request);
  } catch (error) {
    const contextMessage = context ? `[${context}]` : "";
    
    if (error instanceof ZodError) {
      logger.error(`${contextMessage} Validation error`, error);
      throw error;
    }
    
    logger.error(`${contextMessage} Unexpected error`, error);
    throw error;
  }
}

/**
 * リクエストボディをバリデーションしてパース
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.map(String),
        message: err.message,
      }));
      throw validationErrorResponse(formattedErrors);
    }
    throw error;
  }
}

/**
 * クエリパラメータを取得
 */
export function getQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    page: Number.parseInt(searchParams.get("page") || "1", 10),
    limit: Number.parseInt(searchParams.get("limit") || "10", 10),
    search: searchParams.get("search") || "",
    prefecture: searchParams.get("prefecture"),
    skillLevel: searchParams.get("skillLevel"),
  };
}

