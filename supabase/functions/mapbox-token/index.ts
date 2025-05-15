
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const MAPBOX_TOKEN = Deno.env.get('MAPBOX_TOKEN');

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin');
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(req),
    });
  }

  try {
    if (req.method === 'GET') {
      // Check if we have a token in environment variables
      if (!MAPBOX_TOKEN) {
        console.error('MAPBOX_TOKEN environment variable is not set');
        return new Response(
          JSON.stringify({
            error: 'MAPBOX_TOKEN environment variable is not set',
            message: 'The server is missing configuration for the Mapbox token.'
          }),
          {
            status: 500,
            headers: corsHeaders(req),
          }
        );
      }

      // Return the token
      return new Response(
        JSON.stringify({
          token: MAPBOX_TOKEN,
          source: 'edge-function'
        }), 
        {
          status: 200,
          headers: corsHeaders(req),
        }
      );
    }

    // Handle unsupported methods
    return new Response(
      JSON.stringify({ error: `Method ${req.method} not allowed` }),
      {
        status: 405,
        headers: corsHeaders(req),
      }
    );
  } catch (error) {
    console.error('Error in mapbox-token function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: corsHeaders(req),
      }
    );
  }
});
