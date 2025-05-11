
import { CallTrace } from "@/types/ai";

export enum AIServiceType {
  INVESTMENT = "investment",
  REGULATORY = "regulatory",
  INNOVATION = "innovation",
  KNOWLEDGE = "knowledge",
  POLICY = "policy"
}

export class AIService {
  /**
   * Creates a standardized trace object for AI operation tracking
   */
  static createTrace(operation: string, context: string): CallTrace {
    return {
      operation,
      context,
      traceId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      metadata: {}
    };
  }

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
    knowledge: boolean;
    policy: boolean;
    overall: boolean;
  }> {
    // Simple health check - would be more comprehensive in a full implementation
    const investment = true;
    const regulatory = true;
    const innovation = true;
    const knowledge = true;
    const policy = true;

    return {
      investment,
      regulatory,
      innovation,
      knowledge,
      policy,
      overall: investment && regulatory && innovation && knowledge && policy
    };
  }
  
  /**
   * Standardize error handling for AI services
   */
  static handleError(error: any, operation: string, context: string): Error {
    console.error(`AI Error in ${operation} (${context}):`, error);
    
    // Create standardized error message
    const message = error?.message || "An error occurred while processing the AI request";
    const enhancedError = new Error(`${operation} failed: ${message}`);
    
    // Add context for debugging
    (enhancedError as any).context = context;
    (enhancedError as any).originalError = error;
    
    return enhancedError;
  }
}

// Import services AFTER defining AIService to avoid circular dependency
import { InvestmentAIService } from "./InvestmentAIService";
import { RegulatoryAIService } from "./RegulatoryAIService";
import { InnovationAIService } from "./InnovationAIService";
import { KnowledgeAIService } from "./KnowledgeAIService";
import { PolicyAIService } from "./PolicyAIService";

// Add service references after the class definition to avoid circular references
AIService.investment = InvestmentAIService;
AIService.regulatory = RegulatoryAIService;
AIService.innovation = InnovationAIService;
AIService.knowledge = KnowledgeAIService;
AIService.policy = PolicyAIService;
