
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
    const { sector, timeframe, region } = await req.json();

    // Log the received data for debugging
    console.log("Market analysis requested for:", 
      JSON.stringify({ sector, timeframe, region }));

    if (!sector) {
      throw new Error("Sector is required for market analysis");
    }

    const selectedRegion = region || "Saudi Arabia";
    const selectedTimeframe = timeframe || "next 5 years";

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Prepare the prompt for GPT
    const systemPrompt = `You are a healthcare market analysis expert specializing in investment opportunities in ${selectedRegion}. 
    Provide detailed market analysis and investment insights for the healthcare sector.`;

    const userPrompt = `Generate a comprehensive market analysis for the ${sector} sector in ${selectedRegion} for the ${selectedTimeframe}.
    
    Include the following in your analysis:
    1. A brief market summary (2-3 sentences)
    2. Estimated market growth rate (as a percentage)
    3. Current market size (as a dollar figure)
    4. 5-7 key trends in bullet points
    5. 3-4 emerging opportunities in bullet points
    6. 3-4 risk factors in bullet points
    7. Competitive landscape information including key players, approximate market share, and barriers to entry
    8. Impact of current and upcoming regulations
    9. Alignment with Vision 2030 healthcare goals
    10. 3-4 specific investment recommendations
    
    Present your response as a structured JSON with the following keys:
    "summary", "growthRate" (number), "marketSize", "keyTrends" (array), "emergingOpportunities" (array), 
    "riskFactors" (array), "competitiveLandscape" (object with keyPlayers, marketShare, barriers), 
    "regulatoryImpact", "vision2030Alignment", "investmentRecommendations" (array)`;

    // Call OpenAI API for market analysis
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
      
      // Parse the JSON response
      let marketAnalysis;
      try {
        marketAnalysis = JSON.parse(completion.choices[0].message.content || "{}");
      } catch (error) {
        console.error("Failed to parse GPT response as JSON:", error);
        console.log("Raw content:", completion.choices[0].message.content);
        
        // Create a fallback response structure
        marketAnalysis = {
          summary: extractSection(completion.choices[0].message.content || "", "summary") || `Analysis for ${sector} in ${selectedRegion}.`,
          growthRate: extractNumber(completion.choices[0].message.content || "", "growthRate") || 5.5,
          marketSize: extractSection(completion.choices[0].message.content || "", "marketSize") || "Unknown market size",
          keyTrends: extractList(completion.choices[0].message.content || "", "keyTrends") || ["Increasing digital health adoption", "Growing focus on preventive care"],
          emergingOpportunities: extractList(completion.choices[0].message.content || "", "emergingOpportunities") || ["Telemedicine expansion", "AI-powered diagnostics"],
          riskFactors: extractList(completion.choices[0].message.content || "", "riskFactors") || ["Regulatory changes", "Market competition"],
          competitiveLandscape: {
            keyPlayers: extractList(completion.choices[0].message.content || "", "keyPlayers") || ["Major healthcare providers"],
            marketShare: {},
            barriers: extractList(completion.choices[0].message.content || "", "barriers") || ["High initial investment", "Regulatory approval"]
          },
          regulatoryImpact: extractSection(completion.choices[0].message.content || "", "regulatoryImpact") || "Regulatory environment continues to evolve.",
          vision2030Alignment: extractSection(completion.choices[0].message.content || "", "vision2030Alignment") || "Aligns with Saudi Vision 2030 healthcare transformation goals.",
          investmentRecommendations: extractList(completion.choices[0].message.content || "", "investmentRecommendations") || ["Focus on digital health solutions"]
        };
      }

      // Return the market analysis
      return new Response(JSON.stringify(marketAnalysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in market-analysis function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred during the market analysis." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions for text extraction
function extractSection(text: string, sectionName: string): string | null {
  const regex = new RegExp(`["']?${sectionName}["']?\\s*:?\\s*["']([^"']+)["']`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function extractNumber(text: string, key: string): number | null {
  const regex = new RegExp(`["']?${key}["']?\\s*:?\\s*([0-9.]+)`, 'i');
  const match = text.match(regex);
  return match ? parseFloat(match[1]) : null;
}

function extractList(text: string, listName: string): string[] | null {
  const regex = new RegExp(`["']?${listName}["']?\\s*:?\\s*\\[([^\\]]+)\\]`, 'i');
  const match = text.match(regex);
  if (!match) return null;
  
  return match[1]
    .split(',')
    .map(item => item.replace(/^["'\s]+|["'\s]+$/g, '').trim())
    .filter(Boolean);
}
