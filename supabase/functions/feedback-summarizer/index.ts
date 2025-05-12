
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS } from "../_shared/openai.ts";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { feedbackItems } = await req.json();
    
    if (!feedbackItems || !Array.isArray(feedbackItems) || feedbackItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Valid feedback items array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    // Call OpenAI API to summarize feedback using the SDK
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `Analyze the following support tickets and feedback items from a healthcare innovation platform.
                      Provide a comprehensive summary of user sentiment, common issues, and actionable insights.
                      
                      Return the following in JSON format:
                      1. summary: A 2-3 paragraph summary of the overall feedback
                      2. sentimentBreakdown: Count of positive, neutral, and negative feedback items
                      3. commonThemes: Array of up to 5 common themes or issues
                      4. recommendations: Array of up to 5 actionable recommendations based on the feedback`
          },
          {
            role: "user",
            content: feedbackItems.join("\n\n---\n\n")
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });
      
      const analysis = JSON.parse(completion.choices[0].message.content || "{}");
      
      // Return analysis
      return new Response(
        JSON.stringify(analysis),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Feedback summarization error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to summarize feedback",
        details: error.message,
        summary: "Error analyzing feedback",
        sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
        commonThemes: ["Unable to analyze themes"],
        recommendations: ["Try again with a smaller dataset"]
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
