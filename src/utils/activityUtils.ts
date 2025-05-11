
import { supabase } from '@/integrations/supabase/client';
import { LucideIcon } from 'lucide-react';

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  resource_type: string;
  resource_id: string;
  details?: any;
  created_at: string;
}

export interface GroupedActivities {
  date: string;
  activities: ActivityLog[];
}

// Fetch user activity logs with optional filters
export async function fetchUserActivity(
  resourceType?: string, 
  startDate?: Date, 
  endDate?: Date
): Promise<ActivityLog[]> {
  try {
    let query = supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', supabase.auth.getSession().then(({ data }) => data.session?.user.id))
      .order('created_at', { ascending: false });
    
    // Apply filters if provided
    if (resourceType) {
      query = query.eq('resource_type', resourceType);
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    if (endDate) {
      // Add one day to include the entire end date
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query = query.lt('created_at', nextDay.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching activity logs:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error: any) {
    console.error('Error in fetchUserActivity:', error);
    throw new Error(error.message || 'Failed to fetch activity logs');
  }
}

// Get count of activities with optional filter
export async function getActivityCount(resourceType?: string): Promise<number> {
  try {
    let query = supabase
      .from('activity_logs')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', supabase.auth.getSession().then(({ data }) => data.session?.user.id));
    
    if (resourceType) {
      query = query.eq('resource_type', resourceType);
    }
    
    const { count, error } = await query;
    
    if (error) {
      console.error('Error counting activity logs:', error);
      throw new Error(error.message);
    }
    
    return count || 0;
  } catch (error: any) {
    console.error('Error in getActivityCount:', error);
    return 0;
  }
}

// Group activities by date for display
export function groupActivitiesByDate(activities: ActivityLog[]): GroupedActivities[] {
  const grouped: { [date: string]: ActivityLog[] } = {};
  
  activities.forEach(activity => {
    const date = new Date(activity.created_at).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
  });
  
  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(date => ({
      date,
      activities: grouped[date],
    }));
}

// Format activity details for display
export function formatActivityDetails(activity: ActivityLog): {
  title: string;
  description: string;
  icon: string;
  color: string;
} {
  const defaultResult = {
    title: 'Activity',
    description: `You interacted with a ${activity.resource_type}`,
    icon: 'activity',
    color: 'text-gray-500',
  };
  
  try {
    switch (activity.resource_type) {
      case 'innovation':
        return {
          title: activity.details?.data?.title || 'Innovation',
          description: formatActionText(activity.activity_type, 'innovation'),
          icon: 'lightbulb',
          color: 'text-moh-green',
        };
      case 'challenge':
        return {
          title: activity.details?.data?.title || 'Challenge',
          description: formatActionText(activity.activity_type, 'challenge'),
          icon: 'trophy',
          color: 'text-amber-500',
        };
      case 'investment':
        return {
          title: activity.details?.data?.name || 'Investment',
          description: formatActionText(activity.activity_type, 'investment'),
          icon: 'trending-up',
          color: 'text-blue-500',
        };
      case 'regulatory':
        return {
          title: activity.details?.data?.name || 'Regulatory Application',
          description: formatActionText(activity.activity_type, 'regulatory application'),
          icon: 'shield',
          color: 'text-purple-500',
        };
      case 'knowledge':
        return {
          title: activity.details?.data?.title || 'Knowledge Resource',
          description: formatActionText(activity.activity_type, 'knowledge resource'),
          icon: 'book-open',
          color: 'text-indigo-500',
        };
      default:
        return defaultResult;
    }
  } catch (error) {
    console.error('Error formatting activity details:', error);
    return defaultResult;
  }
}

// Helper function to format action text
function formatActionText(activityType: string, resourceName: string): string {
  switch (activityType) {
    case 'view':
      return `You viewed this ${resourceName}`;
    case 'create':
      return `You created this ${resourceName}`;
    case 'update':
      return `You updated this ${resourceName}`;
    case 'delete':
      return `You deleted this ${resourceName}`;
    case 'submit':
      return `You submitted this ${resourceName}`;
    case 'download':
      return `You downloaded this ${resourceName}`;
    case 'share':
      return `You shared this ${resourceName}`;
    default:
      return `You interacted with this ${resourceName}`;
  }
}
