
import { supabase } from "@/integrations/supabase/client";
import { mockRegulatoryFrameworks } from "@/components/regulatory/mockData";

export class MockRegulatoryService {
  /**
   * Generates and inserts mock regulatory data into the database
   */
  static async generateMockRegulatoryData(): Promise<number> {
    try {
      // Check if frameworks already exist
      const { data: existingFrameworks } = await supabase
        .from('regulatory_frameworks')
        .select('id');
      
      if (existingFrameworks && existingFrameworks.length > 0) {
        console.log('Mock regulatory frameworks already exist in the database');
        return 0;
      }
      
      // Prepare frameworks for database insertion
      const dbFrameworks = mockRegulatoryFrameworks.map(framework => ({
        title: framework.title,
        description: framework.description,
        icon: framework.icon,
        total_steps: framework.totalSteps,
      }));
      
      // Insert frameworks
      const { data: frameworks, error: frameworkError } = await supabase
        .from('regulatory_frameworks')
        .insert(dbFrameworks)
        .select();
        
      if (frameworkError) {
        console.error("Error inserting mock regulatory frameworks:", frameworkError);
        throw frameworkError;
      }
      
      console.log(`Successfully inserted ${frameworks?.length || 0} mock regulatory frameworks`);
      
      // Add requirements for each framework
      let requirementsInserted = 0;
      
      for (let i = 0; i < frameworks.length; i++) {
        const framework = frameworks[i];
        const originalFramework = mockRegulatoryFrameworks[i];
        
        // Create requirements for each framework
        const requirements = originalFramework.steps.map((step, index) => ({
          framework_id: framework.id,
          title: step,
          description: `Detailed instructions for ${step.toLowerCase()}`,
          status: index < originalFramework.completedSteps ? 'required' : 'recommended',
          order_index: index
        }));
        
        // Insert requirements
        const { data: insertedReqs, error: reqError } = await supabase
          .from('compliance_requirements')
          .insert(requirements)
          .select();
          
        if (reqError) {
          console.error("Error inserting mock compliance requirements:", reqError);
          throw reqError;
        }
        
        requirementsInserted += insertedReqs.length;
      }
      
      console.log(`Successfully inserted ${requirementsInserted} mock compliance requirements`);
      return frameworks?.length || 0;
    } catch (error) {
      console.error("Error generating mock regulatory data:", error);
      throw error;
    }
  }
}
