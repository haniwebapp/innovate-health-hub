
import { recentActivities } from "@/components/dashboard/activity/mockData";
import { defaultSuggestions } from "@/components/dashboard/suggestions/mockData";
import { toast } from "sonner";

export class MockActivityService {
  /**
   * Generates mock activity data
   */
  static async generateMockActivityData(): Promise<{
    activities: number;
    suggestions: number;
  }> {
    // In a real app, this would save to a database
    return {
      activities: recentActivities.length,
      suggestions: defaultSuggestions.length
    };
  }
}
