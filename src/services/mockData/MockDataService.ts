
import { MockPageService } from "./MockPageService";
import { MockInnovationService } from "./MockInnovationService";
import { MockChallengeService } from "./MockChallengeService";
import { MockRegulatoryService } from "./MockRegulatoryService";
import { MockKnowledgeService } from "./MockKnowledgeService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export class MockDataService {
  /**
   * Ensures all required tables exist before generating mock data
   */
  private static async ensureTablesExist(): Promise<void> {
    try {
      // Create function to check and create innovations table
      await supabase.rpc('create_innovations_table_if_not_exists').catch(async () => {
        // If the function doesn't exist, create it
        const { error } = await supabase.rpc('create_rpc_function_for_innovations');
        if (error) {
          console.error("Error creating innovations RPC function:", error);
          
          // Fallback: try direct table creation
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public.innovations (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              title TEXT NOT NULL,
              description TEXT NOT NULL,
              image_url TEXT,
              category TEXT NOT NULL,
              tags TEXT[] DEFAULT '{}',
              status TEXT NOT NULL,
              organization TEXT,
              website TEXT,
              contact TEXT,
              rating DECIMAL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              regulatory_status JSONB,
              impact_metrics JSONB
            );
          `;
          
          const { error: tableError } = await supabase.rpc('exec_sql', { sql_query: createTableQuery });
          if (tableError) {
            console.error("Error creating innovations table:", tableError);
            throw tableError;
          }
        }
      });
      
      console.log("Required tables check completed");
    } catch (error) {
      console.error("Error ensuring tables exist:", error);
      throw error;
    }
  }

  /**
   * Generates all mock data for the application
   */
  static async generateAllMockData(): Promise<void> {
    try {
      toast.info("Generating mock data...", { duration: 2000 });
      
      // Ensure all required tables exist
      await MockDataService.ensureTablesExist();
      
      // Generate mock pages
      const pagesCount = await MockPageService.generateMockPages();
      
      // Generate mock innovations
      const innovationsCount = await MockInnovationService.generateMockInnovations();
      
      // Generate mock challenges
      const challengesCount = await MockChallengeService.generateMockChallenges();

      // Generate mock regulatory data
      const regulatoryCount = await MockRegulatoryService.generateMockRegulatoryData();

      // Generate mock knowledge resources
      const knowledgeCount = await MockKnowledgeService.generateMockKnowledge();
      
      toast.success(
        `Mock data generated successfully! Created ${pagesCount} pages, ${innovationsCount} innovations, ${challengesCount} challenges, ${regulatoryCount} regulatory items, and ${knowledgeCount} knowledge resources.`, 
        { duration: 5000 }
      );
    } catch (error) {
      console.error("Error generating mock data:", error);
      toast.error("Failed to generate mock data. See console for details.");
    }
  }
}
