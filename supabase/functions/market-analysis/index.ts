
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
    const { sector, timeframe, region } = await req.json();
    
    if (!sector) {
      throw new Error("Sector parameter is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for market trend analysis
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
              You are an AI market analyst specializing in healthcare innovation trends in Saudi Arabia.
              Analyze the provided sector and parameters to deliver strategic market insights.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "Brief summary of current market trends",
                "growthRate": number (percentage),
                "marketSize": "Market size in SAR or USD with proper notation",
                "keyTrends": ["Trend 1", "Trend 2", "Trend 3", "Trend 4"],
                "emergingOpportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
                "riskFactors": ["Risk 1", "Risk 2", "Risk 3"],
                "competitiveLandscape": {
                  "keyPlayers": ["Player 1", "Player 2", "Player 3"],
                  "marketShare": {
                    "Player 1": number,
                    "Player 2": number,
                    "Player 3": number,
                    "Others": number
                  },
                  "barriers": ["Barrier 1", "Barrier 2"]
                },
                "regulatoryImpact": "Description of relevant regulatory factors",
                "vision2030Alignment": "How this sector aligns with Saudi Vision 2030 goals",
                "investmentRecommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze market trends for the ${sector} sector in healthcare${
              region ? ` in ${region}` : ""
            }${timeframe ? ` for the ${timeframe}` : ""}.`
          }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const marketAnalysis = JSON.parse(data.choices[0].message.content);

    // Return the market analysis results
    return new Response(
      JSON.stringify(marketAnalysis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in market-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
