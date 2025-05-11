
import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export type MetricItemProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: number | null;
  color?: string;
  animate?: boolean;
};

export function MetricItem({ 
  icon, 
  value, 
  label, 
  trend = null, 
  color = "text-moh-green",
  animate = true 
}: MetricItemProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${animate ? 'animate-fade-in' : ''}`}>
      <div className="flex items-center gap-2">
        <span className={`text-2xl font-semibold ${color}`}>{value}</span>
        {trend !== null && (
          <span className={`text-xs font-normal flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3 mr-0.5" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <div className="p-1 bg-moh-glassGreen rounded">
          {icon}
        </div>
        <span>{label}</span>
      </div>
    </div>
  );
}
