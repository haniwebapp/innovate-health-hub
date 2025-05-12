
import { supabase } from "@/integrations/supabase/client";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";

export class MockInnovationService {
  /**
   * Generates and inserts mock innovations into the database
   */
  static async generateMockInnovations(): Promise<number> {
    try {
      // Check if innovations already exist
      const { data: existingInnovations } = await supabase
        .from('innovations')
        .select('id');
      
      if (existingInnovations && existingInnovations.length > 0) {
        console.log('Mock innovations already exist in the database');
        return 0;
      }
      
      // Prepare innovations for database insertion
      const dbInnovations = mockInnovations.map(innovation => ({
        title: innovation.title,
        description: innovation.description,
        image_url: innovation.imageUrl,
        category: innovation.category,
        tags: innovation.tags,
        status: innovation.status.toLowerCase(),
        organization: innovation.organization,
        website: innovation.website,
        contact: innovation.contact,
        rating: innovation.rating,
        created_at: innovation.createdAt ? new Date(innovation.createdAt) : new Date(),
        regulatory_status: innovation.regulatoryStatus as any,
        impact_metrics: innovation.impactMetrics as any
      }));
      
      // Insert innovations
      const { data, error } = await supabase
        .from('innovations')
        .insert(dbInnovations)
        .select();
        
      if (error) {
        console.error("Error inserting mock innovations:", error);
        throw error;
      }
      
      console.log(`Successfully inserted ${data?.length || 0} mock innovations`);
      return data?.length || 0;
    } catch (error) {
      console.error("Error generating mock innovations:", error);
      throw error;
    }
  }
}
