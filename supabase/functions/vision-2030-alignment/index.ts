
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
    const requestData = await req.json();
    const innovationData = requestData.innovationData;
    
    // Log the received data
    console.log("Vision 2030 alignment check requested for:", JSON.stringify(innovationData));

    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Prepare the prompt for GPT
    const systemPrompt = `You are a Saudi Vision 2030 healthcare expert specializing in evaluating how healthcare innovations 
    align with Vision 2030 goals. Your analysis is precise, insightful, and focused on the healthcare transformation program.`;

    const userPrompt = `Evaluate how well the following healthcare innovation aligns with Saudi Vision 2030 healthcare goals:
    
    ${JSON.stringify(innovationData, null, 2)}
    
    In your analysis, include:
    
    1. An overall alignment score from 0-100
    2. Primary areas of alignment (list 3-5)
    3. Specific Vision 2030 healthcare objectives this addresses (list 3-5)
    4. Areas where alignment could be improved (list 2-3)
    5. Potential impact on Vision 2030 healthcare KPIs
    6. Recommendations to enhance alignment (list 2-3)
    
    Format your response as a JSON object with these keys: 
    "score" (number), 
    "alignmentAreas" (array of strings), 
    "vision2030Objectives" (array of strings), 
    "gapAreas" (array of strings),
    "improvementAreas" (array of strings),
    "vision2030Impact" (string), 
    "potentialImpact" (string), 
    "recommendations" (array of strings)`;

    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      });

      let alignmentAnalysis;
      try {
        alignmentAnalysis = JSON.parse(completion.choices[0].message.content || "{}");
        console.log("Parsed alignment analysis:", alignmentAnalysis);
      } catch (error) {
        console.error("Failed to parse GPT response as JSON:", error);
        console.log("Raw content:", completion.choices[0].message.content);
        
        // Create a fallback structure
        alignmentAnalysis = {
          score: 75,
          alignmentAreas: [
            "Digital healthcare transformation",
            "Preventive care focus",
            "Healthcare access improvement"
          ],
          vision2030Objectives: [
            "Improve quality of healthcare services",
            "Expand privatization of government services",
            "Promote digital transformation in healthcare"
          ],
          gapAreas: [
            "Limited localization components",
            "Unclear sustainability metrics"
          ],
          improvementAreas: [
            "Stronger localization components",
            "Clearer sustainability metrics"
          ],
          vision2030Impact: "Moderate to high positive impact on healthcare quality metrics and accessibility goals",
          potentialImpact: "Moderate to high positive impact on healthcare quality metrics and accessibility goals",
          recommendations: [
            "Enhance focus on Saudi workforce development",
            "Include more specific Vision 2030 KPIs in measurement framework"
          ]
        };
      }

      // Return the alignment analysis
      return new Response(JSON.stringify(alignmentAnalysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in vision-2030-alignment function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred during the Vision 2030 alignment analysis.",
      score: 0,
      alignmentAreas: [],
      gapAreas: [],
      vision2030Impact: "Error performing alignment assessment."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
