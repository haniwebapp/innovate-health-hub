
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
    
    // Simple response logic - in a production environment this would use OpenAI or another AI service
    const responses = {
      investment: "I can help you with investment quotations and funding opportunities.",
      pricing: "Our investment options start at 10,000 SAR and scale based on your needs.",
      contact: "You can reach our investment team at investments@healthcareinnovation.sa",
      default: "Hello! I'm Fahad, your investment assistant. How can I help you today?"
    };

    // Basic keyword matching
    let response = responses.default;
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('invest') || lowerQuery.includes('fund')) {
      response = responses.investment;
    } else if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
      response = responses.pricing;
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
      response = responses.contact;
    }

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
