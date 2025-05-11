
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
    const { innovationData, investorCriteria } = await req.json();
    
    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for advanced matching and analysis
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
              You are an AI investment matching analyst specializing in healthcare innovations.
              Analyze the innovation data and investor criteria to determine a match score and provide detailed justification.
              Your response MUST be in valid JSON format with these fields:
              {
                "matchScore": number between 0-100,
                "mainReasons": ["Reason 1", "Reason 2", "Reason 3"],
                "swotAnalysis": {
                  "strengths": ["strength 1", "strength 2"],
                  "weaknesses": ["weakness 1", "weakness 2"],
                  "opportunities": ["opportunity 1", "opportunity 2"],
                  "threats": ["threat 1", "threat 2"]
                },
                "recommendedApproach": "Brief strategy description for approaching this investor",
                "keyMetrics": ["Key metric 1", "Key metric 2", "Key metric 3"],
                "alignmentAreas": ["Area 1", "Area 2"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this innovation for investment match:
              Innovation Data: ${JSON.stringify(innovationData)}
              
              ${investorCriteria ? `Investor Criteria: ${JSON.stringify(investorCriteria)}` : 'Provide a general investment analysis.'}`
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
    const matchAnalysis = JSON.parse(data.choices[0].message.content);

    // Return the match results
    return new Response(
      JSON.stringify({
        matchScore: matchAnalysis.matchScore,
        mainReasons: matchAnalysis.mainReasons,
        swotAnalysis: matchAnalysis.swotAnalysis,
        recommendedApproach: matchAnalysis.recommendedApproach,
        keyMetrics: matchAnalysis.keyMetrics,
        alignmentAreas: matchAnalysis.alignmentAreas
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in investment-match function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
