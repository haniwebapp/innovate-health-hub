
import { ReactNode } from 'react';
import { format } from 'date-fns';
import { ActivityLog, groupActivitiesByDate } from '@/utils/activityUtils';
import ActivityItem from './ActivityItem';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ActivityListProps {
  activities: ActivityLog[];
}

const ActivityList = ({ activities }: ActivityListProps) => {
  const groupedActivities = groupActivitiesByDate(activities);
  
  return (
    <div className="space-y-6">
      {groupedActivities.map(({ date, activities }, groupIndex) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="py-2 bg-gray-50">
              <CardTitle className="text-sm font-medium">
                {formatDateHeader(date)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {activities.map((activity, i) => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity} 
                  isLast={i === activities.length - 1}
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Helper function to format date headers
const formatDateHeader = (dateString: string): ReactNode => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return <span>Today <span className="text-xs text-muted-foreground font-normal ml-2">{format(date, 'EEEE, MMMM d')}</span></span>;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return <span>Yesterday <span className="text-xs text-muted-foreground font-normal ml-2">{format(date, 'EEEE, MMMM d')}</span></span>;
  } else {
    return format(date, 'EEEE, MMMM d');
  }
};

export default ActivityList;
