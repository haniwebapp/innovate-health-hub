
/**
 * Standard format for error handling in AI services
 */
export interface AIServiceError {
  message: string;
  operation: string;
  context: string;
  originalError?: any;
  timestamp: string;
}

/**
 * Create a standard error object for AI service errors
 * @param error Original error
 * @param operation Operation being performed
 * @param context Context in which the error occurred
 * @returns Standardized AIServiceError
 */
export function createAIServiceError(
  error: any,
  operation: string,
  context: string
): AIServiceError {
  return {
    message: error.message || 'Unknown AI service error',
    operation,
    context,
    originalError: error,
    timestamp: new Date().toISOString()
  };
}

/**
 * Handle errors from AI service operations in a standardized way
 * @param error Original error
 * @param operation Operation being performed
 * @param context Context in which the error occurred
 * @returns Error with standardized properties
 */
export function handleError(error: any, operation: string, context: string): Error {
  console.error(`AI Service Error [${operation}] in ${context}:`, error);
  
  // Create standardized error
  const serviceError = createAIServiceError(error, operation, context);
  
  // Create a new error with the message from the original
  const handledError = new Error(serviceError.message);
  
  // Attach the service error data
  (handledError as any).serviceError = serviceError;
  
  return handledError;
}
