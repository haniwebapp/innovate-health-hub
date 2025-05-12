
import { supabase } from "@/integrations/supabase/client";
import { WebsitePage } from "@/types/pageTypes";
import { CacheUtils } from "@/utils/cacheUtils";
import { ErrorHandlingService } from "../errors/ErrorHandlingService";
import { PerformanceMonitoringService } from "../monitoring/PerformanceMonitoringService";

export class PageService {
  private static readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  /**
   * Get all published pages with caching
   */
  static async getPublishedPages(): Promise<WebsitePage[]> {
    return PerformanceMonitoringService.measurePerformance('apiCall', async () => {
      try {
        return await CacheUtils.getOrCompute('published_pages', async () => {
          const { data, error } = await supabase
            .from('website_pages')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });
            
          if (error) throw error;
          
          return data as WebsitePage[];
        }, this.CACHE_TTL);
      } catch (error) {
        ErrorHandlingService.handleError(error, 'PageService.getPublishedPages');
        return [];
      }
    }, { service: 'PageService', method: 'getPublishedPages' });
  }
  
  /**
   * Get a single page by slug with caching
   */
  static async getPageBySlug(slug: string): Promise<WebsitePage | null> {
    return PerformanceMonitoringService.measurePerformance('apiCall', async () => {
      try {
        return await CacheUtils.getOrCompute(`page_${slug}`, async () => {
          const { data, error } = await supabase
            .from('website_pages')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();
            
          if (error) throw error;
          
          return data as WebsitePage;
        }, this.CACHE_TTL);
      } catch (error) {
        ErrorHandlingService.handleError(error, 'PageService.getPageBySlug');
        return null;
      }
    }, { service: 'PageService', method: 'getPageBySlug', slug });
  }
}
