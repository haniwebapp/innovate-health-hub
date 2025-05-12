
import { MockPageService } from "./MockPageService";
import { MockInnovationService } from "./MockInnovationService";
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
      
      // Generate mock innovations (commented out until the table is created)
      // const innovationsCount = await MockInnovationService.generateMockInnovations();
      
      toast.success(`Mock data generated successfully! Created ${pagesCount} pages.`, { duration: 5000 });
    } catch (error) {
      console.error("Error generating mock data:", error);
      toast.error("Failed to generate mock data. See console for details.");
    }
  }
}
