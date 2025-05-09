
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface AIMatchScore {
  name: string;
  score: number;
  reason: string;
  additionalInfo?: {
    label: string;
    value: string | number;
  }[];
}

interface AIMatchScoreCardProps {
  match: AIMatchScore;
  className?: string;
}

export function AIMatchScoreCard({ match, className = "" }: AIMatchScoreCardProps) {
  // Determine badge color based on score
  const getBadgeColor = (score: number) => {
    if (score > 85) return 'bg-green-500';
    if (score > 75) return 'bg-amber-500';
    return 'bg-gray-500';
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-lg">{match.name}</h4>
        <Badge className={getBadgeColor(match.score)}>
          {match.score}/100
        </Badge>
      </div>
      <p className="text-gray-600 text-sm mb-2">{match.reason}</p>
      
      {match.additionalInfo && match.additionalInfo.length > 0 && (
        <div className="mt-2 text-sm text-gray-500 space-y-1">
          {match.additionalInfo.map((info, index) => (
            <div key={index} className="flex justify-between">
              <span>{info.label}:</span>
              <span className="font-medium">{info.value}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1">Match Score</div>
        <Progress value={match.score} className="h-2" style={{backgroundColor: '#e5e7eb'}} />
      </div>
    </div>
  );
}
