
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }
    
    if (!content || content.trim().length === 0) {
      throw new Error('Document content is required');
    }

    console.log('Processing document metadata extraction');
    
    // Extract content preview for analysis (limit to first 10000 chars to avoid token limits)
    const contentPreview = content.slice(0, 10000);
    
    // Call OpenAI for metadata extraction
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Extract metadata from the provided document content. Focus on identifying relevant tags, categories, and key phrases that would be useful for organizing and searching this document in a healthcare knowledge management system.'
          },
          {
            role: 'user',
            content: `Analyze the following document content and extract metadata. Return a JSON object with three arrays: "tags" (5-10 most relevant tags), "categories" (1-3 main categories), and "keyphrases" (5-8 key phrases or terms): \n\n${contentPreview}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });
    
    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('OpenAI API error:', data);
      throw new Error('Failed to extract metadata');
    }
    
    try {
      const metadata = JSON.parse(data.choices[0].message.content);
      
      return new Response(JSON.stringify({
        tags: metadata.tags || [],
        categories: metadata.categories || [],
        keyphrases: metadata.keyphrases || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing metadata response:', parseError);
      throw new Error('Failed to parse metadata extraction result');
    }
  } catch (error) {
    console.error('Error in document-metadata function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
