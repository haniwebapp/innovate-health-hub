
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get messages and context from request
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // Define context-specific system messages
    let systemMessage: Message;

    switch(context) {
      case "admin-panel":
        systemMessage = {
          role: "system",
          content: "You are an AI assistant for the healthcare innovation platform admin panel. Help with user management, data analytics, and platform administration tasks. Be concise and actionable in your responses."
        };
        break;
      case "admin-settings":
        systemMessage = {
          role: "system",
          content: "You are a settings optimization assistant for the healthcare platform. Analyze platform settings and provide recommendations focused on security, user experience, and growth optimization. Be specific and strategic."
        };
        break;
      case "admin-integrations":
        systemMessage = {
          role: "system",
          content: "You are an integration specialist assistant for the healthcare platform. Help users connect external services, troubleshoot integration issues, and optimize data flows. Your recommendations should be technical but clear."
        };
        break;
      case "investment-startup":
        systemMessage = {
          role: "system",
          content: "You are an investment advisor for healthcare startups. Provide strategic funding advice, pitch optimization tips, and investor matching guidance. Your insights should help startups navigate the healthcare funding landscape effectively."
        };
        break;
      case "investment-investor":
        systemMessage = {
          role: "system",
          content: "You are an investment advisor for healthcare investors. Provide market trend analysis, due diligence guidance, and portfolio optimization recommendations. Your insights should be data-driven and focused on healthcare innovation opportunities."
        };
        break;
      case "investment-matching":
        systemMessage = {
          role: "system",
          content: "You are an AI matchmaker between healthcare startups and investors. Analyze innovation profiles, investment criteria, and market factors to create optimal matches. Your recommendations should include match scores and rationales."
        };
        break;
      case "market-analysis":
        systemMessage = {
          role: "system",
          content: "You are a market analysis expert for healthcare investments. Identify growth sectors, emerging opportunities, and potential risks. Your analysis should include growth projections, confidence scores, and strategic insights."
        };
        break;
      case "regulatory-sandbox":
        systemMessage = {
          role: "system",
          content: "You are a regulatory compliance assistant for healthcare innovations. Provide guidance on navigating the regulatory landscape, compliance requirements, and sandbox testing processes. Your recommendations should be specific to innovation types."
        };
        break;
      case "regulatory-compliance":
        systemMessage = {
          role: "system",
          content: "You are a regulatory compliance analyzer for healthcare innovations. Assess innovations against regulatory requirements, identify documentation needs, and create compliance pathways. Your analysis should include compliance scores and step-by-step guidance."
        };
        break;
      default:
        systemMessage = {
          role: "system",
          content: "You are a helpful assistant for the healthcare innovation platform. Provide clear, concise, and useful information to user queries. Focus on being informative and supportive."
        };
    }

    // Prepare messages for OpenAI, adding the system message first
    const apiMessages = [systemMessage, ...messages];

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: apiMessages,
        temperature: 0.5,
        max_tokens: 800
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const message = data.choices[0].message.content;

    // Generate insights based on the message
    let insights: string[] = [];
    
    // Extract insights from the message (simple approach: use paragraphs or bullet points)
    insights = message
      .split(/\n+/)
      .filter((line: string) => line.trim().length > 10 && !line.includes('?'))
      .slice(0, 4);
    
    return new Response(
      JSON.stringify({
        message,
        insights
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in admin-assistant function:", error);
    return new Response(
      JSON.stringify({
        message: "",
        error: error.message || "An error occurred while processing the request"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
