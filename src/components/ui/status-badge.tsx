import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

// ステータスごとにバリアントをマッピング
const statusVariants: Record<string, "default" | "success" | "primary" | "warning" | "destructive" | "info" | "secondary"> = {
  "承認済み": "success",
  "確認中": "warning",
  "却下": "destructive",
  "保留中": "info",
  "完了": "success",
  "進行中": "primary",
  "未対応": "default",
  "新規": "secondary",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariants[status] || "default";
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
} 