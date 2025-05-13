
// Base interface for all AI services
export interface AIService {
  serviceType: AIServiceType;
  isAvailable(): Promise<boolean>;
  getStaticReferences(): AIServiceStaticReferences;
  recordCall(trace: CallTrace): Promise<void>;
}

export enum AIServiceType {
  Admin = "admin",
  Clinical = "clinical",
  Community = "community",
  Compliance = "compliance",
  Events = "events",
  Innovation = "innovation",
  Regulatory = "regulatory",
  Strategy = "strategy",
  Vision = "vision",
  Chat = "chat",
  Policy = "policy",
  Knowledge = "knowledge",
  Investment = "investment",
  Support = "support",
  Quotation = "quotation"
}

export interface CallTrace {
  userId?: string;
  action: string;
  parameters?: Record<string, any>;
  timestamp: string;
  result?: string;
  success: boolean;
  error?: string;
  operation?: string;
  context?: string;
}

export interface AIServiceStaticReferences {
  [key: string]: any;
}

// Add AIService utility class for static methods
export class AIServiceUtils {
  static createTrace(action: string, context?: string): CallTrace {
    return {
      action,
      context,
      timestamp: new Date().toISOString(),
      success: true
    };
  }
  
  static async logAIOperation(
    action: string,
    context: string,
    parameters?: Record<string, any>,
    result?: any,
    error?: Error
  ): Promise<void> {
    console.log(`AI Operation: ${action}, Context: ${context}`, parameters);
  }
  
  static handleError(error: Error, operation: string, service: string): Error {
    console.error(`Error in ${service} service (${operation}):`, error);
    return error;
  }
}
