
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
    const { policyDetails, currentState, desiredState } = await req.json();
    
    if (!policyDetails || !policyDetails.title || !policyDetails.description) {
      throw new Error("Policy details are required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for strategy gap analysis
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI healthcare policy expert specializing in strategic gap analysis.
              Analyze the provided healthcare policy details, current state, and desired state to identify gaps.
              Your response MUST be in valid JSON format with these fields:
              {
                "gaps": [
                  {
                    "title": "Gap title",
                    "description": "Description of the gap",
                    "severity": "low/medium/high",
                    "potentialImpact": "Description of potential impact if not addressed"
                  }
                ],
                "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
                "overallAnalysis": "Overall analysis of the policy and key gaps to address"
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `
              Please analyze the following healthcare policy:
              
              Policy Title: ${policyDetails.title}
              Policy Description: ${policyDetails.description}
              Policy Objectives: ${policyDetails.objectives.join(", ")}
              ${policyDetails.targetSectors ? `Target Sectors: ${policyDetails.targetSectors.join(", ")}` : ""}
              ${currentState ? `Current State: ${currentState}` : ""}
              ${desiredState ? `Desired State: ${desiredState}` : ""}
              
              Identify strategic gaps between the policy's stated objectives and what would be needed to achieve optimal outcomes.
              Provide specific, actionable recommendations to address these gaps.
            `
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const gapAnalysis = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the gap analysis results
      return new Response(
        JSON.stringify(gapAnalysis),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in strategy-gap-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
