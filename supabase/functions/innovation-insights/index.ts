
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for innovation insights and opportunities
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const innovationInsights = JSON.parse(data.choices[0].message.content);

    // Return the insights results
    return new Response(
      JSON.stringify(innovationInsights),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
