
import { mockChallenges } from "@/components/challenges/dashboard/mockData";
import { toast } from "sonner";

export class MockChallengeService {
  /**
   * Generates mock challenge data
   */
  static async generateMockChallenges(): Promise<number> {
    // In a real app, this would save to a database
    // For our mock, we'll just return the count of our mock data
    return mockChallenges.length;
  }
}
