
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

export async function fetchUserActivity(limit = 10) {
  const userId = supabase.auth.getUser().data?.user?.id;
  
  if (!userId) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as ActivityLog[];
}

export async function logActivity(activityType: string, resourceType: string, resourceId: string, details: any) {
  const userId = supabase.auth.getUser().data?.user?.id;
  
  // Create activity log entry
  const { error } = await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      activity_type: activityType,
      resource_type: resourceType,
      resource_id: resourceId,
      details
    });

  if (error) throw error;
  return true;
}
