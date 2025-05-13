
import { AIServiceType, AIOperationType } from "../AIServiceRegistry";

export class AICallTracer {
  private serviceType: AIServiceType;
  
  constructor(serviceType: AIServiceType) {
    this.serviceType = serviceType;
  }
  
  /**
   * Trace an AI operation with context
   */
  public async traceOperation<T>(
    operationType: AIOperationType,
    context: Record<string, any>,
    operationFn: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    const traceId = `${this.serviceType}-${operationType}-${startTime}-${Math.random().toString(36).substring(2, 9)}`;
    
    try {
      console.log(`[AICallTracer] Starting operation ${operationType} for ${this.serviceType} (${traceId})`);
      const result = await operationFn();
      
      const duration = Date.now() - startTime;
      console.log(`[AICallTracer] Completed operation ${operationType} in ${duration}ms (${traceId})`);
      
      // In a production environment we would record this trace to a database
      this.recordTrace({
        traceId,
        operationType,
        serviceType: this.serviceType,
        duration,
        status: 'success',
        timestamp: new Date().toISOString()
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[AICallTracer] Failed operation ${operationType} in ${duration}ms (${traceId})`, error);
      
      // Record error trace
      this.recordTrace({
        traceId,
        operationType,
        serviceType: this.serviceType,
        duration,
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }
  
  private recordTrace(traceData: any): void {
    // In a full implementation, this would write to a logging service or database
    // For now, just console log in development
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[AICallTracer] Trace recorded:', traceData);
    }
  }
}
