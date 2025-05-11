
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentData } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }
    
    console.log('Processing document summarization request for:', documentData.title);
    
    // Prepare the content for summarization
    const content = documentData.content || '';
    if (!content || content.trim().length === 0) {
      throw new Error('Document content is empty');
    }
    
    // Call OpenAI for document summarization
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
            content: 'You are a professional document summarizer specializing in healthcare and medical documents. Create concise, accurate summaries that maintain the key points of the original document. Include a list of key points extracted from the document and suggest relevant topics related to the content.'
          },
          {
            role: 'user',
            content: `Please summarize the following document titled "${documentData.title}": \n\n${content}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1000,
      }),
    });
    
    const openAIData = await response.json();
    
    if (!openAIData.choices || openAIData.choices.length === 0) {
      console.error('OpenAI API error:', openAIData);
      throw new Error('Failed to generate summary');
    }
    
    const summaryText = openAIData.choices[0].message.content;
    
    // Extract key points and relevant topics using another call
    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'Extract key points and relevant topics from the content. Return a JSON object with two arrays: "keyPoints" (a list of 5-8 concise bullet points) and "relevantTopics" (a list of 3-5 related topics).'
          },
          {
            role: 'user',
            content: content
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });
    
    const analysisData = await analysisResponse.json();
    
    if (!analysisData.choices || analysisData.choices.length === 0) {
      console.error('Analysis API error:', analysisData);
      throw new Error('Failed to extract key points and topics');
    }
    
    try {
      // Parse the JSON string from the API response
      const extractedData = JSON.parse(analysisData.choices[0].message.content);
      
      // Return the summarization result
      const result = {
        summary: summaryText,
        keyPoints: extractedData.keyPoints || [],
        relevantTopics: extractedData.relevantTopics || []
      };

      // Store the summary in the database if we have a Supabase client
      if (supabaseUrl && supabaseServiceKey && documentData.id) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase
          .from('knowledge_resources')
          .update({ 
            summary: result.summary,
            key_points: result.keyPoints,
            relevant_topics: result.relevantTopics,
            processed_at: new Date().toISOString()
          })
          .eq('id', documentData.id);
      }
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing analysis response:', parseError);
      
      // Fallback result with default structure
      const fallbackResult = {
        summary: summaryText,
        keyPoints: [],
        relevantTopics: []
      };
      
      return new Response(JSON.stringify(fallbackResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in document-summarization function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
