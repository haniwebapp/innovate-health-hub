
import { Award, Eye, Users } from "lucide-react";
import { MetricItem } from "./MetricItem";

type ChallengesMetricsProps = {
  challengeMetrics: {
    submitted: number;
    inProgress: number;
    accepted: number;
    completed: number;
    trend: number;
  };
};

export function ChallengesMetricsTab({ challengeMetrics }: ChallengesMetricsProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricItem 
          icon={<Award className="h-4 w-4 text-blue-600" />}
          value={challengeMetrics.submitted}
          label="Submitted"
          color="text-blue-600"
          animate={false}
        />
        <MetricItem 
          icon={<Eye className="h-4 w-4 text-amber-600" />}
          value={challengeMetrics.inProgress}
          label="In Progress"
          color="text-amber-600"
          trend={challengeMetrics.trend}
          animate={false}
        />
        <MetricItem 
          icon={<Users className="h-4 w-4 text-green-600" />}
          value={challengeMetrics.accepted}
          label="Accepted"
          color="text-green-600"
          animate={false}
        />
        <MetricItem 
          icon={<Award className="h-4 w-4 text-purple-600" />}
          value={challengeMetrics.completed}
          label="Completed"
          color="text-purple-600"
          animate={false}
        />
      </div>
      
      <div className="pt-2 border-t border-moh-green/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Challenge Participation</span>
          <span className="text-sm font-medium text-amber-600">Active in 1/2</span>
        </div>
        <div className="w-full h-2 bg-moh-lightGreen rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 w-1/2" />
        </div>
      </div>
    </>
  );
}
