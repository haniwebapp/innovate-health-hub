
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS, handleCorsPreflightRequest, createResponse, createErrorResponse } from "../_shared/openai.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCorsPreflightRequest(req);
  if (corsResponse) return corsResponse;

  try {
    const { text, mode = "text" } = await req.json();
    
    if (!text) {
      return createErrorResponse("Text input is required", 400);
    }
    
    console.log(`Processing embedding request for ${mode} content`);

    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    try {
      const response = await openai.embeddings.create({
        model: OPENAI_MODELS.TEXT_EMBEDDING,
        input: text,
        encoding_format: "float"
      });
      
      const embedding = response.data[0].embedding;
      
      console.log("Embedding generated successfully");
      
      return createResponse({ 
        embedding,
        dimensions: embedding.length
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in text-embeddings function:", error);
    return createErrorResponse("Failed to generate embedding");
  }
});
