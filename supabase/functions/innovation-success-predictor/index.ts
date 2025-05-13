
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
    const { title, description, sector, technology, targetUsers, implementationTimeframe } = await req.json();
    
    if (!title || !description || !sector) {
      throw new Error("Missing required parameters: title, description, and sector are required.");
    }
    
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI to predict innovation success
    const prompt = `
      Analyze the following healthcare innovation and predict its probability of success:
      
      Title: ${title}
      Description: ${description}
      Sector: ${sector}
      Technologies: ${technology.join(", ")}
      Target Users: ${targetUsers.join(", ")}
      Implementation Timeframe: ${implementationTimeframe}
      
      Provide a comprehensive analysis including:
      1. Overall success probability score (0-100)
      2. Key success factors with individual scores and analysis
      3. Potential risks with likelihood (0-10) and impact (0-10) scores, plus mitigation strategies
      4. Analysis of similar innovations in the sector
      5. Key recommendations to improve success probability
      
      Return your analysis as a structured JSON object.
    `;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI healthcare innovation analyst specializing in predicting the success probability of healthcare innovations in Saudi Arabia. You analyze innovations based on market trends, technical feasibility, alignment with healthcare needs, and implementation challenges." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const predictionResults = JSON.parse(data.choices[0].message.content);

    // Return the prediction results
    return new Response(
      JSON.stringify(predictionResults),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in innovation-success-predictor function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
