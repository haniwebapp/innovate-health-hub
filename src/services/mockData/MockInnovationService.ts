
import { mockInnovations } from "@/components/innovations/data/mockInnovations";
import { toast } from "sonner";

export class MockInnovationService {
  /**
   * Generates mock innovation data
   */
  static async generateMockInnovations(): Promise<number> {
    // In a real app, this would save to a database
    // For our mock, we'll just return the count of our mock data
    return mockInnovations.length;
  }
}
