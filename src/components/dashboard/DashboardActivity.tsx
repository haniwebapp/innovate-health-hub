
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ActivityCard } from "./activity/ActivityCard";
import { ActivityData } from "./activity/activityTypes";
import { fetchUserActivity } from "@/utils/activityUtils";
import { Loader2 } from "lucide-react";
import { recentActivities } from "./activity/mockData";

export default function DashboardActivity() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setIsLoading(true);
        const data = await fetchUserActivity(undefined, undefined, undefined);
        
        // Convert to ActivityData format for backwards compatibility
        // We'll refactor this later to use the ActivityLog format directly
        const formattedActivities = data.slice(0, 5).map(activity => {
          const details = activity.details?.data || {};
          
          return {
            id: activity.id,
            type: activity.resource_type,
            title: details.title || details.name || 'Activity',
            action: activity.activity_type,
            timestamp: new Date(activity.created_at),
            meta: { 
              views: details.views || 0,
              status: details.status || '',
              format: details.format || '',
              progress: details.progress || ''
            },
            pinned: false
          };
        });
        
        setActivities(formattedActivities);
      } catch (error) {
        console.error("Error loading activities:", error);
        setError("Failed to load activities");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadActivities();
  }, []);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        </div>
      ) : error ? (
        <div className="p-4 text-center">
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">Using mock data as fallback</p>
          <ActivityCard activities={recentActivities} />
        </div>
      ) : (
        <ActivityCard activities={activities.length > 0 ? activities : recentActivities} />
      )}
    </motion.div>
  );
}
