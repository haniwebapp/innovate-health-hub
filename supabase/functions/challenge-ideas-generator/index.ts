
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
    const { sector, focus } = await req.json();
    
    if (!sector) {
      throw new Error("Sector parameter is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for challenge ideas
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
              You are an AI healthcare innovation expert specializing in generating healthcare challenge ideas.
              For the provided sector and focus area, generate 3-5 innovative healthcare challenge ideas.
              Your response MUST be in valid JSON format with an array of challenge ideas containing:
              [
                {
                  "title": "Challenge title",
                  "description": "Brief description of the challenge",
                  "potentialImpact": "Description of the potential impact",
                  "targetAudience": "Who should tackle this challenge",
                  "estimatedDifficulty": "Easy/Medium/High",
                  "relevantTags": ["tag1", "tag2", "tag3"],
                  "vision2030Alignment": "How this aligns with Saudi Vision 2030"
                }
              ]
              Remember: Only return valid JSON array - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Generate innovative healthcare challenge ideas for the ${sector} sector${
              focus ? ` with a focus on ${focus}` : ""
            }.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const challengeIdeas = JSON.parse(data.choices[0].message.content);

    // Return the challenge ideas
    return new Response(
      JSON.stringify(challengeIdeas),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in challenge-ideas-generator function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
