import { z } from "zod";

/**
 * 共通のバリデーションスキーマ
 */

// ユーザー関連のスキーマ
export const userSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上である必要があります",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上である必要があります",
  }),
});

export const signupSchema = userSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

// サークル関連のスキーマ
export const circleSchema = z.object({
  name: z.string().min(1, { message: "サークル名は必須です" }),
  description: z.string().min(1, { message: "説明文は必須です" }),
  prefecture: z.string().min(1, { message: "都道府県は必須です" }),
  city: z.string().min(1, { message: "市区町村は必須です" }),
  address: z.string().optional(),
  activityFrequency: z.string().min(1, { message: "活動頻度は必須です" }),
  activityDays: z.array(z.string()).min(1, { message: "活動曜日は1つ以上選択してください" }),
  activityTimes: z.array(z.string()).min(1, { message: "活動時間帯は1つ以上選択してください" }),
  skillLevel: z.array(z.string()).min(1, { message: "対象レベルは1つ以上選択してください" }),
  fee: z.number().min(0, { message: "月会費は0以上の数値を入力してください" }),
  memberCount: z.number().optional(),
  website: z.string().url().optional().nullable(),
  socialLinks: z.any().optional(),
  facilities: z.array(z.string()).optional(),
  equipments: z.array(z.string()).optional(),
  ageGroups: z.array(z.string()).optional(),
  genderRatio: z.string().optional(),
});

// 型エクスポート
export type UserSchema = z.infer<typeof userSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type CircleSchema = z.infer<typeof circleSchema>;

