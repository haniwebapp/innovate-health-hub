
export enum AIServiceType {
  INVESTMENT = "investment",
  REGULATORY = "regulatory",
  INNOVATION = "innovation",
  KNOWLEDGE = "knowledge",
  POLICY = "policy"
}

export interface AIServiceStaticReferences {
  investment: any;
  regulatory: any;
  innovation: any;
  knowledge: any;
  policy: any;
}

import { CallTrace } from "@/types/ai";

export class AIService {
  // Define services container to avoid circular dependencies
  private static services: AIServiceStaticReferences = {
    investment: null,
    regulatory: null,
    innovation: null,
    knowledge: null,
    policy: null
  };
  
  // Getters for service access
  static get investment() { return this.services.investment; }
  static get regulatory() { return this.services.regulatory; }
  static get innovation() { return this.services.innovation; }
  static get knowledge() { return this.services.knowledge; }
  static get policy() { return this.services.policy; }
  
  // Setters for service initialization
  static set investment(service: any) { this.services.investment = service; }
  static set regulatory(service: any) { this.services.regulatory = service; }
  static set innovation(service: any) { this.services.innovation = service; }
  static set knowledge(service: any) { this.services.knowledge = service; }
  static set policy(service: any) { this.services.policy = service; }

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

// Import and register services AFTER defining AIService to avoid circular dependency
// The order matters here - define class first, then import dependencies, then register services
import { InvestmentAIService } from "./InvestmentAIService";
import { RegulatoryAIService } from "./RegulatoryAIService";
import { InnovationAIService } from "./InnovationAIService";
import { KnowledgeAIService } from "./KnowledgeAIService";
import { PolicyAIService } from "./PolicyAIService";

// Register service references
AIService.investment = InvestmentAIService;
AIService.regulatory = RegulatoryAIService;
AIService.innovation = InnovationAIService;
AIService.knowledge = KnowledgeAIService;
AIService.policy = PolicyAIService;
