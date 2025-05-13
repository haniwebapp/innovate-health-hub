
import { MockPageService } from "./MockPageService";
import { MockInnovationService } from "./MockInnovationService";
import { MockChallengeService } from "./MockChallengeService";
import { MockEventService } from "./MockEventService";
import { MockInvestmentService } from "./MockInvestmentService";
import { MockRegulatoryService } from "./MockRegulatoryService";
import { MockKnowledgeService } from "./MockKnowledgeService";
import { MockUserService } from "./MockUserService";
import { MockActivityService } from "./MockActivityService";
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
      
      // Generate mock events
      const eventsCount = await MockEventService.generateMockEvents();
      
      // Generate mock investment data
      const investmentData = await MockInvestmentService.generateMockInvestmentData();
      
      // Generate mock regulatory data
      const regulatoryData = await MockRegulatoryService.generateMockRegulatoryData();
      
      // Generate mock knowledge resources
      const resourcesCount = await MockKnowledgeService.generateMockKnowledgeResources();
      
      // Generate mock users
      const usersCount = await MockUserService.generateMockUsers();
      
      // Generate mock activity data
      const activityData = await MockActivityService.generateMockActivityData();
      
      toast.success(
        `Mock data generated successfully! Created:
        - ${pagesCount} pages
        - ${innovationsCount} innovations
        - ${challengesCount} challenges
        - ${eventsCount} events
        - ${investmentData.fundingRounds} funding rounds & ${investmentData.investors} investors
        - ${regulatoryData.frameworks} regulatory frameworks
        - ${resourcesCount} knowledge resources
        - ${usersCount} user profiles
        - ${activityData.activities} activity items`,
        { duration: 8000 }
      );
    } catch (error) {
      console.error("Error generating mock data:", error);
      toast.error("Failed to generate mock data. See console for details.");
    }
  }
}
