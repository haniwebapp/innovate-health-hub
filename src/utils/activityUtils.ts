
import { supabase } from "@/integrations/supabase/client";

export interface ActivityLog {
  id: string;
  user_id: string | null;
  activity_type: string;
  resource_type: string;
  resource_id: string | null;
  details: any;
  created_at: string;
}

export type ActivityType = 'all' | 'innovation' | 'challenge' | 'investment';

export async function fetchUserActivity(options: {
  limit?: number;
  offset?: number;
  type?: ActivityType;
  startDate?: Date;
  endDate?: Date;
} = {}) {
  const { 
    limit = 20, 
    offset = 0, 
    type = 'all',
    startDate,
    endDate
  } = options;
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  let query = supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
    
  // Apply type filter if not 'all'
  if (type !== 'all') {
    query = query.eq('resource_type', type);
  }
  
  // Apply date filters if provided
  if (startDate) {
    query = query.gte('created_at', startDate.toISOString());
  }
  
  if (endDate) {
    query = query.lte('created_at', endDate.toISOString());
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as ActivityLog[];
}

export async function fetchActivityCount(type: ActivityType = 'all') {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  let query = supabase
    .from('activity_logs')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);
    
  // Apply type filter if not 'all'
  if (type !== 'all') {
    query = query.eq('resource_type', type);
  }

  const { count, error } = await query;

  if (error) throw error;
  return count || 0;
}

export async function logActivity(activityType: string, resourceType: string, resourceId: string, details: any) {
  const { data: { user } } = await supabase.auth.getUser();
  
  // Create activity log entry
  const { error } = await supabase
    .from('activity_logs')
    .insert({
      user_id: user?.id,
      activity_type: activityType,
      resource_type: resourceType,
      resource_id: resourceId,
      details
    });

  if (error) throw error;
  return true;
}

// Helper function to format activity for display
export function formatActivityDetails(activity: ActivityLog): {
  title: string;
  description: string;
  icon: string;
  color: string;
} {
  // Default values
  let title = 'Unknown Activity';
  let description = 'An action was performed';
  let icon = 'activity';
  let color = 'text-gray-500';
  
  // Determine title, description, icon and color based on activity type and resource type
  switch (activity.resource_type) {
    case 'innovation':
      title = activity.details?.data?.title || 'Innovation';
      description = getInnovationActivityDescription(activity.activity_type);
      icon = 'lightbulb';
      color = 'text-moh-green';
      break;
      
    case 'challenge':
      title = activity.details?.data?.title || 'Challenge';
      description = getChallengeActivityDescription(activity.activity_type);
      icon = 'trophy';
      color = 'text-moh-gold';
      break;
      
    case 'investment':
      title = activity.details?.data?.title || 'Investment';
      description = getInvestmentActivityDescription(activity.activity_type);
      icon = 'trending-up';
      color = 'text-blue-600';
      break;
      
    default:
      title = activity.details?.data?.title || 'Platform Activity';
      description = `${activity.activity_type} activity`;
      icon = 'activity';
      color = 'text-gray-500';
  }
  
  return { title, description, icon, color };
}

function getInnovationActivityDescription(activityType: string): string {
  switch (activityType) {
    case 'create':
      return 'Created a new innovation';
    case 'update':
      return 'Updated innovation details';
    case 'view':
      return 'Viewed innovation details';
    case 'delete':
      return 'Removed an innovation';
    case 'submit':
      return 'Submitted innovation for review';
    default:
      return 'Interacted with innovation';
  }
}

function getChallengeActivityDescription(activityType: string): string {
  switch (activityType) {
    case 'create':
      return 'Created a new challenge';
    case 'update':
      return 'Updated challenge details';
    case 'view':
      return 'Viewed challenge details';
    case 'delete':
      return 'Removed a challenge';
    case 'submit':
      return 'Made a challenge submission';
    default:
      return 'Interacted with challenge';
  }
}

function getInvestmentActivityDescription(activityType: string): string {
  switch (activityType) {
    case 'create':
      return 'Created a new investment opportunity';
    case 'update':
      return 'Updated investment details';
    case 'view':
      return 'Viewed investment details';
    case 'delete':
      return 'Removed an investment';
    case 'apply':
      return 'Applied for investment funding';
    default:
      return 'Interacted with investment';
  }
}

// Group activities by date for better display
export function groupActivitiesByDate(activities: ActivityLog[]): Record<string, ActivityLog[]> {
  const groups: Record<string, ActivityLog[]> = {};
  
  activities.forEach(activity => {
    const date = new Date(activity.created_at);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    
    groups[dateKey].push(activity);
  });
  
  return groups;
}

