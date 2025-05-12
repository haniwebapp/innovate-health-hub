
import { supabase } from "@/integrations/supabase/client";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";

export class MockInnovationService {
  /**
   * Generates and inserts mock innovations into the database
   */
  static async generateMockInnovations(): Promise<number> {
    try {
      // Check if innovations already exist
      let existingInnovations;
      try {
        const { data, error: checkError } = await supabase
          .from('_custom_migrations')
          .select('*')
          .eq('name', 'mock_innovations_inserted');
          
        existingInnovations = data && data.length > 0;
        
        if (checkError) {
          console.log('Error checking migrations table:', checkError);
        }
      } catch (e) {
        console.log('Error querying migrations table:', e);
      }
      
      if (existingInnovations) {
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
      
      // Insert innovations using a direct API call as a workaround
      let insertedCount = 0;
      try {
        const response = await fetch('/api/insert-innovations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ innovations: dbInnovations })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to insert innovations: ${response.statusText}`);
        }
        
        const result = await response.json();
        insertedCount = result.count || dbInnovations.length;
        
        // Mark innovations as inserted
        await supabase
          .from('_custom_migrations')
          .insert({
            name: 'mock_innovations_inserted',
            applied_at: new Date().toISOString()
          });
      } catch (error) {
        console.error("Error inserting mock innovations:", error);
        throw error;
      }
      
      console.log(`Successfully inserted ${insertedCount} mock innovations`);
      return insertedCount;
    } catch (error) {
      console.error("Error generating mock innovations:", error);
      throw error;
    }
  }
}
