
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const isValidMapboxToken = (token: string): boolean => {
  // Mapbox GL JS can ONLY use public tokens that start with 'pk.'
  return !!token && typeof token === 'string' && token.startsWith('pk.');
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the Mapbox token from environment variables
    const mapboxToken = Deno.env.get('MAPBOX_TOKEN');
    
    if (!mapboxToken) {
      console.error('Mapbox token not configured in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Mapbox token not configured',
          details: 'The MAPBOX_TOKEN secret is not set in Supabase Edge Function Secrets.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Validate that it's a public token
    if (!isValidMapboxToken(mapboxToken)) {
      console.error('Invalid Mapbox token format:', mapboxToken.substring(0, 5) + '...');
      return new Response(
        JSON.stringify({ 
          error: 'Invalid Mapbox token format. Must be a public token (pk.)',
          details: 'The MAPBOX_TOKEN secret must start with "pk." for public tokens.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Successfully validated and returning Mapbox token');
    // Return the token
    return new Response(
      JSON.stringify({ token: mapboxToken }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in mapbox-token function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: 'Check the Edge Function logs for more information.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
