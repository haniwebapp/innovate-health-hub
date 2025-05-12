
import { MockPageService } from "./MockPageService";
import { toast } from "sonner";

export class MockDataService {
  /**
   * Generates all mock data for the application
   */
  static async generateAllMockData(): Promise<void> {
    try {
      toast.info("Generating mock data...", { duration: 2000 });
      
      // Generate mock pages
      const pagesCount = await MockPageService.generateMockPages();
      
      // Add more mock data generators here as needed
      // const innovationsCount = await MockInnovationService.generateMockInnovations();
      // const challengesCount = await MockChallengeService.generateMockChallenges();
      
      toast.success(`Mock data generated successfully! Created ${pagesCount} pages.`, { duration: 5000 });
    } catch (error) {
      console.error("Error generating mock data:", error);
      toast.error("Failed to generate mock data. See console for details.");
    }
  }
}
