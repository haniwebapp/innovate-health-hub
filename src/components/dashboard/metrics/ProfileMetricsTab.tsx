
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ProfileMetricsProps = {
  profileMetrics: {
    completeness: number;
    matchScore: number;
    connections: number;
    trend: number;
  };
};

export function ProfileMetricsTab({ profileMetrics }: ProfileMetricsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Profile Completeness</span>
          <span className="font-medium text-moh-green">{profileMetrics.completeness}%</span>
        </div>
        <Progress 
          value={profileMetrics.completeness} 
          className="h-2"
          indicatorClassName="bg-gradient-to-r from-moh-green to-moh-darkGreen"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>AI Match Score</span>
          <span className="font-medium text-moh-gold">{profileMetrics.matchScore}%</span>
        </div>
        <Progress 
          value={profileMetrics.matchScore} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-moh-gold to-moh-darkGold"
        />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm">Network Connections</span>
        <div className="flex items-center">
          <span className="font-medium mr-2">{profileMetrics.connections}</span>
          <span className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            {profileMetrics.trend}%
          </span>
        </div>
      </div>
    </div>
  );
}
