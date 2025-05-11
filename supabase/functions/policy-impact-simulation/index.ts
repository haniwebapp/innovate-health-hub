
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
    const requestBody = await req.json();
    const { policyData, simulationParams, trace } = requestBody;
    
    if (!policyData) {
      throw new Error("Policy data is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Default simulation parameters if not provided
    const timeframe = simulationParams?.timeframe || "5 years";
    const region = simulationParams?.region || "Saudi Arabia";
    
    console.log("Processing policy impact simulation request:", JSON.stringify({
      policyName: policyData.name,
      sector: policyData.sector,
      timeframe,
      region,
      traceId: trace?.traceId,
      operation: trace?.operation
    }));

    // Call OpenAI API for policy impact simulation
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
              You are an AI expert in healthcare policy analysis and impact simulation.
              Analyze the provided policy data to project its impact across various domains.
              Your response MUST be in valid JSON format with these fields:
              {
                "impactScore": number between 0-100 representing overall impact,
                "stakeholderImpact": {
                  "patients": {"score": number, "description": "impact description"},
                  "providers": {"score": number, "description": "impact description"},
                  "payers": {"score": number, "description": "impact description"},
                  "government": {"score": number, "description": "impact description"},
                  "industry": {"score": number, "description": "impact description"}
                },
                "economicImpact": "Detailed analysis of economic impact",
                "healthcareOutcomeImpact": "Analysis of impact on healthcare outcomes",
                "implementationComplexity": "Assessment of implementation difficulty",
                "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Simulate the impact of this healthcare policy:
              Name: ${policyData.name}
              Description: ${policyData.description}
              Sector: ${policyData.sector}
              ${policyData.stakeholders ? `Stakeholders: ${policyData.stakeholders.join(", ")}` : ''}
              ${policyData.goals ? `Goals: ${policyData.goals.join(", ")}` : ''}
              ${policyData.metrics ? `Metrics: ${policyData.metrics.join(", ")}` : ''}
              
              Simulation Parameters:
              Timeframe: ${timeframe}
              Region: ${region}
              
              Please provide a comprehensive impact analysis.`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const impactResult = JSON.parse(data.choices[0].message.content);
    
    console.log("Policy impact simulation completed:", JSON.stringify({
      policyName: policyData.name,
      impactScore: impactResult.impactScore,
      traceId: trace?.traceId,
      processingTime: `${Date.now() - (trace ? new Date(trace.timestamp).getTime() : Date.now())}ms`
    }));

    // Return the policy impact simulation results
    return new Response(
      JSON.stringify(impactResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in policy-impact-simulation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        impactScore: 0,
        stakeholderImpact: {},
        economicImpact: "Unable to analyze due to an error.",
        healthcareOutcomeImpact: "Unable to analyze due to an error.",
        implementationComplexity: "Unable to analyze due to an error.",
        recommendations: ["Analysis failed due to technical error."]
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
