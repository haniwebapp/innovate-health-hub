
import { fundingRounds, investors } from "@/components/investment/investmentData";
import { toast } from "sonner";

export class MockInvestmentService {
  /**
   * Generates mock investment data
   */
  static async generateMockInvestmentData(): Promise<{ fundingRounds: number, investors: number }> {
    // In a real app, this would save to a database
    return {
      fundingRounds: fundingRounds.length,
      investors: investors.length
    };
  }
}
