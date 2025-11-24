import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * 最近の試合結果コンポーネント
 */
export function RecentMatches() {
  const matches = [
    { id: 1, opponent: "対戦相手 1", date: "2024-03-1 14:00", won: false },
    { id: 2, opponent: "対戦相手 2", date: "2024-03-2 14:00", won: true },
    { id: 3, opponent: "対戦相手 3", date: "2024-03-3 14:00", won: false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の試合結果</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{match.opponent}</p>
                <p className="text-sm text-muted-foreground">{match.date}</p>
              </div>
              <Button variant={match.won ? "default" : "destructive"}>
                {match.won ? "勝利" : "敗北"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

