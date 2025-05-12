
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
    const { proposalText, criteria } = await req.json();
    
    if (!proposalText) {
      throw new Error("Proposal text is required");
    }

    console.log("Processing proposal scoring request");
    
    // Default criteria if none specified
    const defaultCriteria = [
      "innovation",
      "feasibility",
      "impact",
      "scalability",
      "sustainability"
    ];
    
    const scoringCriteria = criteria || defaultCriteria;
    
    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    // Call OpenAI API for multi-criteria analysis
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI proposal evaluator specializing in healthcare innovations.
              Analyze the innovation proposal and score it on each criterion using a scale of 0-100.
              Provide detailed justification for each score and suggestions for improvement.
              Your response MUST be in valid JSON format with these fields:
              {
                "overallScore": number between 0-100,
                "criteria": {
                  "innovation": number,
                  "feasibility": number,
                  "impact": number,
                  "scalability": number,
                  "sustainability": number,
                  ... (other criteria as provided)
                },
                "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
                "vision2030Alignment": number between 0-100
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `
              Analyze this healthcare innovation proposal:
              
              ${proposalText}
              
              Score it based on these criteria: ${scoringCriteria.join(", ")}
            `
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      });

      const scoreResult = JSON.parse(completion.choices[0].message.content || "{}");
      
      console.log("Proposal scoring completed successfully");

      // Return the scoring results
      return new Response(
        JSON.stringify(scoreResult),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in proposal-scoring function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        overallScore: 0,
        criteria: {},
        strengths: [],
        improvements: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
