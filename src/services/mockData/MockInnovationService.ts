
import { supabase } from "@/integrations/supabase/client";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";

export class MockInnovationService {
  /**
   * Generates and inserts mock innovations into the database
   */
  static async generateMockInnovations(): Promise<number> {
    try {
      // We need to create the innovations table first if it doesn't exist
      await supabase.rpc('create_innovations_table_if_not_exists');
      
      // Check if innovations already exist
      const { data: existingInnovations, error: checkError } = await supabase
        .from('innovations')
        .select('id');
      
      if (checkError) {
        console.log('Error checking innovations table, it may not exist yet:', checkError);
        return 0;
      }
      
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
        created_at: innovation.createdAt ? new Date(innovation.createdAt).toISOString() : new Date().toISOString(),
        regulatory_status: innovation.regulatoryStatus ? JSON.stringify(innovation.regulatoryStatus) : null,
        impact_metrics: innovation.impactMetrics ? JSON.stringify(innovation.impactMetrics) : null
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
