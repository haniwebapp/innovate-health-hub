
import OpenAI from "https://deno.land/x/openai@v4.20.1/mod.ts";

export const OPENAI_MODELS = {
  CHAT: "gpt-4o-mini", // Default model for most interactions
  ADVANCED: "gpt-4o",   // Higher quality but more expensive 
};

export function createOpenAIClient() {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key. Please set the OPENAI_API_KEY environment variable.");
  }
  
  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
}

export function handleOpenAIError(error: any, corsHeaders: Record<string, string> = {}) {
  console.error("OpenAI API error:", error);
  
  let statusCode = 500;
  let errorMessage = "An error occurred while processing your request";
  
  if (error?.status === 429) {
    statusCode = 429;
    errorMessage = "Rate limit exceeded. Please try again later.";
  } else if (error?.status === 400) {
    statusCode = 400;
    errorMessage = "Invalid request to AI service.";
  } else if (error?.status === 401) {
    statusCode = 401;
    errorMessage = "Authentication error with AI service.";
  }
  
  const responseHeaders = {
    'Content-Type': 'application/json',
    ...corsHeaders
  };
  
  return new Response(
    JSON.stringify({ error: errorMessage, details: error?.message }),
    { status: statusCode, headers: responseHeaders }
  );
}
