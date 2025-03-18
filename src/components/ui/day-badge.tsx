import { Badge } from "@/components/ui/badge";

type DayBadgeProps = {
  day: string;
  className?: string;
};

// 曜日ごとにバリアントをマッピング
const dayVariants: Record<string, "primary" | "destructive" | "success" | "warning" | "secondary" | "indigo" | "pink" | "default" | "orange" | "info"> = {
  "月": "primary",
  "火": "destructive",
  "水": "success",
  "木": "warning",
  "金": "secondary",
  "土": "indigo",
  "日": "pink",
  "平日": "default",
  "週末": "orange",
  "毎日": "info",
};

export const DayBadge = ({ day, className }: DayBadgeProps) => {
  const variant = dayVariants[day] || "default";
  
  return (
    <Badge variant={variant} className={className}>
      {day}
    </Badge>
  );
}; 