
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
    const { sector, timeframe, region } = await req.json();

    // Log the received data for debugging
    console.log("Market analysis requested for:", 
      JSON.stringify({ sector, timeframe, region }));

    if (!sector) {
      throw new Error("Sector is required for market analysis");
    }

    const selectedRegion = region || "Saudi Arabia";
    const selectedTimeframe = timeframe || "next 5 years";

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
        temperature: 0.5,
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
    let marketAnalysis;
    try {
      // Handle potential markdown formatting in the response
      const jsonContent = content.includes("```json")
        ? content.split("```json")[1].split("```")[0]
        : content;
      
      marketAnalysis = JSON.parse(jsonContent);
    } catch (error) {
      console.error("Failed to parse GPT response as JSON:", error);
      console.log("Raw content:", content);
      
      // Create a fallback response structure
      marketAnalysis = {
        summary: extractSection(content, "summary") || `Analysis for ${sector} in ${selectedRegion}.`,
        growthRate: extractNumber(content, "growthRate") || 5.5,
        marketSize: extractSection(content, "marketSize") || "Unknown market size",
        keyTrends: extractList(content, "keyTrends") || ["Increasing digital health adoption", "Growing focus on preventive care"],
        emergingOpportunities: extractList(content, "emergingOpportunities") || ["Telemedicine expansion", "AI-powered diagnostics"],
        riskFactors: extractList(content, "riskFactors") || ["Regulatory changes", "Market competition"],
        competitiveLandscape: {
          keyPlayers: extractList(content, "keyPlayers") || ["Major healthcare providers"],
          marketShare: {},
          barriers: extractList(content, "barriers") || ["High initial investment", "Regulatory approval"]
        },
        regulatoryImpact: extractSection(content, "regulatoryImpact") || "Regulatory environment continues to evolve.",
        vision2030Alignment: extractSection(content, "vision2030Alignment") || "Aligns with Saudi Vision 2030 healthcare transformation goals.",
        investmentRecommendations: extractList(content, "investmentRecommendations") || ["Focus on digital health solutions"]
      };
    }

    // Return the market analysis
    return new Response(JSON.stringify(marketAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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
