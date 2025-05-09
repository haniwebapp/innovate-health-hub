
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    // Analyze user data
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    let insights;
    
    try {
      // Parse the content from OpenAI response
      insights = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      console.error("Error parsing OpenAI response as JSON:", e);
      insights = {
        summary: "Failed to analyze user data properly.",
        userGroups: [{ 
          name: "All Users", 
          count: userData.length, 
          description: "All platform users" 
        }],
        recommendations: ["Request a new analysis as the current one failed."]
      };
    }

    return new Response(
      JSON.stringify(insights),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
