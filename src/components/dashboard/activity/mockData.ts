
import { ActivityData } from "./activityTypes";

// Mock activity data - in a real app, this would come from an API
export const recentActivities: ActivityData[] = [
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
