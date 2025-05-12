
import { supabase } from "@/integrations/supabase/client";
import { SuccessStory, SuccessStoryFormData } from "@/types/successStoryTypes";

export class SuccessStoryService {
  /**
   * Get all published success stories
   */
  static async getPublishedStories(): Promise<SuccessStory[]> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .order('publication_date', { ascending: false });
        
      if (error) throw error;
      
      return this.mapDbStoriesToClient(data || []);
    } catch (error) {
      console.error("Error fetching published success stories:", error);
      throw error;
    }
  }
  
  /**
   * Get featured success stories
   */
  static async getFeaturedStories(limit: number = 3): Promise<SuccessStory[]> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .eq('featured', true)
        .order('publication_date', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      
      return this.mapDbStoriesToClient(data || []);
    } catch (error) {
      console.error("Error fetching featured success stories:", error);
      throw error;
    }
  }
  
  /**
   * Get success stories by category
   */
  static async getStoriesByCategory(category: string): Promise<SuccessStory[]> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .order('publication_date', { ascending: false });
        
      if (error) throw error;
      
      return this.mapDbStoriesToClient(data || []);
    } catch (error) {
      console.error(`Error fetching success stories for category ${category}:`, error);
      throw error;
    }
  }
  
  /**
   * Get a success story by ID
   */
  static async getStoryById(id: string): Promise<SuccessStory | null> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data ? this.mapDbStoryToClient(data) : null;
    } catch (error) {
      console.error(`Error fetching success story with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Create a new success story
   */
  static async createStory(storyData: SuccessStoryFormData): Promise<SuccessStory> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to create a success story");
      }
      
      const dbStory = {
        title: storyData.title,
        summary: storyData.summary,
        content: storyData.content,
        impact_metrics: storyData.impactMetrics,
        category: storyData.category,
        tags: storyData.tags || [],
        organization: storyData.organization,
        cover_image_url: storyData.coverImageUrl,
        author_id: user.data.user.id,
        status: 'draft',
        featured: false,
      };
      
      const { data, error } = await supabase
        .from('success_stories')
        .insert(dbStory)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbStoryToClient(data);
    } catch (error) {
      console.error("Error creating success story:", error);
      throw error;
    }
  }
  
  /**
   * Update an existing success story
   */
  static async updateStory(id: string, storyData: Partial<SuccessStoryFormData>): Promise<SuccessStory> {
    try {
      const dbStory: any = {};
      
      if (storyData.title) dbStory.title = storyData.title;
      if (storyData.summary) dbStory.summary = storyData.summary;
      if (storyData.content) dbStory.content = storyData.content;
      if (storyData.impactMetrics) dbStory.impact_metrics = storyData.impactMetrics;
      if (storyData.category) dbStory.category = storyData.category;
      if (storyData.tags) dbStory.tags = storyData.tags;
      if (storyData.organization) dbStory.organization = storyData.organization;
      if (storyData.coverImageUrl) dbStory.cover_image_url = storyData.coverImageUrl;
      
      // Convert Date to ISO string for database storage
      dbStory.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('success_stories')
        .update(dbStory)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbStoryToClient(data);
    } catch (error) {
      console.error(`Error updating success story with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Publish a success story
   */
  static async publishStory(id: string): Promise<SuccessStory> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .update({
          status: 'published',
          publication_date: new Date().toISOString(), // Convert Date to ISO string
          updated_at: new Date().toISOString() // Convert Date to ISO string
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbStoryToClient(data);
    } catch (error) {
      console.error(`Error publishing success story with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Archive a success story
   */
  static async archiveStory(id: string): Promise<SuccessStory> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .update({
          status: 'archived',
          updated_at: new Date().toISOString() // Convert Date to ISO string
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbStoryToClient(data);
    } catch (error) {
      console.error(`Error archiving success story with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Feature or unfeature a success story
   */
  static async setFeaturedStatus(id: string, featured: boolean): Promise<SuccessStory> {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .update({
          featured,
          updated_at: new Date().toISOString() // Convert Date to ISO string
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbStoryToClient(data);
    } catch (error) {
      console.error(`Error ${featured ? 'featuring' : 'unfeaturing'} success story with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Map database success story objects to client-side objects
   */
  private static mapDbStoriesToClient(dbStories: any[]): SuccessStory[] {
    return dbStories.map(story => this.mapDbStoryToClient(story));
  }
  
  /**
   * Map a single database success story object to client-side object
   */
  private static mapDbStoryToClient(dbStory: any): SuccessStory {
    return {
      id: dbStory.id,
      title: dbStory.title,
      summary: dbStory.summary,
      content: dbStory.content,
      impactMetrics: dbStory.impact_metrics,
      featured: dbStory.featured,
      status: dbStory.status,
      category: dbStory.category,
      tags: dbStory.tags,
      authorId: dbStory.author_id,
      organization: dbStory.organization,
      publicationDate: dbStory.publication_date ? new Date(dbStory.publication_date) : undefined,
      coverImageUrl: dbStory.cover_image_url,
      createdAt: new Date(dbStory.created_at),
      updatedAt: new Date(dbStory.updated_at)
    };
  }
}
