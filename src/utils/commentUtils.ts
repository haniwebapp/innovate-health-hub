
import { supabase } from "@/integrations/supabase/client";

export interface Comment {
  id: string;
  user_id: string | null;
  resource_type: string;
  resource_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchComments(resourceType: string, resourceId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name,
        avatar_url,
        organization
      )
    `)
    .eq('resource_type', resourceType)
    .eq('resource_id', resourceId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addComment(resourceType: string, resourceId: string, content: string, parentId?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      resource_type: resourceType,
      resource_id: resourceId,
      content,
      parent_id: parentId || null
    })
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function updateComment(commentId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', commentId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function deleteComment(commentId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
}
