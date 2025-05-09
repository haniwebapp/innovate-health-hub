
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, ArrowRight } from "lucide-react";

// Mock activity data - in a real app, this would come from an API
const recentActivities = [
  {
    id: '1',
    type: 'innovation',
    title: 'AI-Powered Diagnostic Tool',
    action: 'submission_viewed',
    timestamp: new Date(2023, 4, 9, 14, 30),
    meta: { views: 12 }
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
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
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
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                <Badge className={`${getActivityBadge(activity.type)} capitalize mt-1`}>
                  {activity.type}
                </Badge>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    You {getActionText(activity.action)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
                <div className="ml-auto">
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
