
import { AIServiceType } from "./AIServiceRegistry";
import { AIServiceStaticReferences, CallTrace } from "./types/AIServiceTypes";
import { handleError } from "./utils/AIServiceErrors";

export abstract class AIService {
  abstract serviceType: AIServiceType;
  
  constructor() {}
  
  abstract isAvailable(): Promise<boolean>;
  
  abstract getStaticReferences(): AIServiceStaticReferences;
  
  abstract recordCall(trace: CallTrace): Promise<void>;
  
  // Static utility methods
  static createTrace(operation: string, context: string): CallTrace {
    return {
      traceId: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      operation,
      context,
      timestamp: new Date().toISOString(),
      metadata: {}
    };
  }
  
  static async logAIOperation(
    operation: string,
    context: string,
    input: any,
    output: any,
    error?: any
  ): Promise<void> {
    console.log(`AI Operation Log: ${operation} (${context})`);
    // In a real implementation, this would log to a database
  }
  
  static handleError(error: any, operation: string, context: string): Error {
    return handleError(error, operation, context);
  }
}
