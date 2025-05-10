
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Eye, Award, Users, ArrowUpRight, BarChart, Target, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

// Mock metrics data - in a real app, this would come from an API
const mockMetrics = {
  innovations: {
    count: 3,
    views: 78,
    engagement: 23,
    rating: 4.2,
    trend: 12
  },
  challenges: {
    submitted: 2,
    inProgress: 1,
    accepted: 1,
    completed: 0,
    trend: -5
  },
  profile: {
    completeness: 85,
    matchScore: 72,
    connections: 8,
    trend: 15
  }
};

type MetricItemProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: number | null;
  color?: string;
  animate?: boolean;
};

const MetricItem = ({ 
  icon, 
  value, 
  label, 
  trend = null, 
  color = "text-moh-green",
  animate = true 
}: MetricItemProps) => {
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
};

export default function DashboardMetrics() {
  const innovationMetrics = mockMetrics.innovations;
  const challengeMetrics = mockMetrics.challenges;
  const profileMetrics = mockMetrics.profile;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-moh-green/10 overflow-hidden relative">
        {/* Subtle gradient background effect */}
        <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
        
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-moh-darkGreen">Performance Dashboard</CardTitle>
              <CardDescription>Key metrics and insights</CardDescription>
            </div>
            <BarChart className="h-5 w-5 text-moh-green" />
          </div>
        </CardHeader>
        
        <CardContent className="relative">
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
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item}>
                  <MetricItem 
                    icon={<Award className="h-4 w-4 text-moh-green" />}
                    value={innovationMetrics.count}
                    label="Total Innovations"
                  />
                </motion.div>
                <motion.div variants={item}>
                  <MetricItem 
                    icon={<Eye className="h-4 w-4 text-moh-green" />}
                    value={innovationMetrics.views}
                    label="Total Views"
                    trend={innovationMetrics.trend}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <MetricItem 
                    icon={<Users className="h-4 w-4 text-moh-green" />}
                    value={innovationMetrics.engagement}
                    label="Engagements"
                    trend={5}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <MetricItem 
                    icon={<Target className="h-4 w-4 text-moh-gold" />}
                    value={innovationMetrics.rating.toFixed(1)}
                    label="Average Rating"
                  />
                </motion.div>
              </motion.div>
              
              <div className="pt-2 border-t border-moh-green/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Innovation Growth</span>
                  <span className="text-sm font-medium text-moh-green">+27% this month</span>
                </div>
                <div className="w-full h-2 bg-moh-lightGreen rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-moh-green to-moh-gold"
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="space-y-6">
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
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
