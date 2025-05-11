
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Pin } from "lucide-react";
import { motion } from "framer-motion";
import { formatTime, getActivityBadge, getActionText } from "./activityUtils";
import { ActivityData } from "./activityTypes";

interface ActivityItemProps {
  activity: ActivityData;
  variants: any;
}

export function ActivityItem({ activity, variants }: ActivityItemProps) {
  return (
    <motion.div 
      variants={variants}
      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
        activity.pinned 
          ? 'bg-moh-glassGreen border border-moh-green/10' 
          : 'border-b hover:bg-moh-glassGreen'
      } last:border-0 group`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Badge className={`${getActivityBadge(activity.type)} capitalize mt-1 shadow-sm`}>
        {activity.type}
      </Badge>
      <div className="space-y-1 flex-grow">
        <p className="text-sm font-medium leading-none flex items-center">
          {activity.title}
          {activity.pinned && (
            <Pin size={12} className="ml-1 text-moh-gold" />
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          You {getActionText(activity.action)}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatTime(activity.timestamp)}</span>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="h-3 w-3 text-moh-green" />
      </div>
    </motion.div>
  );
}
