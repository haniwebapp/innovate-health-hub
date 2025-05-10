
import { useState, useEffect } from "react";
import { ActivityLog, ActivityType, fetchUserActivity, groupActivitiesByDate } from "@/utils/activityUtils";
import ActivityItem from "./ActivityItem";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityListProps {
  type?: ActivityType;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

const ActivityList = ({
  type = 'all',
  limit = 20,
  startDate,
  endDate,
  onLoadMore,
  isLoadingMore = false,
  hasMore = true
}: ActivityListProps) => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserActivity({ 
          limit, 
          type,
          startDate,
          endDate
        });
        setActivities(data);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(err instanceof Error ? err : new Error('Failed to load activities'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadActivities();
  }, [limit, type, startDate, endDate]);
  
  // Group activities by date
  const groupedActivities = groupActivitiesByDate(activities);
  
  // Format the date heading based on how recent the date is
  const formatDateHeading = (dateKey: string) => {
    const date = new Date(dateKey);
    
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE'); // Day name
    } else if (isThisMonth(date)) {
      return format(date, 'MMMM d'); // Month and day
    } else {
      return format(date, 'MMMM d, yyyy'); // Full date
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-red-500 mb-2">Failed to load activities</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Card>
    );
  }
  
  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-2">No activities found</p>
        <p className="text-sm text-muted-foreground">
          {type === 'all' 
            ? 'You have no recent activity.'
            : `You have no recent ${type} activity.`}
        </p>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {Object.keys(groupedActivities)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((dateKey) => (
          <motion.div 
            key={dateKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-2">
              <div className="text-sm font-semibold bg-muted px-3 py-1 rounded-full">
                {formatDateHeading(dateKey)}
              </div>
              <div className="ml-2 text-xs text-muted-foreground">
                {groupedActivities[dateKey].length} activities
              </div>
            </div>
            
            <Card>
              <div className="divide-y divide-muted">
                {groupedActivities[dateKey].map((activity, index) => (
                  <ActivityItem 
                    key={activity.id}
                    activity={activity}
                    isLast={index === groupedActivities[dateKey].length - 1}
                    showTimeOnly={true}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-muted-foreground border-t-transparent mr-2"></span>
                Loading...
              </span>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Load more
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
