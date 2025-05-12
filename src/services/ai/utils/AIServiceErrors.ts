
/**
 * Standardize error handling for AI services
 */
export function handleError(error: any, operation: string, context: string): Error {
  console.error(`AI Error in ${operation} (${context}):`, error);
  
  // Create standardized error message
  const message = error?.message || "An error occurred while processing the AI request";
  const enhancedError = new Error(`${operation} failed: ${message}`);
  
  // Add context for debugging
  (enhancedError as any).context = context;
  (enhancedError as any).originalError = error;
  
  return enhancedError;
}
