
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { ActivityList } from "./ActivityList";
import { ActivityData } from "./activityTypes";
import { sortActivities } from "./activityUtils";
import { recentActivities } from "./mockData";

interface ActivityCardProps {
  activities: ActivityData[];
}

export function ActivityCard({ activities }: ActivityCardProps) {
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

  // Sort activities with pinned items first and by date
  // Use provided activities or fall back to mock data if empty array is provided
  const sortedActivities = sortActivities(activities.length > 0 ? activities : recentActivities);

  return (
    <Card className="h-full border-moh-green/10 overflow-hidden relative">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <div>
          <CardTitle className="text-lg font-medium text-moh-darkGreen">Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </div>
        <Activity className="h-4 w-4 text-moh-green" />
      </CardHeader>
      <CardContent className="relative">
        <ScrollArea className="h-[320px] pr-4">
          <ActivityList activities={sortedActivities} container={container} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
