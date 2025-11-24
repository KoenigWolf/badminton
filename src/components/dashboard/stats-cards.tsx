import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Trophy, Activity } from "@phosphor-icons/react";

/**
 * 統計カードのデータ型
 */
interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * 統計カードのデータ
 */
const STATS: StatCard[] = [
  {
    title: "今後の試合",
    value: "3",
    description: "今週の予定された試合数",
    icon: Calendar,
  },
  {
    title: "チームメンバー",
    value: "12",
    description: "アクティブなメンバー数",
    icon: Users,
  },
  {
    title: "勝率",
    value: "65%",
    description: "直近10試合の勝率",
    icon: Trophy,
  },
  {
    title: "活動時間",
    value: "24h",
    description: "今週の合計活動時間",
    icon: Activity,
  },
];

/**
 * 統計カードコンポーネント
 */
export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

