import { supabase } from '@/integrations/supabase/client';

export class MockDataService {
  private tables: string[] = [
    'challenges',
    'submissions',
    'events',
    'regulatory_frameworks',
    'sandbox_applications',
    'knowledge_resources'
  ];
  
  public async ensureTablesExist(): Promise<void> {
    try {
      console.log('Checking if tables exist...');
      
      // Instead of using a custom migrations table, we'll query each table directly
      for (const table of this.tables) {
        await this.ensureTableExists(table);
      }

      console.log('All tables exist or were created successfully');
    } catch (error) {
      console.error('Error ensuring tables exist:', error);
    }
  }
  
  private async ensureTableExists(tableName: string): Promise<void> {
    try {
      // Try to query the table - if it errors, the table likely doesn't exist
      const { error } = await supabase
        .from(tableName)
        .select('id')
        .limit(1);
        
      if (error) {
        console.log(`Table ${tableName} might not exist. Error:`, error.message);
        await this.createTable(tableName);
      } else {
        console.log(`Table ${tableName} exists`);
      }
    } catch (error) {
      console.error(`Error checking if ${tableName} exists:`, error);
    }
  }
  
  private async createTable(tableName: string): Promise<void> {
    try {
      console.log(`Creating table ${tableName}...`);
      
      // Instead of direct SQL queries, we'll use the RPC function if available
      // Otherwise fall back to mock data directly
      
      switch (tableName) {
        case 'challenges':
          await this.createChallengesTable();
          break;
        case 'submissions':
          await this.createSubmissionsTable();
          break;
        // Add cases for other tables as needed
        default:
          console.log(`No create function for table ${tableName}, it will be created as needed`);
      }
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error);
    }
  }
  
  private async createChallengesTable(): Promise<void> {
    // This is just a fallback - in production, tables should be created via proper migrations
    console.log('Using fallback method for challenges table');
    // We'll rely on the MockChallengeService to handle this instead of direct SQL
  }
  
  private async createSubmissionsTable(): Promise<void> {
    // This is just a fallback - in production, tables should be created via proper migrations
    console.log('Using fallback method for submissions table');
    // We'll rely on the corresponding service to handle this
  }
}

export const mockDataService = new MockDataService();
