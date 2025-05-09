
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface AIInsightsCardProps {
  insights: string[];
}

export function AIInsightsCard({ insights }: AIInsightsCardProps) {
  if (insights.length === 0) return null;
  
  return (
    <Card className="p-6 mb-8 border-l-4 border-l-yellow-400 bg-yellow-50">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        AI Insights
      </h3>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <p key={i} className="text-gray-700">{insight}</p>
        ))}
      </div>
    </Card>
  );
}
