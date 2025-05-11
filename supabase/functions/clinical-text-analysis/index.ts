
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface RequestPayload {
  text: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY');
    }

    const { text } = await req.json() as RequestPayload;
    
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Missing text parameter' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Call OpenAI for clinical text analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a clinical analysis AI that extracts medical information from text. ' +
                    'Extract symptoms, possible diagnoses, relevant medical codes (ICD-10 or SNOMED), ' +
                    'and suggest tags for categorization. Return the results in a structured JSON format.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    const openaiData = await openaiResponse.json();
    
    if (openaiData.error) {
      throw new Error(`OpenAI API Error: ${openaiData.error.message}`);
    }
    
    // Parse OpenAI response to get structured clinical data
    let analysisResult;
    try {
      analysisResult = JSON.parse(openaiData.choices[0].message.content);
    } catch (e) {
      analysisResult = {
        medicalCodes: {},
        symptoms: [],
        diagnosis: [],
        tags: []
      };
    }

    console.log("Clinical text analysis completed successfully");
    
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Clinical text analysis error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
