import { CallTrace } from "../types/AIServiceTypes";

// Keep track of which operations we've already logged
const loggedOperations = new Set<string>();

// Only log each unique operation once per session to reduce overhead
const shouldLogOperation = (operationId: string): boolean => {
  if (loggedOperations.has(operationId)) {
    return false;
  }
  loggedOperations.add(operationId);
  return true;
};

/**
 * Creates a standardized trace object for AI operation tracking
 */
export function createTrace(operation: string, context: string): CallTrace {
  return {
    operation,
    context,
    traceId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    metadata: {}
  };
}

/**
 * Centralized method for logging AI operations with performance optimization
 */
export async function logAIOperation(
  operation: string, 
  context: string, 
  input: any, 
  output: any, 
  userId?: string
): Promise<void> {
  try {
    // Generate a unique operation key
    const operationId = `${operation}-${context}-${JSON.stringify(input).substring(0, 50)}`;
    
    // Reduce logging frequency
    if (!shouldLogOperation(operationId)) {
      return;
    }
    
    // Use a lightweight version of the input and output for logging
    const lightInput = typeof input === 'object' ? 
      { type: input.constructor.name, summary: JSON.stringify(input).substring(0, 100) } : 
      input;
    
    const lightOutput = typeof output === 'object' ? 
      { type: output.constructor.name, summary: JSON.stringify(output).substring(0, 100) } : 
      output;
    
    console.log(`AI Operation: ${operation}`, {
      context,
      input: lightInput,
      output: lightOutput,
      userId,
      timestamp: new Date().toISOString()
    });
    
    // Use background processing for detailed logging
    setTimeout(() => {
      // In a full implementation, this would log to a dedicated table
      // but we're keeping it lightweight to improve performance
    }, 0);
  } catch (error) {
    // Don't let logging errors affect the main application flow
    console.error("Error logging AI operation:", error);
  }
}

/**
 * Get feedback on AI operation for continuous improvement
 * Uses debouncing to prevent excessive database operations
 */
let feedbackQueue: any[] = [];
let feedbackTimeout: NodeJS.Timeout | null = null;

export async function recordFeedback(
  operationId: string, 
  rating: number, 
  comments?: string, 
  userId?: string
): Promise<void> {
  try {
    // Add to queue instead of immediate processing
    feedbackQueue.push({
      operationId,
      rating,
      comments,
      userId,
      timestamp: new Date().toISOString()
    });
    
    // Process feedback in batches 
    if (!feedbackTimeout) {
      feedbackTimeout = setTimeout(() => {
        processFeedbackBatch();
      }, 5000); // Batch process every 5 seconds
    }
  } catch (error) {
    console.error("Error recording AI feedback:", error);
  }
}

// Process feedback in batches to improve performance
async function processFeedbackBatch(): Promise<void> {
  try {
    const batchToProcess = [...feedbackQueue];
    feedbackQueue = [];
    feedbackTimeout = null;
    
    if (batchToProcess.length === 0) return;
    
    console.log(`Processing ${batchToProcess.length} AI feedback items`);
    // In a full implementation, this would store feedback in a dedicated table
  } catch (error) {
    console.error("Error batch processing feedback:", error);
  }
}
