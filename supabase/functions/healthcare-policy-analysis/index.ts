
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
    const { policyData, analysisType } = await req.json();
    
    if (!policyData) {
      throw new Error("Policy data is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    console.log(`Processing ${analysisType} analysis for policy: ${policyData.name}`);

    // Define different system prompts based on analysis type
    let systemPrompt = "";
    let responseFormat = {};

    if (analysisType === "stakeholder-impact") {
      systemPrompt = `
        You are a healthcare policy expert specializing in stakeholder impact analysis.
        Analyze the provided healthcare policy to identify potential impacts on different stakeholders.
        Focus on patients, healthcare providers, payers, government entities, and industry partners.
        Provide a numeric score (0-100) for each stakeholder group indicating the level of positive impact.
      `;
      responseFormat = {
        stakeholderImpacts: {
          patients: { score: 0, description: "" },
          providers: { score: 0, description: "" },
          payers: { score: 0, description: "" },
          government: { score: 0, description: "" },
          industry: { score: 0, description: "" }
        },
        overallAnalysis: "",
        recommendations: []
      };
    } else if (analysisType === "implementation-feasibility") {
      systemPrompt = `
        You are a healthcare implementation expert specializing in policy feasibility analysis.
        Analyze the provided healthcare policy to assess how feasible it is to implement.
        Consider technological requirements, workforce needs, financial implications, and timeline.
        Provide a feasibility score (0-100) with detailed rationale.
      `;
      responseFormat = {
        feasibilityScore: 0,
        technicalFeasibility: { score: 0, description: "" },
        financialFeasibility: { score: 0, description: "" },
        timelineFeasibility: { score: 0, description: "" },
        barriers: [],
        enablers: [],
        recommendations: []
      };
    } else {
      // Default to general policy analysis
      systemPrompt = `
        You are a healthcare policy expert specializing in healthcare innovation.
        Analyze the provided healthcare policy to evaluate its potential impact, alignment with best practices,
        and provide recommendations for improvement.
      `;
      responseFormat = {
        overallScore: 0,
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: []
      };
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: systemPrompt
          },
          {
            role: "user",
            content: `Analyze this healthcare policy: ${JSON.stringify(policyData)}`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    const analysisResult = JSON.parse(data.choices[0].message.content);
    
    console.log(`Analysis completed for ${policyData.name} with analysis type: ${analysisType}`);

    return new Response(
      JSON.stringify({ ...responseFormat, ...analysisResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in healthcare-policy-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
