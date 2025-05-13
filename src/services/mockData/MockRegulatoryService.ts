
import { mockRegulatoryFrameworks, mockComplianceRequirements, mockSandboxApplications } from "@/components/regulatory/mockData";
import { toast } from "sonner";

export class MockRegulatoryService {
  /**
   * Generates mock regulatory data
   */
  static async generateMockRegulatoryData(): Promise<{
    frameworks: number;
    requirements: number;
    applications: number;
  }> {
    // In a real app, this would save to a database
    return {
      frameworks: mockRegulatoryFrameworks.length,
      requirements: mockComplianceRequirements.length,
      applications: mockSandboxApplications.length
    };
  }
}
