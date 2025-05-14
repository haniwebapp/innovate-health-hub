
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
    const { query, sector, stage, region, investmentSize } = await req.json();
    
    console.log("Received investment query:", query);
    console.log("Sector:", sector);
    console.log("Stage:", stage);
    console.log("Region:", region);

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    const systemPrompt = `You are an investment expert specializing in healthcare innovations in Saudi Arabia and the MENA region.
    Your role is to provide insightful, data-driven analysis and recommendations for healthcare investments.
    Focus on practical, actionable insights that align with Vision 2030 healthcare transformation goals.
    Always be factual, specific, and concise. Avoid generic advice.`;

    let userPrompt = `Provide 3-5 specific investment insights for the healthcare`;
    
    if (sector && sector !== 'all') {
      userPrompt += ` ${sector} sector`;
    }
    
    if (stage) {
      userPrompt += ` at the ${stage} stage`;
    }
    
    if (region) {
      userPrompt += ` in ${region}`;
    }
    
    if (investmentSize) {
      userPrompt += ` with investment size around ${investmentSize}`;
    }
    
    if (query && query.trim()) {
      userPrompt += `\nFocus on answering this specific question: ${query}`;
    }
    
    userPrompt += `\n\nProvide your response as a JSON array of strings, each string being one insight. Format the JSON like this: ["Insight 1", "Insight 2", "Insight 3"]`;

    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      });

      console.log("AI response received");
      
      // Extract the content from the completion
      const content = completion.choices[0].message.content || "";
      
      let insights = [];
      
      try {
        // Try to parse the response as JSON
        insights = JSON.parse(content);
        
        // Fallback in case the response isn't properly formatted as an array
        if (!Array.isArray(insights)) {
          console.log("Response isn't an array, extracting insights manually");
          insights = content.split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => line.replace(/^[0-9-\.\)\s]+/, '').trim())
            .filter(line => line.length > 20)
            .slice(0, 5);
        }
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        // Fallback to extracting insights from text
        insights = content.split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[0-9-\.\)\s]+/, '').trim())
          .filter(line => line.length > 20)
          .slice(0, 5);
      }
      
      // Ensure we have at least some insights
      if (insights.length === 0) {
        insights = [
          "Focus on digital health solutions that integrate with Saudi Arabia's existing healthcare infrastructure for maximum adoption.",
          "Telemedicine investments should target rural areas where healthcare access is limited, aligning with Vision 2030 goals.",
          "Consider health data analytics platforms that comply with local regulations while providing actionable insights for providers."
        ];
      }

      return new Response(JSON.stringify({ insights }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error, corsHeaders);
    }
  } catch (error) {
    console.error("Error in investment-insights function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred during investment analysis." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
