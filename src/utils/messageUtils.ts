
import { supabase } from "@/integrations/supabase/client";

export interface Thread {
  id: string;
  title: string;
  created_by: string | null;
  is_group: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string | null;
  thread_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchUserThreads() {
  const { data, error } = await supabase
    .from('message_threads')
    .select(`
      *,
      thread_participants!inner (user_id)
    `)
    .eq('thread_participants.user_id', (await supabase.auth.getUser()).data.user?.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as Thread[];
}

export async function fetchThreadMessages(threadId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Message[];
}

export async function createThread(title: string, participants: string[]) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  // Create thread
  const { data: threadData, error: threadError } = await supabase
    .from('message_threads')
    .insert({
      title,
      created_by: user.id,
      is_group: participants.length > 1
    })
    .select()
    .single();

  if (threadError) throw threadError;
  
  // Add creator as participant
  const threadParticipants = [
    { thread_id: threadData.id, user_id: user.id },
    ...participants.map(participantId => ({
      thread_id: threadData.id,
      user_id: participantId
    }))
  ];
  
  const { error: participantError } = await supabase
    .from('thread_participants')
    .insert(threadParticipants);

  if (participantError) throw participantError;
  
  return threadData as Thread;
}

export async function sendMessage(content: string, threadId: string | null, recipientId?: string | null) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const messageData = {
    content,
    sender_id: user.id,
    recipient_id: recipientId || null,
    thread_id: threadId
  };
  
  const { data, error } = await supabase
    .from('messages')
    .insert(messageData)
    .select()
    .single();

  if (error) throw error;
  return data as Message;
}

export async function markMessagesAsRead(threadId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('thread_id', threadId)
    .neq('sender_id', user.id);

  if (error) throw error;
  
  // Update last_read_at in thread_participants
  const { error: updateError } = await supabase
    .from('thread_participants')
    .update({ last_read_at: new Date().toISOString() })
    .eq('thread_id', threadId)
    .eq('user_id', user.id);

  if (updateError) throw updateError;
  
  return true;
}
