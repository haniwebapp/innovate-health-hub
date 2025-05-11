
import { Card } from "@/components/ui/card";
import { Lightbulb, BarChart3, TrendingUp } from "lucide-react";

interface AIInsightsCardProps {
  insights: string[];
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export function AIInsightsCard({ 
  insights, 
  title = "AI Insights", 
  icon = <Lightbulb className="h-5 w-5 text-moh-gold" />,
  className = "",
  bgColor = "bg-moh-lightGreen",
  borderColor = "border-moh-green/30",
  textColor = "text-gray-800"
}: AIInsightsCardProps) {
  if (insights.length === 0) return null;
  
  return (
    <Card className={`p-6 mb-8 border-l-4 ${borderColor} ${bgColor} ${className}`}>
      <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textColor}`}>
        {icon}
        {title}
      </h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className={`flex items-start ${i < insights.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}>
            {i === 0 && <TrendingUp className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />}
            {i === 1 && <BarChart3 className="h-5 w-5 mr-2 text-moh-green mt-0.5 flex-shrink-0" />}
            {i >= 2 && <Lightbulb className="h-5 w-5 mr-2 text-moh-gold mt-0.5 flex-shrink-0" />}
            <p className={`${textColor}`}>{insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
