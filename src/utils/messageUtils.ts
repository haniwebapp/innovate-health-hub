
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

export async function fetchUserThreads(): Promise<Thread[]> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");
    
    const { data, error } = await supabase
      .from('message_threads')
      .select(`
        *,
        thread_participants!inner (user_id)
      `)
      .eq('thread_participants.user_id', userData.user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data as Thread[];
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchThreadMessages(threadId: string): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Message[];
  } catch (error) {
    console.error("Error fetching thread messages:", error);
    throw error;
  }
}

export async function createThread(title: string, participants: string[]): Promise<Thread> {
  try {
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
    
    if (!threadData) throw new Error("Failed to create thread");
    
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
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

export async function sendMessage(content: string, threadId: string | null, recipientId?: string | null): Promise<Message> {
  try {
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
    
    if (!data) throw new Error("Failed to send message");
    
    // Update thread's updated_at timestamp
    if (threadId) {
      await supabase
        .from('message_threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', threadId);
    }
    
    return data as Message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function markMessagesAsRead(threadId: string): Promise<boolean> {
  try {
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
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error;
  }
}

// Helper function to create a sample thread for testing
export async function createSampleThread(): Promise<Thread | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    // Check if there are any threads
    const { data: existingThreads } = await supabase
      .from('message_threads')
      .select('id')
      .limit(1);
    
    // If threads exist, don't create a sample
    if (existingThreads && existingThreads.length > 0) {
      return null;
    }
    
    // Create a welcome thread
    const threadData = {
      title: "Welcome to Messages",
      created_by: user.id,
      is_group: false
    };
    
    const { data: thread, error: threadError } = await supabase
      .from('message_threads')
      .insert(threadData)
      .select()
      .single();
    
    if (threadError || !thread) return null;
    
    // Add user as participant
    await supabase
      .from('thread_participants')
      .insert({
        thread_id: thread.id,
        user_id: user.id
      });
    
    // Add welcome message
    await supabase
      .from('messages')
      .insert({
        thread_id: thread.id,
        sender_id: user.id,
        content: "Welcome to the messaging system! You can use this to communicate with others on the platform."
      });
    
    return thread as Thread;
  } catch (error) {
    console.error("Error creating sample thread:", error);
    return null;
  }
}
