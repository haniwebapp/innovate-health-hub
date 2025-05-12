
import { toast } from 'sonner';

export class ErrorHandlingService {
  /**
   * Logs error to console and optional monitoring service
   */
  static logError(error: any, context: string = 'application'): void {
    console.error(`[${context}]`, error);
    
    // Here you could add integration with error monitoring services
    // like Sentry, LogRocket, etc.
  }
  
  /**
   * Handles application errors with appropriate user feedback
   */
  static handleError(error: any, context: string = 'application'): void {
    this.logError(error, context);
    
    // Provide user-friendly error message
    const message = this.getErrorMessage(error);
    
    toast.error(message, {
      description: 'Please try again or contact support if the issue persists.'
    });
  }
  
  /**
   * Extracts a user-friendly message from various error types
   */
  private static getErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    return 'An unexpected error occurred';
  }
}
