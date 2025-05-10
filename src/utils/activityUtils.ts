import { supabase } from "@/integrations/supabase/client";

export interface ActivityLog {
  id: string;
  activity_type: string;
  resource_type: string;
  resource_id: string;
  created_at: string;
  user_id: string;
  details: any;
}

interface ActivityDetails {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const formatActivityDetails = (activity: ActivityLog): ActivityDetails => {
  let title = 'Activity';
  let description = 'An activity occurred';
  let icon = 'activity';
  let color = 'text-gray-500';
  
  try {
    const details = JSON.parse(activity.details);
    
    switch (activity.activity_type) {
      case 'innovation_created':
        title = `New Innovation: ${details.innovation_name}`;
        description = `Innovation "${details.innovation_name}" was created.`;
        icon = 'lightbulb';
        color = 'text-moh-green';
        break;
      case 'challenge_created':
        title = `New Challenge: ${details.challenge_name}`;
        description = `Challenge "${details.challenge_name}" was created.`;
        icon = 'trophy';
        color = 'text-amber-500';
        break;
      case 'investment_made':
        title = `Investment in ${activity.resource_type}: ${activity.resource_id}`;
        description = `New investment made in ${activity.resource_type} ${activity.resource_id}.`;
        icon = 'trending-up';
        color = 'text-blue-500';
        break;
      default:
        title = `Activity on ${activity.resource_type}: ${activity.resource_id}`;
        description = `An activity occurred on ${activity.resource_type} ${activity.resource_id}.`;
        break;
    }
  } catch (error) {
    console.error("Error parsing activity details:", error);
  }
  
  return {
    title,
    description,
    icon,
    color,
  };
};

export const fetchUserActivity = async (
  filter?: string,
  startDate?: Date,
  endDate?: Date,
  page = 0,
  pageSize = 10
) => {
  try {
    let query = supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(pageSize)
      .range(page * pageSize, (page + 1) * pageSize - 1);

    // Apply resource_type filter if provided
    if (filter && filter !== 'all') {
      query = query.eq('resource_type', filter.toLowerCase());
    }
    
    // Apply date range filters if provided
    if (startDate) {
      const startDateString = startDate.toISOString();
      query = query.gte('created_at', startDateString);
    }
    
    if (endDate) {
      // Set to end of day for the end date
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);
      const endDateString = adjustedEndDate.toISOString();
      query = query.lte('created_at', endDateString);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as ActivityLog[];
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return [];
  }
};

export const getActivityCount = async (filter?: string): Promise<number> => {
  try {
    let query = supabase
      .from('activity_logs')
      .select('id', { count: 'exact', head: true });
    
    if (filter && filter !== 'all') {
      query = query.eq('resource_type', filter.toLowerCase());
    }
    
    const { count, error } = await query;
    
    if (error) throw error;
    
    return count || 0;
  } catch (error) {
    console.error('Error getting activity count:', error);
    return 0;
  }
};

export const groupActivitiesByDate = (activities: ActivityLog[]) => {
  const grouped = activities.reduce((acc, activity) => {
    const date = new Date(activity.created_at);
    const dateString = date.toDateString();
    
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    
    acc[dateString].push(activity);
    return acc;
  }, {} as Record<string, ActivityLog[]>);
  
  return Object.entries(grouped).map(([date, activities]) => ({
    date,
    activities
  }));
};
