
import { motion } from "framer-motion";
import { Clock, FileText, Award, Code, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ActivityData } from "./activityTypes";

interface ActivityItemProps {
  activity: ActivityData;
  variants?: any;
}

export function ActivityItem({ activity, variants }: ActivityItemProps) {
  // Helper function to get the appropriate icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'innovation':
        return <Code className="h-4 w-4 text-blue-500" />;
      case 'challenge':
        return <Award className="h-4 w-4 text-amber-500" />;
      case 'knowledge':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'investment':
        return <DollarSign className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  // Helper function to render the action badge
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'submission_viewed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Viewed</Badge>;
      case 'submission_updated':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Updated</Badge>;
      case 'document_downloaded':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Downloaded</Badge>;
      case 'application_started':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Started</Badge>;
      case 'documents_submitted':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Submitted</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  // Helper function to format meta information
  const formatMetaInfo = (meta: Record<string, any>) => {
    if (meta.views) return `${meta.views} views`;
    if (meta.status) return `Status: ${meta.status}`;
    if (meta.format) return `Format: ${meta.format}`;
    if (meta.progress) return `Progress: ${meta.progress}`;
    if (meta.count) return `${meta.count} documents`;
    return '';
  };
  
  return (
    <motion.div 
      className={`p-3 border rounded-lg ${activity.pinned ? 'bg-moh-lightGreen/10 border-moh-green/20' : 'bg-white'}`}
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${activity.pinned ? 'bg-moh-green/10' : 'bg-gray-100'}`}>
            {getActivityIcon(activity.type)}
          </div>
          <div>
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        <div>
          {getActionBadge(activity.action)}
        </div>
      </div>
      {activity.meta && Object.keys(activity.meta).length > 0 && (
        <div className="mt-2 text-xs text-gray-500 flex justify-end">
          {formatMetaInfo(activity.meta)}
        </div>
      )}
    </motion.div>
  );
}
