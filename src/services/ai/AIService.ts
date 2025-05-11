
import { InvestmentAIService } from "./InvestmentAIService";
import { RegulatoryAIService } from "./RegulatoryAIService";
import { InnovationAIService } from "./InnovationAIService";

export class AIService {
  static investment = InvestmentAIService;
  static regulatory = RegulatoryAIService;
  static innovation = InnovationAIService;

  /**
   * Centralized method for logging AI operations
   */
  static async logAIOperation(
    operation: string, 
    context: string, 
    input: any, 
    output: any, 
    userId?: string
  ): Promise<void> {
    try {
      console.log(`AI Operation: ${operation}`, {
        context,
        input: JSON.stringify(input),
        output: JSON.stringify(output),
        userId,
        timestamp: new Date().toISOString()
      });
      // In a full implementation, this would log to a dedicated table
    } catch (error) {
      console.error("Error logging AI operation:", error);
    }
  }

  /**
   * Get feedback on AI operation for continuous improvement
   */
  static async recordFeedback(
    operationId: string, 
    rating: number, 
    comments?: string, 
    userId?: string
  ): Promise<void> {
    try {
      console.log(`AI Feedback Recorded:`, {
        operationId,
        rating,
        comments,
        userId,
        timestamp: new Date().toISOString()
      });
      // In a full implementation, this would store feedback in a dedicated table
    } catch (error) {
      console.error("Error recording AI feedback:", error);
    }
  }

  /**
   * Check AI service health and availability
   */
  static async checkAIServices(): Promise<{
    investment: boolean;
    regulatory: boolean;
    innovation: boolean;
    overall: boolean;
  }> {
    // Simple health check - would be more comprehensive in a full implementation
    const investment = true;
    const regulatory = true;
    const innovation = true;

    return {
      investment,
      regulatory,
      innovation,
      overall: investment && regulatory && innovation
    };
  }
}
