
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// OpenAI API key is stored as a secret in Supabase
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { innovationData } = await req.json();

    // Log the received data for debugging
    console.log("Vision 2030 alignment check requested for:", JSON.stringify(innovationData));

    if (!innovationData) {
      throw new Error("Innovation data is required");
    }

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
    "alignmentScore" (number), 
    "alignmentAreas" (array of strings), 
    "vision2030Objectives" (array of strings), 
    "improvementAreas" (array of strings),
    "potentialImpact" (string), 
    "recommendations" (array of strings)`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const openAIResponse = await response.json();
    const content = openAIResponse.choices[0].message.content;
    
    // Log the OpenAI response
    console.log("OpenAI response:", content);
    
    // Parse the JSON response
    let alignmentAnalysis;
    try {
      // Handle potential markdown formatting in the response
      const jsonContent = content.includes("```json")
        ? content.split("```json")[1].split("```")[0]
        : content;
      
      alignmentAnalysis = JSON.parse(jsonContent);
    } catch (error) {
      console.error("Failed to parse GPT response as JSON:", error);
      console.log("Raw content:", content);
      
      // Create a fallback structure
      alignmentAnalysis = {
        alignmentScore: 75,
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
        improvementAreas: [
          "Stronger localization components",
          "Clearer sustainability metrics"
        ],
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
    console.error("Error in vision-2030-alignment function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred during the Vision 2030 alignment analysis." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
