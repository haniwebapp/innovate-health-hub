
import { supabase } from '@/integrations/supabase/client';

export interface KnowledgeResource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  file_path?: string;
  url?: string;
  thumbnail_url?: string;
  author?: string;
  tags?: string[];
  downloads: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
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
  modules?: LearningModule[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  path_id: string;
  content_type: string;
  content_url?: string;
  resource_id?: string;
  estimated_minutes: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  path_id: string;
  module_id: string;
  status: string;
  progress_percentage: number;
  last_activity_at: string;
  completed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export async function fetchFeaturedResources(limit = 6): Promise<KnowledgeResource[]> {
  try {
    const { data, error } = await supabase
      .from('knowledge_resources')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching featured resources:', error);
    return [];
  }
}

export async function fetchResourcesByCategory(category: string, limit = 10): Promise<KnowledgeResource[]> {
  try {
    const { data, error } = await supabase
      .from('knowledge_resources')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching resources for category ${category}:`, error);
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

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(`Error fetching resource ${id}:`, error);
    return null;
  }
}

export async function incrementDownloadCount(id: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_resource_download', { resource_id: id });
    
    if (error) throw error;
  } catch (error: any) {
    console.error(`Error incrementing download count for resource ${id}:`, error);
  }
}

export async function fetchLearningPaths(): Promise<LearningPath[]> {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('featured', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching learning paths:', error);
    return [];
  }
}

export async function fetchLearningPathWithModules(pathId: string): Promise<LearningPath | null> {
  try {
    // Get the learning path
    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', pathId)
      .single();

    if (pathError) throw pathError;
    if (!path) return null;
    
    // Get the modules for this path
    const { data: modules, error: modulesError } = await supabase
      .from('learning_modules')
      .select('*')
      .eq('path_id', pathId)
      .order('order_index', { ascending: true });

    if (modulesError) throw modulesError;
    
    return {
      ...path,
      modules: modules || []
    };
  } catch (error: any) {
    console.error(`Error fetching learning path ${pathId}:`, error);
    return null;
  }
}

export async function getUserProgressForPath(pathId: string): Promise<UserProgress[]> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_learning_progress')
      .select('*')
      .eq('user_id', session.session.user.id)
      .eq('path_id', pathId);

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching user progress for path ${pathId}:`, error);
    return [];
  }
}

export async function updateModuleProgress(
  moduleId: string, 
  pathId: string, 
  status: string, 
  progressPercentage: number, 
  notes?: string
): Promise<void> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }
    
    const userId = session.session.user.id;
    const now = new Date().toISOString();
    
    // Check if progress record exists
    const { data: existing, error: checkError } = await supabase
      .from('user_learning_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') {
      // Error other than "no rows found"
      throw checkError;
    }
    
    if (existing) {
      // Update existing record
      const updates: any = {
        status,
        progress_percentage: progressPercentage,
        last_activity_at: now,
        updated_at: now
      };
      
      if (notes !== undefined) {
        updates.notes = notes;
      }
      
      if (status === 'completed' && progressPercentage === 100) {
        updates.completed_at = now;
      }
      
      const { error: updateError } = await supabase
        .from('user_learning_progress')
        .update(updates)
        .eq('id', existing.id);
        
      if (updateError) throw updateError;
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('user_learning_progress')
        .insert([{
          user_id: userId,
          module_id: moduleId,
          path_id: pathId,
          status,
          progress_percentage: progressPercentage,
          last_activity_at: now,
          notes,
          completed_at: status === 'completed' && progressPercentage === 100 ? now : null
        }]);
        
      if (insertError) throw insertError;
    }
  } catch (error: any) {
    console.error(`Error updating module progress for module ${moduleId}:`, error);
    throw error;
  }
}

export async function saveResource(resourceId: string, notes?: string): Promise<void> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('user_saved_resources')
      .insert([{
        user_id: session.session.user.id,
        resource_id: resourceId,
        notes,
        saved_at: new Date().toISOString()
      }]);
      
    if (error) throw error;
  } catch (error: any) {
    console.error(`Error saving resource ${resourceId}:`, error);
    throw error;
  }
}

export async function unsaveResource(resourceId: string): Promise<void> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('user_saved_resources')
      .delete()
      .eq('user_id', session.session.user.id)
      .eq('resource_id', resourceId);
      
    if (error) throw error;
  } catch (error: any) {
    console.error(`Error unsaving resource ${resourceId}:`, error);
    throw error;
  }
}

export async function isResourceSaved(resourceId: string): Promise<boolean> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('user_saved_resources')
      .select('id')
      .eq('user_id', session.session.user.id)
      .eq('resource_id', resourceId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return !!data;
  } catch (error: any) {
    console.error(`Error checking if resource ${resourceId} is saved:`, error);
    return false;
  }
}
