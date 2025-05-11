
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InnovationsMetricsTab } from "./InnovationsMetricsTab";
import { ChallengesMetricsTab } from "./ChallengesMetricsTab";
import { ProfileMetricsTab } from "./ProfileMetricsTab";

type DashboardMetricsTabsProps = {
  metrics: {
    innovations: {
      count: number;
      views: number;
      engagement: number;
      rating: number;
      trend: number;
    };
    challenges: {
      submitted: number;
      inProgress: number;
      accepted: number;
      completed: number;
      trend: number;
    };
    profile: {
      completeness: number;
      matchScore: number;
      connections: number;
      trend: number;
    };
  };
};

export function DashboardMetricsTabs({ metrics }: DashboardMetricsTabsProps) {
  return (
    <Tabs defaultValue="innovations" className="space-y-4">
      <TabsList className="grid grid-cols-3 bg-moh-lightGreen/40 border border-moh-green/10">
        <TabsTrigger 
          value="innovations"
          className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
        >
          Innovations
        </TabsTrigger>
        <TabsTrigger 
          value="challenges"
          className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
        >
          Challenges
        </TabsTrigger>
        <TabsTrigger 
          value="profile"
          className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
        >
          Profile
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="innovations" className="space-y-6">
        <InnovationsMetricsTab innovationMetrics={metrics.innovations} />
      </TabsContent>
      
      <TabsContent value="challenges" className="space-y-6">
        <ChallengesMetricsTab challengeMetrics={metrics.challenges} />
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-4">
        <ProfileMetricsTab profileMetrics={metrics.profile} />
      </TabsContent>
    </Tabs>
  );
}
