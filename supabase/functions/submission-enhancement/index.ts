
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get OpenAI API key from environment variable
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    const { submissionText, challengeContext } = await req.json();
    
    if (!submissionText) {
      throw new Error("Submission text is required");
    }

    console.log(`Processing submission enhancement request${challengeContext ? ' with challenge context' : ''}`);

    // Call OpenAI API for submission enhancement suggestions
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are an AI healthcare innovation submission enhancement assistant.
              Your task is to analyze an innovation submission text and provide constructive, specific suggestions
              to enhance its quality, persuasiveness, and competitiveness.
              
              Focus on these aspects:
              1. Clarity and structure of the idea presentation
              2. Innovation value proposition
              3. Feasibility and implementation considerations
              4. Potential impact on healthcare
              5. Alignment with healthcare priorities and trends
              6. Technical accuracy and precision
              7. Evidence or research support
              
              Provide 5-7 specific enhancement suggestions.
              Each suggestion should be concise, specific, actionable and relevant.
              Format your response as a JSON array of strings containing only the suggestions.
            `
          },
          {
            role: "user",
            content: `
              ${challengeContext ? `Challenge Context: ${challengeContext}\n\n` : ''}
              Submission: ${submissionText}
              
              Please provide enhancement suggestions for this innovation submission.
            `
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    const suggestions = JSON.parse(data.choices[0].message.content);
    
    console.log(`Generated ${suggestions.length} enhancement suggestions`);

    // Return the enhancement suggestions
    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in submission-enhancement function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to generate enhancement suggestions",
        suggestions: [] 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
