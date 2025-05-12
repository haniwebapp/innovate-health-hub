
import { faker } from '@faker-js/faker';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MockInnovation {
  title: string;
  description: string;
  category: string;
  status: string;
  tags: string[];
  user_id: string;
  featured: boolean;
  created_at: string;
}

export class MockInnovationService {
  /**
   * Generates mock innovations for the application
   */
  static async generateMockInnovations(count: number = 12): Promise<number> {
    try {
      const mockInnovations: MockInnovation[] = [];
      
      const categories = ['Digital Health', 'Medical Device', 'Telemedicine', 'AI Diagnostics', 'Wearable Tech', 'Remote Monitoring'];
      const statuses = ['Under Review', 'Approved', 'In Development', 'Testing', 'Deployed'];
      const tagSets = [
        ['AI', 'Machine Learning', 'Predictive'],
        ['IoT', 'Wearable', 'Monitoring'],
        ['Mobile', 'App', 'Patient-centered'],
        ['Hospital', 'Clinical', 'Professional'],
        ['Preventive', 'Wellness', 'Lifestyle']
      ];
      
      // Generate mock innovations
      for (let i = 0; i < count; i++) {
        mockInnovations.push({
          title: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          category: faker.helpers.arrayElement(categories),
          status: faker.helpers.arrayElement(statuses),
          tags: faker.helpers.arrayElements(faker.helpers.arrayElement(tagSets), { min: 1, max: 3 }),
          user_id: faker.string.uuid(),
          featured: faker.datatype.boolean(),
          created_at: new Date().toISOString()
        });
      }
      
      // Insert mock innovations
      // Note: We're commenting out this section as the 'innovations' table doesn't exist in the current schema
      // When the table is created, this code can be uncommented
      
      /*
      const { error, count: insertedCount } = await supabase
        .from('innovations')
        .insert(mockInnovations);
        
      if (error) {
        throw new Error(`Failed to insert mock innovations: ${error.message}`);
      }
      */
      
      // For now, we'll just return the count of mock innovations we would have created
      console.log(`Created ${count} mock innovation objects (not inserted to DB)`);
      return mockInnovations.length;
    } catch (error) {
      console.error("Error generating mock innovations:", error);
      toast.error("Failed to generate mock innovations");
      return 0;
    }
  }
}
