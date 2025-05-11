
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
    const { ticketContent } = await req.json();
    
    if (!ticketContent) {
      return new Response(
        JSON.stringify({ error: "Ticket content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Call OpenAI API to classify the ticket
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
            content: `Analyze the support ticket and classify it according to the following attributes:
                      
                      1. urgency: low, medium, high, or critical
                      2. sentiment: positive, neutral, or negative
                      3. category: account (user profiles/authentication), innovation (submissions), 
                         regulatory (compliance), investment (funding), platform (technical issues), other
                      4. assignedTeam: support, technical, admin, innovation, regulatory, or investment
                      
                      Respond in JSON format with ONLY these four attributes.`
          },
          {
            role: "user",
            content: ticketContent
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });
    
    const openAIData = await openAIResponse.json();
    
    if (openAIData.error) {
      console.error("OpenAI API error:", openAIData.error);
      throw new Error(`OpenAI API error: ${openAIData.error.message}`);
    }
    
    const classification = JSON.parse(openAIData.choices[0].message.content);
    
    // Validate classification results
    const validUrgencies = ["low", "medium", "high", "critical"];
    const validSentiments = ["positive", "neutral", "negative"];
    const validCategories = ["account", "innovation", "regulatory", "investment", "platform", "other"];
    const validTeams = ["support", "technical", "admin", "innovation", "regulatory", "investment"];
    
    if (!validUrgencies.includes(classification.urgency)) {
      classification.urgency = "medium";
    }
    
    if (!validSentiments.includes(classification.sentiment)) {
      classification.sentiment = "neutral";
    }
    
    if (!validCategories.includes(classification.category)) {
      classification.category = "other";
    }
    
    if (!validTeams.includes(classification.assignedTeam)) {
      classification.assignedTeam = "support";
    }
    
    // Return classification
    return new Response(
      JSON.stringify(classification),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Ticket classification error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to classify ticket",
        details: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
