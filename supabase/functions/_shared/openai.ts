
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
  TEXT_EMBEDDING: "text-embedding-3-small",
  DALLE: "dall-e-3",
};
