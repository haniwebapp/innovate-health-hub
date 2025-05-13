
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS, handleCorsPreflightRequest, createResponse, createErrorResponse } from "../_shared/openai.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCorsPreflightRequest(req);
  if (corsResponse) return corsResponse;

  try {
    const { prompt, size = "1024x1024", style = "natural" } = await req.json();
    
    if (!prompt) {
      return createErrorResponse("Prompt is required", 400);
    }
    
    console.log(`Processing image generation request: ${prompt.substring(0, 50)}...`);

    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    try {
      const response = await openai.images.generate({
        model: OPENAI_MODELS.DALLE,
        prompt: prompt,
        n: 1,
        size: size,
        style: style,
      });
      
      const imageUrl = response.data[0]?.url;
      
      if (!imageUrl) {
        return createErrorResponse("No image was generated");
      }
      
      console.log("Image generated successfully");
      
      return createResponse({ imageUrl });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in image-generator function:", error);
    return createErrorResponse("Failed to generate image");
  }
});
