
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface AIMatchScore {
  name: string;
  score: number;
  reason: string;
}

interface AIMatchScoreCardProps {
  match: AIMatchScore;
}

export function AIMatchScoreCard({ match }: AIMatchScoreCardProps) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-lg">{match.name}</h4>
        <Badge className={match.score > 85 ? 'bg-green-500' : match.score > 75 ? 'bg-amber-500' : 'bg-gray-500'}>
          {match.score}/100
        </Badge>
      </div>
      <p className="text-gray-600 text-sm mb-2">{match.reason}</p>
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1">Match Score</div>
        <Progress value={match.score} className="h-2" style={{backgroundColor: '#e5e7eb'}} />
      </div>
    </div>
  );
}
