
// OpenAI client creation and shared utilities

// Constants for OpenAI models
export const OPENAI_MODELS = {
  CHAT: "gpt-4o-mini",
  EMBEDDING: "text-embedding-ada-002"
};

// Create OpenAI client
export function createOpenAIClient() {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable not found');
  }

  // Import OpenAI
  const { OpenAI } = require("https://esm.sh/openai@4.20.1");
  
  // Create and configure client
  const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  
  return client;
}

// Handle OpenAI errors
export function handleOpenAIError(error: any) {
  console.error('OpenAI API error:', error);
  
  const errorMessage = error.response?.data?.error?.message || 
                      error.message || 
                      'Unknown error occurred when calling OpenAI API';
  
  const statusCode = error.response?.status || 500;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
  
  return new Response(
    JSON.stringify({ 
      error: errorMessage,
      status: statusCode
    }),
    { 
      status: statusCode, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}
