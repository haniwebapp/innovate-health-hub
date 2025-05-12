
import { Badge } from "@/components/ui/badge";

interface RiskLevelBadgeProps {
  level: string;
}

export const RiskLevelBadge = ({ level }: RiskLevelBadgeProps) => {
  const riskStyles = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const style = riskStyles[level as keyof typeof riskStyles] || 'bg-gray-100 text-gray-800';
  
  return (
    <Badge className={style} variant="outline">
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  );
};
