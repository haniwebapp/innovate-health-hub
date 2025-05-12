
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
      // Create innovations table if it doesn't exist
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
      
      const { error: tableError } = await supabase.from('_custom_migrations').select('*')
        .eq('name', 'create_innovations_table')
        .then(async ({ data }) => {
          if (!data || data.length === 0) {
            // Table hasn't been created yet, create it
            const { error } = await supabase.rpc('exec_sql', { 
              sql_query: createTableQuery 
            }).catch(() => ({ error: new Error("Failed to execute SQL") }));
            
            if (!error) {
              // Log that we created the table
              await supabase.from('_custom_migrations').insert({ 
                name: 'create_innovations_table',
                applied_at: new Date().toISOString()
              });
            }
            
            return { error };
          }
          return { error: null };
        });
      
      if (tableError) {
        console.error("Error creating innovations table:", tableError);
        // Fallback: Try direct approach
        try {
          // This is a workaround when RPC isn't available
          await fetch('/api/execute-sql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: createTableQuery })
          });
        } catch (err) {
          console.error("Fallback approach failed:", err);
        }
      }
      
      // Repeat similar approach for challenges table
      const createChallengesTableQuery = `
        CREATE TABLE IF NOT EXISTS public.challenges (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          long_description TEXT,
          category TEXT NOT NULL,
          image_url TEXT,
          organizer TEXT,
          start_date TIMESTAMP WITH TIME ZONE,
          end_date TIMESTAMP WITH TIME ZONE,
          status TEXT NOT NULL,
          prize TEXT,
          eligibility TEXT,
          requirements JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
      `;
      
      await supabase.from('_custom_migrations').select('*')
        .eq('name', 'create_challenges_table')
        .then(async ({ data }) => {
          if (!data || data.length === 0) {
            // Try to create the table
            try {
              await fetch('/api/execute-sql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: createChallengesTableQuery })
              });
              
              // Log that we created the table
              await supabase.from('_custom_migrations').insert({ 
                name: 'create_challenges_table',
                applied_at: new Date().toISOString()
              });
            } catch (err) {
              console.error("Failed to create challenges table:", err);
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
