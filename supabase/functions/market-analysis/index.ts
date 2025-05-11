
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
              You are an AI healthcare market analyst specializing in investment trends and forecasting.
              Analyze the provided healthcare sector, timeframe, and region to provide market insights and investment opportunities.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "Brief summary of market conditions",
                "growthRate": number (percentage),
                "marketSize": "Market size estimation with unit",
                "keyTrends": ["Trend 1", "Trend 2", "Trend 3", "Trend 4"],
                "emergingOpportunities": ["Opportunity 1", "Opportunity 2"],
                "riskFactors": ["Risk 1", "Risk 2"],
                "competitiveLandscape": {
                  "keyPlayers": ["Player 1", "Player 2", "Player 3"],
                  "marketShare": {"Player 1": number, "Player 2": number, "Player 3": number, "Others": number},
                  "barriers": ["Barrier 1", "Barrier 2"]
                },
                "regulatoryImpact": "Description of regulatory environment impact",
                "vision2030Alignment": "How this sector aligns with Saudi Vision 2030",
                "investmentRecommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Provide market analysis for:
              Sector: ${sector}
              ${timeframe ? `Timeframe: ${timeframe}` : 'Timeframe: Next 3-5 years'}
              ${region ? `Region: ${region}` : 'Region: Saudi Arabia'}`
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
