
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Environment variables
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { ticketContent, ticketCategory } = await req.json();
    
    if (!ticketContent) {
      return new Response(
        JSON.stringify({ error: "Ticket content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Call OpenAI API to generate first response
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a support agent for a healthcare innovation platform. Generate a professional, 
                      helpful initial response to the user's support ticket. This will be automatically sent
                      to acknowledge their issue and provide any immediate assistance possible.
                      
                      Your response should:
                      1. Be professional but warm and empathetic
                      2. Acknowledge their specific issue
                      3. Provide any immediate guidance if possible
                      4. Set expectations for next steps or timeline
                      5. Thank them for their patience
                      
                      Category: ${ticketCategory || "general"}
                      
                      Keep the response concise (max 150 words) and professional.`
          },
          {
            role: "user",
            content: ticketContent
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });
    
    const openAIData = await openAIResponse.json();
    
    if (openAIData.error) {
      console.error("OpenAI API error:", openAIData.error);
      throw new Error(`OpenAI API error: ${openAIData.error.message}`);
    }
    
    const response = openAIData.choices[0].message.content;
    
    // Return response
    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("First response generator error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to generate first response",
        details: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
