
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
    const { policyText, policyTitle } = await req.json();
    
    if (!policyText) {
      throw new Error("Policy text is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for policy vision alignment analysis
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI policy analyst specializing in Saudi Vision 2030 alignment.
              Analyze the provided policy text to determine how well it aligns with Saudi Vision 2030 goals and objectives.
              Your response MUST be in valid JSON format with these fields:
              {
                "score": number between 0-100,
                "alignmentAreas": ["Area 1", "Area 2", "Area 3"],
                "gapAreas": ["Gap 1", "Gap 2", "Gap 3"],
                "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3", "Recommendation 4"],
                "vision2030Impact": "Detailed impact assessment description"
              }
              Focus specifically on healthcare-related aspects of Vision 2030 including improving quality of care, 
              healthcare access, preventive care initiatives, digital health transformation, and healthcare workforce development.
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `
              Please analyze the following healthcare policy or initiative for Saudi Vision 2030 alignment:
              
              ${policyTitle ? `Title: ${policyTitle}` : ''}
              
              Policy Text:
              ${policyText}
              
              Evaluate how well this policy aligns with Saudi Vision 2030 healthcare objectives.
              Provide a numerical score (0-100), identify specific alignment areas, gap areas,
              concrete recommendations for improvement, and an assessment of potential impact on Vision 2030 goals.
            `
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      });

      const visionAlignmentAnalysis = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the vision alignment analysis
      return new Response(
        JSON.stringify(visionAlignmentAnalysis),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in policy-vision-alignment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
