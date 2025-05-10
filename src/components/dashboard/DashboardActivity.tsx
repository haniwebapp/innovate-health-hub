
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, ArrowRight, Clock, Pin } from "lucide-react";
import { motion } from "framer-motion";

// Mock activity data - in a real app, this would come from an API
const recentActivities = [
  {
    id: '1',
    type: 'innovation',
    title: 'AI-Powered Diagnostic Tool',
    action: 'submission_viewed',
    timestamp: new Date(2023, 4, 9, 14, 30),
    meta: { views: 12 },
    pinned: true
  },
  {
    id: '2',
    type: 'challenge',
    title: 'Maternal Health Challenge',
    action: 'submission_updated',
    timestamp: new Date(2023, 4, 8, 10, 15),
    meta: { status: 'Under Review' }
  },
  {
    id: '3',
    type: 'knowledge',
    title: 'Healthcare Policy Guidelines',
    action: 'document_downloaded',
    timestamp: new Date(2023, 4, 7, 16, 45),
    meta: { format: 'PDF' }
  },
  {
    id: '4',
    type: 'investment',
    title: 'Series A Funding Application',
    action: 'application_started',
    timestamp: new Date(2023, 4, 6, 9, 20),
    meta: { progress: '30%' }
  },
  {
    id: '5',
    type: 'regulatory',
    title: 'Medical Device Approval',
    action: 'documents_submitted',
    timestamp: new Date(2023, 4, 5, 11, 10),
    meta: { count: 3 }
  }
];

// Helper function to format timestamps
const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  
  if (diff < minute) {
    return 'Just now';
  } else if (diff < hour) {
    const mins = Math.floor(diff / minute);
    return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diff < 7 * day) {
    const days = Math.floor(diff / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
};

// Helper function to get activity badges
const getActivityBadge = (type: string) => {
  const badges = {
    'innovation': 'bg-moh-lightGreen text-moh-darkGreen',
    'challenge': 'bg-blue-100 text-blue-800',
    'knowledge': 'bg-purple-100 text-purple-800',
    'investment': 'bg-amber-100 text-amber-800',
    'regulatory': 'bg-red-100 text-red-800'
  };
  
  return badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800';
};

// Helper function to get readable action text
const getActionText = (action: string) => {
  const actions = {
    'submission_viewed': 'viewed your submission',
    'submission_updated': 'updated submission status',
    'document_downloaded': 'downloaded document',
    'application_started': 'started an application',
    'documents_submitted': 'submitted documents'
  };
  
  return actions[action as keyof typeof actions] || action;
};

export default function DashboardActivity() {
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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

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
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                variants={item}
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
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
