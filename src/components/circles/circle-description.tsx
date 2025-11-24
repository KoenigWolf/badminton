import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Globe, Instagram, Facebook, Twitter, ExternalLink } from "lucide-react";

/**
 * サークル情報の型定義
 */
interface Circle {
  description: string;
  activityDays: string[];
  activityTimes: string[];
  facilities: string[];
  memberCount: number;
  genderRatio: string;
  skillLevel: string[];
  ageGroups: string[];
  fee: number;
  equipments: string[];
  website?: string | null;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  } | null;
}

interface CircleDescriptionProps {
  circle: Circle;
}

/**
 * 外部リンクアイテムコンポーネント
 */
function ExternalLinkItem({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: React.ComponentType<{ size: number }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      <Icon size={16} />
      <span>{label}</span>
      <ExternalLink size={12} />
    </a>
  );
}

/**
 * 情報アイテムコンポーネント
 */
function InfoItem({
  Icon,
  title,
  content,
}: {
  Icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  content: string;
}) {
  return (
    <div className="flex items-start">
      <Icon className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2" size={18} />
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-gray-600 dark:text-gray-400">{content}</p>
      </div>
    </div>
  );
}

/**
 * サークル説明コンポーネント
 */
export function CircleDescription({ circle }: CircleDescriptionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      {/* サークル紹介 */}
      <h2 className="text-xl font-bold mb-4 dark:text-white">サークル紹介</h2>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
        {circle.description}
      </p>

      {/* 活動情報 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">活動情報</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoItem
          Icon={Calendar}
          title="活動日"
          content={circle.activityDays.join("・")}
        />
        <InfoItem
          Icon={Clock}
          title="活動時間"
          content={circle.activityTimes.join("、")}
        />
        <InfoItem
          Icon={MapPin}
          title="活動場所"
          content={circle.facilities.join("、")}
        />
        <InfoItem
          Icon={Users}
          title="メンバー"
          content={`現在${circle.memberCount}名（${circle.genderRatio}）`}
        />
      </div>

      {/* 対象レベル・年齢層 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">対象レベル・年齢層</h3>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {circle.skillLevel.map((level) => (
            <span
              key={level}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {level}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          主な年齢層： {circle.ageGroups.join("、")}
        </p>
      </div>

      {/* 参加費・設備 */}
      <h3 className="text-lg font-bold mb-3 dark:text-white">参加費・設備</h3>
      <div className="mb-6">
        <p className="font-medium text-gray-900 dark:text-white mb-2">
          月会費: {circle.fee.toLocaleString()}円
        </p>
        <div className="flex flex-wrap gap-2">
          {circle.equipments.map((equipment) => (
            <span
              key={equipment}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >
              {equipment}
            </span>
          ))}
        </div>
      </div>

      {/* 公式サイト・SNS */}
      {(circle.website || circle.socialLinks) && (
        <div>
          <h3 className="text-lg font-bold mb-3 dark:text-white">
            公式サイト・SNS
          </h3>
          <div className="flex flex-wrap gap-3">
            {circle.website && (
              <ExternalLinkItem
                href={circle.website}
                Icon={Globe}
                label="公式サイト"
              />
            )}
            {circle.socialLinks?.twitter && (
              <ExternalLinkItem
                href={circle.socialLinks.twitter}
                Icon={Twitter}
                label="Twitter"
              />
            )}
            {circle.socialLinks?.instagram && (
              <ExternalLinkItem
                href={circle.socialLinks.instagram}
                Icon={Instagram}
                label="Instagram"
              />
            )}
            {circle.socialLinks?.facebook && (
              <ExternalLinkItem
                href={circle.socialLinks.facebook}
                Icon={Facebook}
                label="Facebook"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

