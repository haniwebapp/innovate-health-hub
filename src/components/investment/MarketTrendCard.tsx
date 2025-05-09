
import { Badge } from "@/components/ui/badge";

export interface AIMarketTrend {
  sector: string;
  growth: number;
  confidence: number;
  insight: string;
}

interface MarketTrendCardProps {
  trend: AIMarketTrend;
}

export function MarketTrendCard({ trend }: MarketTrendCardProps) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{trend.sector}</h4>
          <p className="text-sm text-gray-600">{trend.insight}</p>
        </div>
        <div className="text-right">
          <Badge className="bg-blue-500 mb-1">+{trend.growth}% Growth</Badge>
          <div className="text-xs text-gray-500">Confidence: {trend.confidence}%</div>
        </div>
      </div>
    </div>
  );
}
