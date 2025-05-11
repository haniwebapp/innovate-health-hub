
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
    const { proposalText, criteria } = await req.json();
    
    if (!proposalText) {
      throw new Error("Proposal text is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
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
    
    // Call OpenAI API for multi-criteria analysis
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
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const scoreResult = JSON.parse(data.choices[0].message.content);
    
    console.log("Proposal scoring completed successfully");

    // Return the scoring results
    return new Response(
      JSON.stringify(scoreResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
