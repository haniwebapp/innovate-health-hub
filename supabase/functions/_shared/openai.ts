
import OpenAI from "npm:openai@4.12.4";

// Create a reusable OpenAI client
export const createOpenAIClient = () => {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  
  return new OpenAI({
    apiKey,
  });
};

// Helper function to handle errors from the OpenAI API
export const handleOpenAIError = (error: unknown): never => {
  console.error("OpenAI API error:", error);
  
  if (error instanceof Error) {
    throw new Error(`OpenAI API error: ${error.message}`);
  }
  
  throw new Error("Unknown error occurred when calling OpenAI API");
};

// Consistent model names to use across the application
export const OPENAI_MODELS = {
  CHAT: "gpt-4o-mini", // Replacing older models like gpt-4-vision-preview
  CHAT_ADVANCED: "gpt-4o", // More powerful model for complex tasks
  TEXT_EMBEDDING: "text-embedding-3-small",
  DALLE: "dall-e-3",
};

// Helper to create a standard response with CORS headers
export const createResponse = (data: any, status = 200) => {
  return new Response(
    JSON.stringify(data),
    { 
      status,
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Content-Type': 'application/json'
      } 
    }
  );
};

// Helper to create a standard error response
export const createErrorResponse = (error: Error | string, status = 500) => {
  const message = typeof error === 'string' ? error : error.message;
  return createResponse({ error: message }, status);
};

// Standard CORS headers for all functions
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Standard CORS preflight response
export const handleCorsPreflightRequest = (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
};
