
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
    const { innovationDescription, sector, userImpact, dataCollection, targetUsers } = await req.json();
    
    if (!innovationDescription) {
      throw new Error("Innovation description is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for ethics assessment
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
              You are an AI healthcare ethics expert specializing in evaluating healthcare innovations from an ethical perspective.
              Analyze the provided healthcare innovation information to provide a comprehensive ethics assessment.
              Your response MUST be in valid JSON format with these fields:
              {
                "ethicsScore": number between 0-100,
                "risks": [
                  {"category": "Risk category", "description": "Risk description", "severity": "low/medium/high", "mitigationSteps": ["Step 1", "Step 2"]}
                ],
                "recommendations": ["Recommendation 1", "Recommendation 2"],
                "requiredActions": ["Required action 1", "Required action 2"]
              }
              Focus on data privacy, patient safety, inclusivity, consent, and equity considerations.
            `
          },
          {
            role: "user",
            content: `
              Assess the ethics of this healthcare innovation:
              Description: ${innovationDescription}
              Sector: ${sector || "Not specified"}
              Target Users: ${Array.isArray(targetUsers) ? targetUsers.join(", ") : (targetUsers || "Not specified")}
              User Impact: ${userImpact || "Not specified"}
              Data Collection: ${dataCollection || "Not specified"}
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
    const ethicsAssessment = JSON.parse(data.choices[0].message.content);

    // Return the ethics assessment
    return new Response(
      JSON.stringify(ethicsAssessment),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ethics-assessment function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred during ethics assessment",
        ethicsScore: 50,
        risks: [
          {
            category: "Assessment Error", 
            description: "Unable to complete the ethics assessment", 
            severity: "medium", 
            mitigationSteps: ["Try again later", "Contact support if the issue persists"]
          }
        ],
        recommendations: ["Unable to provide recommendations at this time"],
        requiredActions: ["Try submitting the analysis again with more detailed information"]
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
