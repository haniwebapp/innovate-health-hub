
import { motion } from "framer-motion";
import { ActivityItem } from "./ActivityItem";
import { ActivityData } from "./activityTypes";

interface ActivityListProps {
  activities: ActivityData[];
  container?: any; // Animation variants
}

export function ActivityList({ activities, container = {} }: ActivityListProps) {
  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {activities.map((activity) => (
        <ActivityItem 
          key={activity.id} 
          activity={activity}
          variants={item} 
        />
      ))}
    </motion.div>
  );
}
