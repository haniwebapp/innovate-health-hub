
import { checkAIServices } from "./utils/AIServiceHealth";
import { createTrace } from "./utils/AIServiceTracing";
import { handleError } from "./utils/AIServiceErrors";

export enum AIServiceType {
  INVESTMENT = "investment",
  REGULATORY = "regulatory",
  INNOVATION = "innovation",
  KNOWLEDGE = "knowledge",
  POLICY = "policy",
  CHALLENGE = "challenge",
  SUPPORT = "support",
  CLINICAL = "clinical",
  EVENTS = "events",
  ADMIN = "admin",
  COMPLIANCE = "compliance",
  COMMUNITY = "community"
}

export interface AIServiceStaticReferences {
  investment: any;
  regulatory: any;
  innovation: any;
  knowledge: any;
  policy: any;
  challenge: any;
  support: any;
  clinical: any;
  events: any;
  admin: any;
  compliance: any;
  community: any;
}

export class AIService {
  // Define services container to avoid circular dependencies
  private static services: AIServiceStaticReferences = {
    investment: null,
    regulatory: null,
    innovation: null,
    knowledge: null,
    policy: null,
    challenge: null,
    support: null,
    clinical: null,
    events: null,
    admin: null,
    compliance: null,
    community: null
  };
  
  // Getters for service access
  static get investment() { return this.services.investment; }
  static get regulatory() { return this.services.regulatory; }
  static get innovation() { return this.services.innovation; }
  static get knowledge() { return this.services.knowledge; }
  static get policy() { return this.services.policy; }
  static get challenge() { return this.services.challenge; }
  static get support() { return this.services.support; }
  static get clinical() { return this.services.clinical; }
  static get events() { return this.services.events; }
  static get admin() { return this.services.admin; }
  static get compliance() { return this.services.compliance; }
  static get community() { return this.services.community; }
  
  // Setters for service initialization
  static set investment(service: any) { this.services.investment = service; }
  static set regulatory(service: any) { this.services.regulatory = service; }
  static set innovation(service: any) { this.services.innovation = service; }
  static set knowledge(service: any) { this.services.knowledge = service; }
  static set policy(service: any) { this.services.policy = service; }
  static set challenge(service: any) { this.services.challenge = service; }
  static set support(service: any) { this.services.support = service; }
  static set clinical(service: any) { this.services.clinical = service; }
  static set events(service: any) { this.services.events = service; }
  static set admin(service: any) { this.services.admin = service; }
  static set compliance(service: any) { this.services.compliance = service; }
  static set community(service: any) { this.services.community = service; }
  
  /**
   * Check the health of all AI services
   * @returns Promise that resolves when all health checks are complete
   */
  static async checkAIServices(): Promise<void> {
    return checkAIServices();
  }

  /**
   * Handle errors from AI service operations in a standardized way
   * @param error Original error
   * @param operation Operation being performed
   * @param context Context in which the error occurred
   * @returns Error with standardized properties
   */
  static handleError = handleError;

  /**
   * Create a trace for AI operations
   */
  static createTrace = createTrace;

  /**
   * Log AI operations for monitoring
   */
  static logAIOperation = async (
    operation: string,
    context: string,
    input: any,
    output: any,
    userId?: string
  ): Promise<void> => {
    try {
      console.log(`AI Operation: ${operation}`, {
        context,
        input: JSON.stringify(input),
        output: JSON.stringify(output),
        userId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error logging AI operation:", error);
    }
  }
}
