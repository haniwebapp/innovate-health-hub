
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
    const { submissionText, challengeContext } = await req.json();
    
    if (!submissionText) {
      throw new Error("Submission text is required");
    }

    console.log(`Processing submission enhancement request${challengeContext ? ' with challenge context' : ''}`);

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API for submission enhancement suggestions
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
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
      });

      const suggestions = JSON.parse(completion.choices[0].message.content || "{}");
      
      console.log(`Generated ${suggestions.length} enhancement suggestions`);

      // Return the enhancement suggestions
      return new Response(
        JSON.stringify({ suggestions }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
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
