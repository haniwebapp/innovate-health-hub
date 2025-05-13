
import { CallTrace } from "../AIService";
import { AIOperationType } from "../types/AIServiceTypes";

export interface TraceOptions {
  includeInput?: boolean;
  includeOutput?: boolean;
  userId?: string;
}

/**
 * Utility for tracing AI service calls
 */
export class AICallTracer {
  private static traces: CallTrace[] = [];
  private static maxTraces: number = 100;
  
  /**
   * Record a trace for an AI operation
   */
  static recordTrace(trace: CallTrace): void {
    // Add to in-memory store
    AICallTracer.traces.unshift(trace);
    
    // Trim if exceeds max
    if (AICallTracer.traces.length > AICallTracer.maxTraces) {
      AICallTracer.traces = AICallTracer.traces.slice(0, AICallTracer.maxTraces);
    }
    
    // Log for debugging
    console.log(`AI Call Trace: ${trace.action}`, {
      success: trace.success,
      timestamp: trace.timestamp,
      error: trace.error || 'none'
    });
  }
  
  /**
   * Create a trace
   */
  static createTrace(
    service: string,
    operation: AIOperationType, 
    input?: any,
    options: TraceOptions = {}
  ): CallTrace {
    return {
      userId: options.userId,
      action: `${service}.${operation}`,
      parameters: options.includeInput ? input : undefined,
      timestamp: new Date().toISOString(),
      success: true,
      operation: operation
    };
  }
  
  /**
   * Get recent traces
   */
  static getRecentTraces(limit: number = 10): CallTrace[] {
    return AICallTracer.traces.slice(0, limit);
  }
  
  /**
   * Clear all traces
   */
  static clearTraces(): void {
    AICallTracer.traces = [];
  }
}
