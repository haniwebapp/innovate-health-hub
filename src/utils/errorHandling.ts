
/**
 * Utility to extract a user-friendly error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  // Default error message
  let message = "An unexpected error occurred. Please try again.";
  
  // Handle Error objects
  if (error instanceof Error) {
    message = error.message;
    
    // Handle specific error patterns
    if (message.includes("infinite recursion")) {
      return "Database policy error: Infinite recursion detected in a security policy. Please check your database Row Level Security policies.";
    }
    
    if (message.includes("violates row-level security")) {
      return "Access denied: The current user doesn't have permission to perform this action based on Row Level Security policies.";
    }
    
    if (message.includes("JWSError") || message.includes("JWT")) {
      return "Authentication error: Your session might have expired. Try signing out and back in.";
    }
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    message = error;
  }
  
  // Handle object errors with message property
  if (error && typeof error === 'object' && 'message' in error) {
    message = String((error as { message: unknown }).message);
  }
  
  return message;
};

/**
 * Logs errors to console with additional context
 */
export const logError = (context: string, error: unknown): void => {
  console.error(`Error in ${context}:`, error);
  
  // You could extend this to send errors to a monitoring service
};
