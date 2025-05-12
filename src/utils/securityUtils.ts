
/**
 * Security utilities for enhancing application security
 */

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  // Basic HTML sanitization
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Validates that a file meets security requirements
 */
export function validateFileUpload(file: File, allowedTypes: string[] = [], maxSizeMB: number = 5): boolean {
  // Check file size
  const fileSizeInMB = file.size / (1024 * 1024);
  if (fileSizeInMB > maxSizeMB) {
    console.error(`File size exceeds ${maxSizeMB}MB limit`);
    return false;
  }
  
  // Check file type if allowedTypes is provided
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    console.error(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    return false;
  }
  
  return true;
}

/**
 * Generates a secure request ID for tracing
 */
export function generateSecureRequestId(): string {
  // Create a random UUID for request tracking
  return crypto.randomUUID();
}

/**
 * Safely parses JSON with error handling
 */
export function safeJSONParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON string:', error);
    return fallback;
  }
}

/**
 * Implements Content-Security-Policy headers check
 */
export function checkCSPCompliance(): boolean {
  // Check if CSP headers are properly set
  const cspHeader = document.head.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!cspHeader) {
    console.warn('No Content-Security-Policy meta tag found');
    return false;
  }
  return true;
}
