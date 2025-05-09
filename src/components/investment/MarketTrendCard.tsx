
import { Badge } from "@/components/ui/badge";

export interface AIMarketTrend {
  sector: string;
  growth: number;
  confidence: number;
  insight: string;
  timeframe?: string;
  riskLevel?: "low" | "medium" | "high";
}

interface MarketTrendCardProps {
  trend: AIMarketTrend;
  className?: string;
}

export function MarketTrendCard({ trend, className = "" }: MarketTrendCardProps) {
  // Determine growth badge color
  const getGrowthBadgeColor = (growth: number) => {
    if (growth > 30) return 'bg-green-500';
    if (growth > 10) return 'bg-blue-500';
    if (growth > 0) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  // Get risk level color
  const getRiskColor = (risk?: string) => {
    switch(risk) {
      case "low": return "text-green-600";
      case "medium": return "text-amber-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{trend.sector}</h4>
          <p className="text-sm text-gray-600">{trend.insight}</p>
          
          {trend.timeframe && (
            <div className="text-xs text-gray-500 mt-1">Timeframe: {trend.timeframe}</div>
          )}
          
          {trend.riskLevel && (
            <div className={`text-xs font-medium mt-1 ${getRiskColor(trend.riskLevel)}`}>
              Risk Level: {trend.riskLevel.charAt(0).toUpperCase() + trend.riskLevel.slice(1)}
            </div>
          )}
        </div>
        <div className="text-right">
          <Badge className={getGrowthBadgeColor(trend.growth)}>
            {trend.growth > 0 ? '+' : ''}{trend.growth}% Growth
          </Badge>
          <div className="text-xs text-gray-500">Confidence: {trend.confidence}%</div>
        </div>
      </div>
    </div>
  );
}
