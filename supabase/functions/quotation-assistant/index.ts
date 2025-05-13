
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
    const { query, context } = await req.json();
    
    // In a production environment, this would use OpenAI or another AI service
    // to generate responses based on the query and context
    
    // For now, return a simple mock response
    const response = {
      response: `Thank you for your inquiry about "${query}". I'd be happy to help with your investment needs.`,
      suggestions: [
        "Tell me more about your investment goals",
        "What is your expected timeline for investment?",
        "Are you interested in specific healthcare sectors?"
      ]
    };
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in quotation-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
