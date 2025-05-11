
import { format, formatDistanceToNow } from "date-fns";
import { ActivityLog, formatActivityDetails } from "@/utils/activityUtils";
import { Activity, Book, Calendar, Lightbulb, Shield, TrendingUp, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActivityItemProps {
  activity: ActivityLog;
  isLast?: boolean;
  showTimeOnly?: boolean;
  variants?: any;
}

const ActivityItem = ({ activity, isLast = false, showTimeOnly = false, variants }: ActivityItemProps) => {
  const { title, description, icon, color } = formatActivityDetails(activity);
  const date = new Date(activity.created_at);
  
  // Get the appropriate icon based on the activity type
  const getIcon = () => {
    switch (icon) {
      case 'lightbulb':
        return <Lightbulb className={cn("h-4 w-4", color)} />;
      case 'trophy':
        return <Trophy className={cn("h-4 w-4", color)} />;
      case 'trending-up':
        return <TrendingUp className={cn("h-4 w-4", color)} />;
      case 'shield':
        return <Shield className={cn("h-4 w-4", color)} />;
      case 'book-open':
        return <Book className={cn("h-4 w-4", color)} />;
      case 'calendar':
        return <Calendar className={cn("h-4 w-4", color)} />;
      default:
        return <Activity className={cn("h-4 w-4", color)} />;
    }
  };
  
  // Generate link based on resource type and ID
  const generateResourceLink = () => {
    switch (activity.resource_type) {
      case 'innovation':
        return `/innovations/${activity.resource_id}`;
      case 'challenge':
        return `/challenges/${activity.resource_id}`;
      case 'investment':
        return `/dashboard/investment/opportunities/${activity.resource_id}`;
      case 'regulatory':
        return `/dashboard/regulatory/applications/${activity.resource_id}`;
      case 'knowledge':
        return `/dashboard/knowledge/resources/${activity.resource_id}`;
      default:
        return '#';
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "flex gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors",
        !isLast && "border-b border-dashed border-muted"
      )}
      variants={variants}
      initial={variants ? "hidden" : { opacity: 0, y: 10 }}
      animate={variants ? "show" : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-1">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", 
          activity.resource_type === 'innovation' && "bg-moh-lightGreen",
          activity.resource_type === 'challenge' && "bg-amber-100",
          activity.resource_type === 'investment' && "bg-blue-100",
          activity.resource_type === 'regulatory' && "bg-purple-100",
          activity.resource_type === 'knowledge' && "bg-indigo-100",
          activity.resource_type === 'other' && "bg-gray-100"
        )}>
          {getIcon()}
        </div>
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">
            <Link 
              to={generateResourceLink()} 
              className="hover:text-moh-green transition-colors hover:underline"
            >
              {title}
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            {showTimeOnly 
              ? format(date, 'h:mm a') 
              : formatDistanceToNow(date, { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
