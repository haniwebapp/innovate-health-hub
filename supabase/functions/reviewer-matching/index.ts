
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
    const { challengeDescription, requiredExpertise } = await req.json();
    
    if (!challengeDescription || !requiredExpertise || !Array.isArray(requiredExpertise)) {
      throw new Error("Challenge description and required expertise array are required");
    }

    console.log(`Processing reviewer matching for challenge with expertise areas: ${requiredExpertise.join(', ')}`);

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API to find matching reviewers
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: `
              You are an AI reviewer matching system for healthcare innovation challenges.
              Given a challenge description and required expertise areas, identify suitable reviewers.
              For this demo, generate 5 fictional reviewers with relevant expertise.
              Each reviewer should have:
              1. A unique ID
              2. A match score (0-100)
              3. A match reason explaining why they're a good fit
              4. A list of their expertise areas (should overlap with the required expertise)
              
              Return the results as valid JSON in this format:
              [
                {
                  "reviewerId": "string",
                  "matchScore": number,
                  "matchReason": "string",
                  "expertise": ["string"]
                }
              ]
              Note: Do not include extra text in your response, just the JSON array.
            `
          },
          {
            role: "user",
            content: `
              Challenge Description: ${challengeDescription}
              
              Required Expertise: ${requiredExpertise.join(', ')}
              
              Generate 5 suitable reviewer matches.
            `
          }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const reviewerMatches = JSON.parse(completion.choices[0].message.content || "[]");
      
      console.log(`Generated ${reviewerMatches.length} potential reviewer matches`);

      // Return the reviewer matches
      return new Response(
        JSON.stringify(reviewerMatches),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in reviewer-matching function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to match reviewers",
        reviewers: [] 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
