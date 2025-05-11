
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Vision 2030 pillars for reference
const vision2030Pillars = [
  {
    name: "Vibrant Society",
    areas: ["Healthcare", "Education", "Culture", "Entertainment", "Living standards", "Environment", "Community development"]
  },
  {
    name: "Thriving Economy",
    areas: ["Employment", "Innovation", "Investment", "Economic opportunities", "Small business development", "Non-oil industries", "Logistics"]
  },
  {
    name: "Ambitious Nation",
    areas: ["Governance", "Effectiveness", "Transparency", "Enablement", "Social responsibility", "Sustainability"]
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { policyData } = await req.json();
    
    if (!policyData) {
      throw new Error("Policy data is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for Vision 2030 alignment analysis
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
              You are an AI expert on Saudi Vision 2030 focusing on healthcare innovation and policy.
              Analyze the provided policy or innovation data to determine its alignment with Vision 2030 pillars.
              Your response MUST be in valid JSON format with these fields:
              {
                "overallScore": number between 0-100 representing overall alignment,
                "alignmentDetails": [
                  {
                    "pillar": "Pillar name (Vibrant Society, Thriving Economy, or Ambitious Nation)",
                    "score": number between 0-100 for this pillar,
                    "relevance": "Description of how this policy aligns with the pillar",
                    "opportunities": ["Opportunity 1 to strengthen alignment", "Opportunity 2", "Opportunity 3"]
                  }
                ],
                "recommendations": ["Recommendation 1 to improve alignment", "Recommendation 2", "Recommendation 3"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this policy/innovation for Vision 2030 alignment:
              Name: ${policyData.name}
              Description: ${policyData.description}
              Sector: ${policyData.sector}
              ${policyData.stakeholders ? `Stakeholders: ${policyData.stakeholders.join(", ")}` : ''}
              ${policyData.goals ? `Goals: ${policyData.goals.join(", ")}` : ''}
              ${policyData.metrics ? `Metrics: ${policyData.metrics.join(", ")}` : ''}
              
              Vision 2030 Pillars for reference:
              1. Vibrant Society: Healthcare, Education, Culture, Entertainment, Living standards, Environment, Community development
              2. Thriving Economy: Employment, Innovation, Investment, Economic opportunities, Small business development, Non-oil industries, Logistics
              3. Ambitious Nation: Governance, Effectiveness, Transparency, Enablement, Social responsibility, Sustainability`
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
    const alignmentResult = JSON.parse(data.choices[0].message.content);

    // Return the alignment analysis results
    return new Response(
      JSON.stringify(alignmentResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in vision-2030-alignment function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        overallScore: 0,
        alignmentDetails: [],
        recommendations: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
