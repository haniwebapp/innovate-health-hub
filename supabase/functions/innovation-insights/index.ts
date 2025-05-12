
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS } from "../_shared/openai.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { innovationData } = await req.json();
    
    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for innovation insights and opportunities
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI healthcare innovation expert specializing in market analysis and strategic innovation development.
              Analyze the provided innovation data to deliver strategic insights and market opportunities.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "Brief summary of innovation potential",
                "innovationScore": number between 0-100,
                "disruptionPotential": "Low", "Medium", or "High",
                "marketOpportunities": [
                  {"opportunity": "Opportunity description", "relevance": "Explanation", "potentialImpact": "Low/Medium/High"},
                  {"opportunity": "Opportunity description", "relevance": "Explanation", "potentialImpact": "Low/Medium/High"}
                ],
                "competitiveLandscape": {
                  "directCompetitors": ["Competitor 1", "Competitor 2"],
                  "indirectCompetitors": ["Competitor 1", "Competitor 2"],
                  "uniqueSellingPoints": ["USP 1", "USP 2"]
                },
                "technicalRecommendations": ["Recommendation 1", "Recommendation 2"],
                "implementationChallenges": ["Challenge 1", "Challenge 2"],
                "scalingPathway": {
                  "phase1": "Description",
                  "phase2": "Description",
                  "phase3": "Description"
                },
                "collaborationOpportunities": ["Opportunity 1", "Opportunity 2"],
                "fundingConsiderations": "Funding strategy suggestions",
                "vision2030Impact": "How this innovation can contribute to Saudi Vision 2030"
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this healthcare innovation for strategic insights:
              Innovation Data: ${JSON.stringify(innovationData)}`
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      });

      const innovationInsights = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the insights results
      return new Response(
        JSON.stringify(innovationInsights),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in innovation-insights function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
