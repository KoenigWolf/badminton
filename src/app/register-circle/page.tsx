"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, Upload, AlertCircle, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// バリデーションスキーマ
const registerCircleSchema = z.object({
  name: z.string().min(2, { message: "サークル名は2文字以上で入力してください" }),
  description: z.string().min(20, { message: "説明は20文字以上で入力してください" }),
  prefecture: z.string().min(1, { message: "都道府県を選択してください" }),
  city: z.string().min(1, { message: "市区町村を入力してください" }),
  address: z.string().optional(),
  activityFrequency: z.string().min(1, { message: "活動頻度を入力してください" }),
  activityDays: z.array(z.string()).min(1, { message: "活動曜日を選択してください" }),
  fee: z.number().min(0, { message: "0以上の数値を入力してください" }),
  skillLevels: z.array(z.string()).min(1, { message: "対象レベルを選択してください" }),
  facilities: z.array(z.string()).min(1, { message: "活動場所を入力してください" }),
  acceptTerms: z.boolean().refine(val => val === true, { message: "利用規約に同意する必要があります" }),
});

type RegisterCircleFormValues = z.infer<typeof registerCircleSchema>;

// 都道府県データ
const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

// 曜日データ
const DAYS_OF_WEEK = [
  { id: "monday", label: "月曜日" },
  { id: "tuesday", label: "火曜日" },
  { id: "wednesday", label: "水曜日" },
  { id: "thursday", label: "木曜日" },
  { id: "friday", label: "金曜日" },
  { id: "saturday", label: "土曜日" },
  { id: "sunday", label: "日曜日" },
];

// スキルレベル
const SKILL_LEVELS = [
  { id: "beginner", label: "初心者歓迎" },
  { id: "intermediate", label: "中級者向け" },
  { id: "advanced", label: "上級者向け" },
];

export default function RegisterCirclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
  const [facilities, setFacilities] = useState<string[]>(['']);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterCircleFormValues>({
    resolver: zodResolver(registerCircleSchema),
    defaultValues: {
      name: "",
      description: "",
      prefecture: "",
      city: "",
      address: "",
      activityFrequency: "",
      activityDays: [],
      fee: 0,
      skillLevels: [],
      facilities: [],
      acceptTerms: false,
    },
  });

  // 施設入力フィールド追加
  const addFacilityField = () => {
    setFacilities([...facilities, '']);
  };

  // 施設入力フィールド削除
  const removeFacilityField = (index: number) => {
    if (facilities.length > 1) {
      const newFacilities = [...facilities];
      newFacilities.splice(index, 1);
      setFacilities(newFacilities);
    }
  };

  // 施設入力値更新
  const updateFacility = (index: number, value: string) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
    setValue('facilities', newFacilities.filter(f => f !== ''));
  };

  // 画像アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // 最大5枚までの制限
      if (images.length + newFiles.length > 5) {
        alert('画像は最大5枚までアップロードできます');
        return;
      }
      
      // プレビュー用のURLを生成
      const newImages = newFiles.map(file => ({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages([...images, ...newImages]);
    }
  };

  // 画像削除
  const removeImage = (id: string) => {
    const newImages = images.filter(img => img.id !== id);
    setImages(newImages);
  };

  // フォーム送信
  const onSubmit = async (data: RegisterCircleFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 施設情報の更新
      data.facilities = facilities.filter(f => f !== '');
      
      // 画像ファイルの追加
      const formData = new FormData();
      for (const key in data) {
        if (key === 'activityDays' || key === 'skillLevels' || key === 'facilities') {
          formData.append(key, JSON.stringify(data[key as keyof RegisterCircleFormValues]));
        } else {
          formData.append(key, String(data[key as keyof RegisterCircleFormValues]));
        }
      }
      
      // 画像添付
      images.forEach((image, index) => {
        formData.append(`image-${index}`, image.file);
      });

      // ここでAPIリクエストを行う（実際のアプリ構築時に実装）
      // const response = await fetch('/api/circles', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) throw new Error('サークル登録に失敗しました');
      
      console.log('送信データ:', data);
      console.log('画像:', images);
      
      // 成功時の処理 - 一時的にTimeoutで成功をシミュレート
      setTimeout(() => {
        router.push('/register-circle/success');
      }, 1500);
      
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('予期せぬエラーが発生しました');
      }
      setIsSubmitting(false);
    }
  };

  // 下書き保存
  const saveDraft = () => {
    // ローカルストレージに下書きとして保存する実装（実際のアプリ構築時に実装）
    alert('下書き保存機能は現在開発中です');
  };

  // 曜日選択のトグル
  const toggleDay = (day: string) => {
    const currentDays = watch('activityDays') || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    setValue('activityDays', newDays);
  };

  // レベル選択のトグル
  const toggleLevel = (level: string) => {
    const currentLevels = watch('skillLevels') || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter(l => l !== level)
      : [...currentLevels, level];
    setValue('skillLevels', newLevels);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* ページヘッダー */}
          <div className="mb-8">
            <div className="flex items-center text-sm mb-3">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                ホーム
              </Link>
              <ChevronRight className="mx-1 text-gray-400" size={14} />
              <span className="text-gray-900 dark:text-white">サークル登録</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              サークルを登録する
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              あなたのバドミントンサークルを登録して、新しいメンバーと出会いましょう。
              すべての必須項目（<span className="text-red-500">*</span>）を入力してください。
            </p>
          </div>

          {/* エラーメッセージ */}
          {submitError && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 mt-0.5" size={18} />
              <div>
                <p className="font-medium">送信エラー</p>
                <p>{submitError}</p>
              </div>
            </div>
          )}

          {/* 登録フォーム */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-6 dark:text-white">基本情報</h2>

              {/* サークル名 */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  サークル名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full rounded-md border ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                  placeholder="例：渋谷バドミントンクラブ"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* 説明 */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  サークル説明 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className={`w-full rounded-md border ${
                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                  placeholder="活動内容や雰囲気、サークルの特徴などを詳しく記入してください"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>
                )}
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
                  最低20文字以上の説明を入力してください
                </p>
              </div>

              {/* 活動場所 */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  活動場所 <span className="text-red-500">*</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* 都道府県 */}
                  <div>
                    <label htmlFor="prefecture" className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
                      都道府県
                    </label>
                    <select
                      id="prefecture"
                      className={`w-full rounded-md border ${
                        errors.prefecture ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                      {...register('prefecture')}
                      aria-label="都道府県"
                    >
                      <option value="">選択してください</option>
                      {PREFECTURES.map((pref) => (
                        <option key={pref} value={pref}>
                          {pref}
                        </option>
                      ))}
                    </select>
                    {errors.prefecture && (
                      <p className="mt-1 text-red-500 text-sm">{errors.prefecture.message}</p>
                    )}
                  </div>

                  {/* 市区町村 */}
                  <div>
                    <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
                      市区町村
                    </label>
                    <input
                      type="text"
                      id="city"
                      className={`w-full rounded-md border ${
                        errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                      placeholder="例：渋谷区"
                      {...register('city')}
                    />
                    {errors.city && (
                      <p className="mt-1 text-red-500 text-sm">{errors.city.message}</p>
                    )}
                  </div>
                </div>

                {/* 住所 */}
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
                    詳細住所（任意）
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                    placeholder="例：神南1-1-1"
                    {...register('address')}
                  />
                  <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
                    ※プライバシーを考慮し、詳細住所は公開しない設定も可能です
                  </p>
                </div>

                {/* 活動施設 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
                    活動施設・体育館名
                  </label>
                  
                  {facilities.map((facility, index) => (
                    <div key={`facility-${index}`} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={facility}
                        onChange={(e) => updateFacility(index, e.target.value)}
                        className="flex-grow rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                        placeholder="例：渋谷区スポーツセンター"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFacilityField(index)}
                          className="p-2 text-gray-500 hover:text-red-500"
                          aria-label="削除"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addFacilityField}
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Plus size={16} className="mr-1" />
                    <span>活動場所を追加</span>
                  </button>
                  
                  {errors.facilities && (
                    <p className="mt-1 text-red-500 text-sm">{errors.facilities.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 活動情報 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-6 dark:text-white">活動情報</h2>

              {/* 活動頻度 */}
              <div className="mb-6">
                <label htmlFor="activityFrequency" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  活動頻度 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="activityFrequency"
                  className={`w-full rounded-md border ${
                    errors.activityFrequency ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                  placeholder="例：週2回、月3回など"
                  {...register('activityFrequency')}
                />
                {errors.activityFrequency && (
                  <p className="mt-1 text-red-500 text-sm">{errors.activityFrequency.message}</p>
                )}
              </div>

              {/* 活動曜日 */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  主な活動曜日 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <label
                      key={day.id}
                      className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        watch('activityDays')?.includes(day.id)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={day.id}
                        checked={watch('activityDays')?.includes(day.id)}
                        onChange={() => toggleDay(day.id)}
                        className="sr-only"
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
                {errors.activityDays && (
                  <p className="mt-1 text-red-500 text-sm">{errors.activityDays.message}</p>
                )}
              </div>

              {/* 対象レベル */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  対象レベル <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILL_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        watch('skillLevels')?.includes(level.id)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={level.id}
                        checked={watch('skillLevels')?.includes(level.id)}
                        onChange={() => toggleLevel(level.id)}
                        className="sr-only"
                      />
                      {level.label}
                    </label>
                  ))}
                </div>
                {errors.skillLevels && (
                  <p className="mt-1 text-red-500 text-sm">{errors.skillLevels.message}</p>
                )}
              </div>

              {/* 会費 */}
              <div className="mb-6">
                <label htmlFor="fee" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  月会費 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="fee"
                    className={`w-full max-w-xs rounded-md border ${
                      errors.fee ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
                    min="0"
                    step="100"
                    placeholder="例：3000"
                    {...register('fee', { valueAsNumber: true })}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">円 / 月</span>
                </div>
                {errors.fee && (
                  <p className="mt-1 text-red-500 text-sm">{errors.fee.message}</p>
                )}
              </div>
            </div>

            {/* 画像アップロード */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-6 dark:text-white">
                サークル写真（任意）
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                サークルの雰囲気や活動の様子がわかる写真をアップロードしてください。
                最大5枚までアップロードできます。
              </p>

              {/* 画像プレビュー */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={img.preview}
                          alt="アップロード画像プレビュー"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                        aria-label="画像を削除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* アップロードボタン */}
              <div className="mb-4">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <Upload className="text-gray-400 mb-2" size={28} />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      クリックして写真をアップロード
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      PNG, JPG, GIF（最大5MB）
                    </p>
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* 利用規約同意 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  className="mt-1 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-900"
                  {...register('acceptTerms')}
                />
                <label
                  htmlFor="acceptTerms"
                  className={`ml-2 block text-gray-700 dark:text-gray-300 ${
                    errors.acceptTerms ? 'text-red-500' : ''
                  }`}
                >
                  <span className="font-medium">利用規約と個人情報の取り扱いに同意します</span>
                  <span className="text-red-500"> *</span>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                    サークルを登録することで、
                    <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                      利用規約
                    </Link>
                    および
                    <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                      プライバシーポリシー
                    </Link>
                    に同意したものとみなされます。
                  </p>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="mt-1 ml-6 text-red-500 text-sm">{errors.acceptTerms.message}</p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={saveDraft}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                下書き保存
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? '送信中...' : 'サークルを登録する'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 