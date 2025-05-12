
import { MockPageService } from "./MockPageService";
import { MockInnovationService } from "./MockInnovationService";
import { MockChallengeService } from "./MockChallengeService";
import { MockRegulatoryService } from "./MockRegulatoryService";
import { MockKnowledgeService } from "./MockKnowledgeService";
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
