
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  content: string;
  read: boolean;
  action_url: string | null;
  notification_type: string;
  created_at: string;
}

export async function fetchUserNotifications(limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Notification[];
}

export async function createNotification(userId: string, title: string, content: string, notificationType: string, actionUrl?: string) {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title,
      content,
      notification_type: notificationType,
      action_url: actionUrl || null
    });

  if (error) throw error;
  return true;
}

export async function markNotificationAsRead(notificationId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
}

export async function markAllNotificationsAsRead() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .eq('read', false);

  if (error) throw error;
  return true;
}
