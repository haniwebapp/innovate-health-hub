
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
    const { innovationStage, innovationType, challenges, goals } = await req.json();
    
    if (!innovationStage || !innovationType) {
      throw new Error("Innovation stage and type are required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for innovation guidance
    try {
      console.log(`Generating innovation guidance for ${innovationType} at ${innovationStage} stage`);
      
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI healthcare innovation expert specializing in guiding healthcare innovators in Saudi Arabia.
              Generate personalized guidance for healthcare innovators based on their current stage and challenges.
              Your response MUST be in valid JSON format with these fields:
              {
                "nextSteps": [
                  {
                    "title": "Step title",
                    "description": "Detailed description",
                    "priority": "high|medium|low",
                    "resources": ["Resource 1", "Resource 2"]
                  }
                ],
                "commonPitfalls": [
                  {
                    "title": "Pitfall title",
                    "description": "Description of the pitfall",
                    "avoidanceStrategy": "How to avoid this pitfall"
                  }
                ],
                "marketInsights": {
                  "opportunities": ["Opportunity 1", "Opportunity 2"],
                  "challenges": ["Challenge 1", "Challenge 2"],
                  "keyPlayerTypes": ["Player type 1", "Player type 2"]
                },
                "resourceRecommendations": {
                  "expertTypes": ["Expert type 1", "Expert type 2"],
                  "tools": ["Tool 1", "Tool 2"],
                  "knowledgeAreas": ["Knowledge area 1", "Knowledge area 2"]
                },
                "timelineEstimate": {
                  "nextMilestone": "Description of next milestone",
                  "estimatedTimeframe": "Estimated timeframe"
                }
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `
              Generate innovation guidance for:
              
              Stage: ${innovationStage}
              Type: ${innovationType}
              ${challenges ? `Challenges: ${challenges}` : ''}
              ${goals ? `Goals: ${goals}` : ''}
              
              Provide personalized guidance to help this healthcare innovator succeed in Saudi Arabia.
            `
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const guidanceData = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the guidance results
      return new Response(
        JSON.stringify(guidanceData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in innovation-guide function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
