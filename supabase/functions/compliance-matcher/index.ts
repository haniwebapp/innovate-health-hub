
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
    const { innovationDescription, innovationType, standards } = await req.json();
    
    if (!innovationDescription) {
      throw new Error("Innovation description is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for compliance matching
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
              You are an AI expert in healthcare regulatory compliance.
              Your task is to evaluate how well a healthcare innovation matches with specific regulatory standards.
              For each standard, provide a match score and detailed analysis.
              Your response MUST be in valid JSON format as an array of objects with these fields:
              [
                {
                  "standardName": "Name of the standard",
                  "matchScore": number between 0-100,
                  "requiredActions": ["Action 1", "Action 2"],
                  "complianceEstimate": {
                    "percentCompliant": number between 0-100,
                    "missingElements": ["Missing element 1", "Missing element 2"]
                  }
                }
              ]
              Be specific to healthcare regulations and provide actionable insights.
            `
          },
          {
            role: "user",
            content: `
              Match this healthcare innovation against the following standards: ${standards.join(', ')}
              
              Innovation Description: ${innovationDescription}
              Innovation Type: ${innovationType || "Not specified"}
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
    const complianceMatches = JSON.parse(data.choices[0].message.content);

    // Return the compliance matches
    return new Response(
      JSON.stringify(complianceMatches),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in compliance-matcher function:", error);
    const standards = ["ISO 13485", "HIPAA", "GDPR", "MOH Standards"];
    
    // Provide fallback data in case of error
    const fallbackResponse = standards.map(standard => ({
      standardName: standard,
      matchScore: 0,
      requiredActions: ["Unable to analyze compliance requirements at this time."],
      complianceEstimate: {
        percentCompliant: 0,
        missingElements: ["Analysis failed"]
      }
    }));
    
    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
