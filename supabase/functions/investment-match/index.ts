
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
    const { innovationData, investorCriteria } = await req.json();

    // Log the received data for debugging
    console.log("Received innovation data:", JSON.stringify(innovationData));
    console.log("Received investor criteria:", JSON.stringify(investorCriteria));

    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Prepare the prompt for GPT based on the innovation data and investor criteria
    const systemPrompt = `You are an investment matching expert specializing in healthcare innovations. 
    Your task is to analyze the provided innovation against investor criteria (if provided) and generate a detailed match analysis.
    
    For the analysis, provide:
    1. A match score from 0-100
    2. Main reasons for the match score (3-5 bullet points)
    3. A SWOT analysis with 3 points for each category
    4. A recommended approach for the innovator
    5. Key metrics the investor will likely evaluate
    6. Areas of alignment with Vision 2030 healthcare goals`;

    // Construct the message to GPT
    let userPrompt = `Please analyze this healthcare innovation:\n`;
    userPrompt += `${JSON.stringify(innovationData, null, 2)}\n\n`;
    
    if (investorCriteria) {
      userPrompt += `Against these investor criteria:\n`;
      userPrompt += `${JSON.stringify(investorCriteria, null, 2)}\n\n`;
    } else {
      userPrompt += `No specific investor criteria provided. Please evaluate against typical healthcare investment criteria.\n\n`;
    }
    
    userPrompt += `Provide your analysis in a JSON format with these keys: 
    "matchScore" (number from 0-100), 
    "mainReasons" (array of strings), 
    "swotAnalysis" (object with arrays for strengths, weaknesses, opportunities, threats), 
    "recommendedApproach" (string), 
    "keyMetrics" (array of strings), 
    "alignmentAreas" (array of strings).`;

    // Call OpenAI for the analysis
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5,
      });

      // Log the OpenAI response
      console.log("OpenAI response:", completion.choices[0].message.content);
      
      // Parse the response to extract the JSON
      let matchResult;
      try {
        matchResult = JSON.parse(completion.choices[0].message.content || "{}");
      } catch (error) {
        console.error("Failed to parse GPT response as JSON:", error);
        console.log("Raw content:", completion.choices[0].message.content);
        
        // Fallback to a simpler approach to extract data
        matchResult = {
          matchScore: extractNumberFromText(completion.choices[0].message.content || "", "matchScore") || 50,
          mainReasons: extractListFromText(completion.choices[0].message.content || "", "mainReasons"),
          swotAnalysis: {
            strengths: extractListFromText(completion.choices[0].message.content || "", "strengths"),
            weaknesses: extractListFromText(completion.choices[0].message.content || "", "weaknesses"),
            opportunities: extractListFromText(completion.choices[0].message.content || "", "opportunities"),
            threats: extractListFromText(completion.choices[0].message.content || "", "threats")
          },
          recommendedApproach: extractTextFromText(completion.choices[0].message.content || "", "recommendedApproach") || "No specific approach recommended.",
          keyMetrics: extractListFromText(completion.choices[0].message.content || "", "keyMetrics"),
          alignmentAreas: extractListFromText(completion.choices[0].message.content || "", "alignmentAreas")
        };
      }

      // Return the match result
      return new Response(JSON.stringify(matchResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in investment-match function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred during the investment match analysis." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions for text extraction (in case JSON parsing fails)
function extractNumberFromText(text: string, key: string): number | null {
  const regex = new RegExp(`${key}[^0-9]*([0-9]+)`, 'i');
  const match = text.match(regex);
  return match ? parseInt(match[1], 10) : null;
}

function extractListFromText(text: string, key: string): string[] {
  const regex = new RegExp(`${key}[^\n]*\n((?:[-*•].+\n?)+)`, 'i');
  const match = text.match(regex);
  if (!match) return [];
  return match[1]
    .split(/\n/)
    .map(item => item.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);
}

function extractTextFromText(text: string, key: string): string | null {
  const regex = new RegExp(`${key}[^\n]*\n([^#\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}
