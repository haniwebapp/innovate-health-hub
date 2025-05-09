
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Eye, Award, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock metrics data - in a real app, this would come from an API
const mockMetrics = {
  innovations: {
    count: 3,
    views: 78,
    engagement: 23,
    rating: 4.2
  },
  challenges: {
    submitted: 2,
    inProgress: 1,
    accepted: 1,
    completed: 0
  },
  profile: {
    completeness: 85,
    matchScore: 72,
    connections: 8
  }
};

const MetricItem = ({ icon, value, label, trend = null, color = "text-moh-green" }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <span className={color}>{value}</span>
        {trend && (
          <span className={`text-xs font-normal flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <ArrowUpRight className={`h-3 w-3 ${trend < 0 ? 'rotate-90' : ''}`} />
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default function DashboardMetrics() {
  const innovationMetrics = mockMetrics.innovations;
  const challengeMetrics = mockMetrics.challenges;
  const profileMetrics = mockMetrics.profile;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Performance Dashboard</CardTitle>
        <CardDescription>Key metrics and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="innovations" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="innovations">Innovations</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="innovations" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}>
                <MetricItem 
                  icon={<Award className="h-4 w-4" />}
                  value={innovationMetrics.count}
                  label="Total Innovations"
                />
              </motion.div>
              <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}>
                <MetricItem 
                  icon={<Eye className="h-4 w-4" />}
                  value={innovationMetrics.views}
                  label="Total Views"
                  trend={12}
                />
              </motion.div>
              <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
                <MetricItem 
                  icon={<Users className="h-4 w-4" />}
                  value={innovationMetrics.engagement}
                  label="Engagements"
                  trend={5}
                />
              </motion.div>
              <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}}>
                <MetricItem 
                  icon={<Award className="h-4 w-4" />}
                  value={innovationMetrics.rating.toFixed(1)}
                  label="Average Rating"
                />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricItem 
                icon={<Award className="h-4 w-4" />}
                value={challengeMetrics.submitted}
                label="Submitted"
              />
              <MetricItem 
                icon={<Eye className="h-4 w-4" />}
                value={challengeMetrics.inProgress}
                label="In Progress"
              />
              <MetricItem 
                icon={<Users className="h-4 w-4" />}
                value={challengeMetrics.accepted}
                label="Accepted"
              />
              <MetricItem 
                icon={<Award className="h-4 w-4" />}
                value={challengeMetrics.completed}
                label="Completed"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completeness</span>
                  <span className="font-medium">{profileMetrics.completeness}%</span>
                </div>
                <Progress value={profileMetrics.completeness} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Match Score</span>
                  <span className="font-medium">{profileMetrics.matchScore}%</span>
                </div>
                <Progress value={profileMetrics.matchScore} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm">Network Connections</span>
                <span className="font-medium">{profileMetrics.connections}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
