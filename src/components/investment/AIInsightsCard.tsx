
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface AIInsightsCardProps {
  insights: string[];
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export function AIInsightsCard({ 
  insights, 
  title = "AI Insights", 
  icon = <Lightbulb className="h-5 w-5 text-yellow-500" />,
  className = "",
  borderColor = "border-l-yellow-400",
  backgroundColor = "bg-yellow-50"
}: AIInsightsCardProps) {
  if (insights.length === 0) return null;
  
  return (
    <Card className={`p-6 mb-8 border-l-4 ${borderColor} ${backgroundColor} ${className}`}>
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <p key={i} className="text-gray-700">{insight}</p>
        ))}
      </div>
    </Card>
  );
}
