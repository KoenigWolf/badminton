import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * 今後の予定コンポーネント
 */
export function UpcomingEvents() {
  const events = [
    { id: 1, title: "練習会 1", date: "2024-03-11 19:00" },
    { id: 2, title: "練習会 2", date: "2024-03-12 19:00" },
    { id: 3, title: "練習会 3", date: "2024-03-13 19:00" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>今後の予定</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <Button variant="outline">詳細</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

