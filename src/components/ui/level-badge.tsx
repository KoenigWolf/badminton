import { Badge } from "@/components/ui/badge";

type LevelBadgeProps = {
  level: string;
  className?: string;
};

// レベルごとにバリアントをマッピング
const levelVariants: Record<string, "default" | "success" | "primary" | "warning" | "orange" | "destructive" | "secondary"> = {
  "初心者": "success",
  "初級者": "primary",
  "中級者": "warning",
  "上級者": "orange",
  "全国大会レベル": "destructive",
  "プロ": "secondary",
  "すべて": "default",
};

export const LevelBadge = ({ level, className }: LevelBadgeProps) => {
  const variant = levelVariants[level] || "default";
  
  return (
    <Badge variant={variant} className={className}>
      {level}
    </Badge>
  );
}; 