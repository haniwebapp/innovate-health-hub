
import { supabase } from '@/integrations/supabase/client';

export interface KnowledgeResource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  url?: string;
  file_path?: string;
  thumbnail_url?: string;
  author?: string;
  featured: boolean;
  downloads: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface SavedResource {
  id: string;
  resource_id: string;
  user_id: string;
  notes?: string;
  saved_at: string;
  resource?: KnowledgeResource;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  estimated_hours: number;
  featured: boolean;
  prerequisite_path_id?: string;
  created_at: string;
  updated_at: string;
}

export async function fetchKnowledgeResources(
  category?: string,
  featured?: boolean
): Promise<KnowledgeResource[]> {
  try {
    let query = supabase
      .from('knowledge_resources')
      .select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (featured !== undefined) {
      query = query.eq('featured', featured);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching knowledge resources:', error);
    return [];
  }
}

export async function fetchFeaturedResources(): Promise<KnowledgeResource[]> {
  return fetchKnowledgeResources(undefined, true);
}

export async function fetchResourcesByCategory(category: string): Promise<KnowledgeResource[]> {
  return fetchKnowledgeResources(category);
}

export async function fetchLearningPaths(): Promise<LearningPath[]> {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('featured', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return [];
  }
}

export async function fetchResourceById(id: string): Promise<KnowledgeResource | null> {
  try {
    const { data, error } = await supabase
      .from('knowledge_resources')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching knowledge resource:', error);
    return null;
  }
}

export async function saveResource(resourceId: string, notes?: string): Promise<boolean> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      console.warn('Cannot save resource: User not logged in');
      return false;
    }
    
    const userId = session.session.user.id;
    
    // Check if already saved
    const { data: existingData } = await supabase
      .from('user_saved_resources')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', userId)
      .single();
    
    if (existingData) {
      // Update notes if provided
      if (notes) {
        const { error } = await supabase
          .from('user_saved_resources')
          .update({ notes })
          .eq('id', existingData.id);
        
        if (error) throw error;
      }
      
      return true;
    }
    
    // Save new resource
    const { error } = await supabase
      .from('user_saved_resources')
      .insert([
        {
          resource_id: resourceId,
          user_id: userId,
          notes
        }
      ]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving resource:', error);
    return false;
  }
}

export async function fetchSavedResources(): Promise<SavedResource[]> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      return [];
    }
    
    const userId = session.session.user.id;
    
    const { data, error } = await supabase
      .from('user_saved_resources')
      .select(`
        *,
        resource:resource_id(*)
      `)
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching saved resources:', error);
    return [];
  }
}

export async function incrementDownloadCount(resourceId: string): Promise<void> {
  try {
    // Since we can't use RPC with the current setup, use standard update
    const { data } = await supabase
      .from('knowledge_resources')
      .select('downloads')
      .eq('id', resourceId)
      .single();
      
    const currentDownloads = data?.downloads || 0;
    
    // Update download count
    await supabase
      .from('knowledge_resources')
      .update({ downloads: currentDownloads + 1 })
      .eq('id', resourceId);
    
    // Record the download activity
    const resource = await fetchResourceById(resourceId);
    if (resource) {
      // Log the activity 
      console.log('Resource downloaded:', resource.title);
    }
  } catch (error) {
    console.error('Error incrementing download count:', error);
  }
}
