
type ErrorWithMessage = {
  message: string;
};

/**
 * Type predicate to narrow an unknown error to one with a message property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * Helper function to convert unknown errors to error messages
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example
    return new Error(String(maybeError));
  }
}

/**
 * Gets a user-friendly error message from an unknown error
 */
export function getErrorMessage(error: unknown): string {
  const errorWithMessage = toErrorWithMessage(error);
  const message = errorWithMessage.message;
  
  // Handle specific error types
  if (message.includes("infinite recursion")) {
    return "Database policy error: Infinite recursion detected. Please check your Supabase Row Level Security policies for the profiles table.";
  }
  
  if (message.includes("new row violates row-level security policy")) {
    return "Permission error: You don't have access to perform this action according to the security policies.";
  }

  return `Error: ${message}`;
}
