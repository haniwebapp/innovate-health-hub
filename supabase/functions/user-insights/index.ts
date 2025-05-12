
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { userData } = await req.json();
    
    if (!userData || !Array.isArray(userData) || userData.length === 0) {
      throw new Error("User data is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Analyze user data
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI data analyst for a healthcare platform admin panel. Analyze the user data provided and generate insights.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "A brief summary of the user base",
                "userGroups": [{"name": "Group Name", "count": 5, "description": "Description of this user group"}],
                "recommendations": ["Recommendation 1", "Recommendation 2"]
              }
              Focus on identifying patterns in user types, organizations, activity status, admin vs regular users.
              Base your analysis on the data provided and make reasonable inferences.
              Provide 2-4 user groups and 2-4 actionable recommendations for platform administrators.
              Remember: Only return valid JSON - do not include any other text, markdown or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this user data and provide insights: ${JSON.stringify(userData)}`
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const insights = JSON.parse(completion.choices[0].message.content || "{}");

      return new Response(
        JSON.stringify(insights),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error: any) {
    console.error("Error in user-insights function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
