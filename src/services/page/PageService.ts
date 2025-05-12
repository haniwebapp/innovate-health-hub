
import { supabase } from "@/integrations/supabase/client";
import { WebsitePage, WebsitePageFormData, PageContent } from "@/types/pageTypes";

export class PageService {
  /**
   * Get all website pages
   */
  static async getAllPages(): Promise<WebsitePage[]> {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .order('title');
        
      if (error) throw error;
      
      return this.mapDbPagesToClient(data || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }
  }
  
  /**
   * Get only published pages
   */
  static async getPublishedPages(): Promise<WebsitePage[]> {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .eq('published', true)
        .order('title');
        
      if (error) throw error;
      
      return this.mapDbPagesToClient(data || []);
    } catch (error) {
      console.error("Error fetching published pages:", error);
      throw error;
    }
  }
  
  /**
   * Get a page by slug
   */
  static async getPageBySlug(slug: string): Promise<WebsitePage | null> {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }
      
      return data ? this.mapDbPageToClient(data) : null;
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Get a page by ID
   */
  static async getPageById(id: string): Promise<WebsitePage | null> {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }
      
      return data ? this.mapDbPageToClient(data) : null;
    } catch (error) {
      console.error(`Error fetching page with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Create a new page
   */
  static async createPage(pageData: WebsitePageFormData): Promise<WebsitePage> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to create a page");
      }
      
      // Convert PageContent to a plain object that can be serialized to JSON
      const dbPage = {
        slug: pageData.slug,
        title: pageData.title,
        // Convert the content object to a JSON-compatible format
        content: pageData.content as unknown as Record<string, any>,
        meta_description: pageData.metaDescription,
        published: pageData.published || false,
        last_updated_by: user.data.user.id
      };
      
      const { data, error } = await supabase
        .from('website_pages')
        .insert(dbPage)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbPageToClient(data);
    } catch (error) {
      console.error("Error creating page:", error);
      throw error;
    }
  }
  
  /**
   * Update an existing page
   */
  static async updatePage(id: string, pageData: Partial<WebsitePageFormData>): Promise<WebsitePage> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to update a page");
      }
      
      const dbPage: Record<string, any> = {};
      
      if (pageData.slug) dbPage.slug = pageData.slug;
      if (pageData.title) dbPage.title = pageData.title;
      if (pageData.content) dbPage.content = pageData.content as unknown as Record<string, any>;
      if (pageData.metaDescription !== undefined) dbPage.meta_description = pageData.metaDescription;
      if (pageData.published !== undefined) dbPage.published = pageData.published;
      
      dbPage.last_updated_by = user.data.user.id;
      dbPage.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('website_pages')
        .update(dbPage)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbPageToClient(data);
    } catch (error) {
      console.error(`Error updating page with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Toggle the published status of a page
   */
  static async togglePagePublished(id: string, published: boolean): Promise<WebsitePage> {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .update({
          published,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbPageToClient(data);
    } catch (error) {
      console.error(`Error updating publication status for page with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a page
   */
  static async deletePage(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('website_pages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting page with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Map database page objects to client-side objects
   */
  private static mapDbPagesToClient(dbPages: any[]): WebsitePage[] {
    return dbPages.map(page => this.mapDbPageToClient(page));
  }
  
  /**
   * Map a single database page object to client-side object
   */
  private static mapDbPageToClient(dbPage: any): WebsitePage {
    // When retrieving from the database, ensure the content is properly typed
    const content = dbPage.content as unknown as PageContent;
    
    return {
      id: dbPage.id,
      slug: dbPage.slug,
      title: dbPage.title,
      content: content || { sections: [] }, // Provide a default if null/undefined
      metaDescription: dbPage.meta_description,
      lastUpdatedBy: dbPage.last_updated_by,
      published: dbPage.published,
      createdAt: new Date(dbPage.created_at),
      updatedAt: new Date(dbPage.updated_at)
    };
  }
}
