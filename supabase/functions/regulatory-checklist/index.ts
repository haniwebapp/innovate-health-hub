
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
    const { innovationType, description, sector } = await req.json();
    
    if (!innovationType || !description) {
      throw new Error("Innovation type and description are required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for regulatory checklist generation
    try {
      console.log(`Generating regulatory checklist for ${innovationType} in ${sector || 'healthcare'} sector`);
      
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI regulatory expert specializing in healthcare innovation compliance in Saudi Arabia.
              Generate a detailed regulatory checklist for healthcare innovations based on the provided details.
              Your response MUST be in valid JSON format with these fields:
              {
                "checklist": [
                  {
                    "id": "unique_string_id",
                    "title": "Requirement title",
                    "description": "Detailed description",
                    "type": "document|test|approval|certification",
                    "priority": "high|medium|low",
                    "regulatoryBody": "Relevant regulatory authority",
                    "timelineEstimate": "Estimated time to complete"
                  }
                ],
                "regulatoryPathway": {
                  "name": "Name of the recommended pathway",
                  "description": "Description of the pathway",
                  "steps": ["Step 1", "Step 2", "Step 3"],
                  "estimatedTimeline": "Overall timeline estimate"
                },
                "keyConsiderations": ["Consideration 1", "Consideration 2"],
                "recommendedExperts": ["Expert type 1", "Expert type 2"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `
              Generate a regulatory checklist for this healthcare innovation:
              
              Type: ${innovationType}
              Description: ${description}
              ${sector ? `Sector: ${sector}` : ''}
              
              Provide a comprehensive checklist that covers all regulatory requirements in Saudi Arabia.
            `
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const checklistData = JSON.parse(completion.choices[0].message.content || "{}");

      // Return the checklist results
      return new Response(
        JSON.stringify(checklistData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in regulatory-checklist function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
