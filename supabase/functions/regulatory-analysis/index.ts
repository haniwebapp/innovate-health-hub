
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
    const { innovationData } = await req.json();
    
    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for regulatory compliance analysis
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI healthcare regulatory compliance expert specializing in Saudi Arabian and international healthcare regulations.
              Analyze the provided innovation data to provide regulatory compliance analysis and guidance.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "Brief summary of regulatory considerations",
                "complianceScore": number between 0-100,
                "riskLevel": "Low", "Medium", or "High",
                "keyRequirements": [
                  {"requirement": "Requirement 1", "status": "Required", "complexity": "Low/Medium/High", "estimatedTime": "Estimated time to fulfill"},
                  {"requirement": "Requirement 2", "status": "Required", "complexity": "Low/Medium/High", "estimatedTime": "Estimated time to fulfill"}
                ],
                "applicableRegulations": [
                  {"name": "Regulation name", "authority": "Regulatory body", "relevance": "Why this applies"},
                  {"name": "Regulation name", "authority": "Regulatory body", "relevance": "Why this applies"}
                ],
                "documentationNeeded": ["Document 1", "Document 2", "Document 3"],
                "testingRequirements": ["Test 1", "Test 2", "Test 3"],
                "complianceTimeline": {
                  "preparationPhase": "Duration",
                  "submissionPhase": "Duration",
                  "reviewPhase": "Duration",
                  "approvalPhase": "Duration",
                  "totalEstimatedTime": "Total duration"
                },
                "nextSteps": ["Step 1", "Step 2", "Step 3"],
                "internationalConsiderations": "International regulatory considerations",
                "vision2030Alignment": "How this aligns with Saudi Vision 2030 healthcare goals"
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this healthcare innovation for regulatory compliance:
              Innovation Data: ${JSON.stringify(innovationData)}`
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      });

      const regulatoryAnalysis = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the analysis results
      return new Response(
        JSON.stringify(regulatoryAnalysis),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in regulatory-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
