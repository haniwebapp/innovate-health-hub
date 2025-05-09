
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { messages, context } = await req.json();
    
    // Check required parameters
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }
    
    // Prepare system message based on context
    let systemMessage = "You are an AI assistant for healthcare platform administrators. ";
    
    if (context === "admin-panel") {
      systemMessage += `
        You help administrators manage users, analyze platform data, and make informed decisions.
        You have access to the user management dashboard that shows profiles, activity, and statistics.
        Provide helpful, concise answers about platform administration, user management best practices,
        data analysis, and security recommendations. If you don't know specific platform data, be honest
        about your limitations. Keep responses professional and focused on administration tasks.
      `;
    } else if (context === "admin-settings") {
      systemMessage += `
        You are a platform settings expert who helps administrators optimize their platform configuration.
        Analyze the settings provided and give specific, actionable recommendations based on best practices.
        Focus on security, user experience, and platform growth.
        Your recommendations should be concise but explain the reasoning behind each suggestion.
        Format your response as a list of 3-4 key insights, each with a brief explanation.
      `;
    }

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in admin-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
