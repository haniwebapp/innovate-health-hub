
import { supabase } from '@/integrations/supabase/client';

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  resource_type: string;
  resource_id: string;
  created_at: string;
  details?: {
    data: Record<string, any>;
  };
}

export function formatActivityDetails(activity: ActivityLog) {
  const details = activity.details?.data || {};
  const resourceType = activity.resource_type;
  const activityType = activity.activity_type;
  
  let title = 'Activity';
  let description = 'You performed an action';
  let icon = 'activity';
  let color = 'text-gray-500';
  
  // Format title based on resource type
  switch (resourceType) {
    case 'innovation':
      title = details.title || details.name || 'Innovation';
      icon = 'lightbulb';
      color = 'text-moh-green';
      break;
    case 'challenge':
      title = details.title || 'Challenge';
      icon = 'trophy';
      color = 'text-amber-600';
      break;
    case 'investment':
      title = details.title || details.name || 'Investment';
      icon = 'trending-up';
      color = 'text-blue-600';
      break;
    case 'regulatory':
      title = details.title || details.name || 'Regulatory Application';
      icon = 'shield';
      color = 'text-purple-600';
      break;
    case 'knowledge':
      title = details.title || 'Knowledge Resource';
      icon = 'book-open';
      color = 'text-indigo-600';
      break;
    case 'event':
      title = details.title || 'Event';
      icon = 'calendar';
      color = 'text-pink-600';
      break;
    default:
      title = details.title || details.name || 'Activity';
  }
  
  // Format description based on activity type
  switch (activityType) {
    case 'view':
      description = `You viewed this ${resourceType}`;
      break;
    case 'create':
      description = `You created this ${resourceType}`;
      break;
    case 'update':
      description = `You updated this ${resourceType}`;
      break;
    case 'submit':
      description = `You submitted this ${resourceType}`;
      break;
    case 'complete':
      description = `You completed this ${resourceType}`;
      break;
    case 'comment':
      description = `You commented on this ${resourceType}`;
      break;
    case 'download':
      description = `You downloaded this ${resourceType}`;
      break;
    case 'share':
      description = `You shared this ${resourceType}`;
      break;
    default:
      description = `You interacted with this ${resourceType}`;
  }

  return { title, description, icon, color };
}

// Add the missing groupActivitiesByDate function
interface GroupedActivities {
  date: string;
  activities: ActivityLog[];
}

export function groupActivitiesByDate(activities: ActivityLog[]): GroupedActivities[] {
  const grouped: Record<string, ActivityLog[]> = {};
  
  activities.forEach(activity => {
    const date = new Date(activity.created_at).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
  });
  
  // Convert to array format
  return Object.keys(grouped).map(date => ({
    date,
    activities: grouped[date]
  })).sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Add getActivityCount function
export async function getActivityCount(resourceType?: string): Promise<number> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      return 0;
    }
    
    let query = supabase
      .from('activity_logs')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', session.session.user.id);
    
    if (resourceType) {
      query = query.eq('resource_type', resourceType);
    }
    
    const { count, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error getting activity count:', error);
    return 0;
  }
}

export async function fetchUserActivity(
  resourceType?: string,
  startDate?: Date, 
  endDate?: Date
): Promise<ActivityLog[]> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      return [];
    }
    
    const userId = session.session.user.id;
    
    let query = supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (resourceType) {
      query = query.eq('resource_type', resourceType);
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }

    // Transform the data to match ActivityLog type
    const formattedData: ActivityLog[] = data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      activity_type: item.activity_type,
      resource_type: item.resource_type,
      resource_id: item.resource_id,
      created_at: item.created_at,
      details: item.details ? { data: item.details.data || {} } : undefined
    }));
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return [];
  }
}

export async function recordUserActivity(
  activityType: string,
  resourceType: string,
  resourceId: string,
  details: Record<string, any> = {}
): Promise<void> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      console.warn('Cannot record activity: User not logged in');
      return;
    }
    
    const userId = session.session.user.id;
    
    const { error } = await supabase
      .from('activity_logs')
      .insert([
        {
          user_id: userId,
          activity_type: activityType,
          resource_type: resourceType,
          resource_id: resourceId,
          details: { data: details }
        }
      ]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error recording activity:', error);
  }
}
