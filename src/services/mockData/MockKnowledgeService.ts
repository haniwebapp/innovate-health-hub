
import { mockResources } from "@/components/knowledge/mockData";
import { toast } from "sonner";

export class MockKnowledgeService {
  /**
   * Generates mock knowledge resources
   */
  static async generateMockKnowledgeResources(): Promise<number> {
    // In a real app, this would save to a database
    return mockResources.length;
  }
}
