
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, LineChart, ArrowRight } from "lucide-react";

export interface AIMarketTrend {
  category: string;
  title: string;
  description: string;
  trend: "increasing" | "rapidly-increasing" | "steady" | "decreasing" | "rapidly-decreasing";
  data: number[];
}

interface MarketTrendCardProps {
  trend: AIMarketTrend;
  className?: string;
}

export function MarketTrendCard({ trend, className = "" }: MarketTrendCardProps) {
  const getTrendBadge = () => {
    switch (trend.trend) {
      case "rapidly-increasing":
        return <Badge className="bg-green-500 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Strong Growth</Badge>;
      case "increasing":
        return <Badge className="bg-green-400 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Growing</Badge>;
      case "steady":
        return <Badge className="bg-blue-500 flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Stable</Badge>;
      case "decreasing":
        return <Badge className="bg-amber-500 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Declining</Badge>;
      case "rapidly-decreasing":
        return <Badge className="bg-red-500 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Rapid Decline</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };
  
  // Determine chart line color based on trend
  const getChartLineColor = () => {
    switch (trend.trend) {
      case "rapidly-increasing":
        return "#22c55e"; // green-500
      case "increasing":
        return "#4ade80"; // green-400
      case "steady":
        return "#3b82f6"; // blue-500
      case "decreasing":
        return "#f59e0b"; // amber-500
      case "rapidly-decreasing":
        return "#ef4444"; // red-500
      default:
        return "#6b7280"; // gray-500
    }
  };
  
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-gray-500">{trend.category}</span>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {trend.title}
          </h3>
        </div>
        <div>{getTrendBadge()}</div>
      </div>
      
      <div className="flex items-end h-32 mb-4 border-b border-gray-100 pb-4">
        {trend.data.map((value, index) => (
          <div 
            key={index} 
            className="flex-1 flex justify-center"
            style={{ height: `${value}%` }}
          >
            <div 
              className="w-full max-w-[30px] rounded-t transition-all duration-300"
              style={{ 
                height: '100%', 
                backgroundColor: getChartLineColor(),
                opacity: 0.2 + (index / (trend.data.length - 1)) * 0.8
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span>Q1 2024</span>
        <span>Q2 2025</span>
      </div>
      
      <div className="flex items-center mb-3">
        <LineChart className="h-4 w-4 mr-1.5 text-purple-600" />
        <p className="text-sm text-gray-700">{trend.description}</p>
      </div>
    </Card>
  );
}
