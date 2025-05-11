
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
    const { content, targetLanguage } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }
    
    if (!content || content.trim().length === 0) {
      throw new Error('Content is required');
    }
    
    if (!targetLanguage) {
      throw new Error('Target language is required');
    }

    console.log(`Processing translation request to ${targetLanguage}`);
    
    // Determine language name for clearer instructions
    const languageName = targetLanguage === 'ar' ? 'Arabic' : 'English';
    
    // Limit content length to avoid token limits (using first 5000 chars if longer)
    const contentToTranslate = content.length > 5000 
      ? content.slice(0, 5000) + '...' 
      : content;
    
    // Call OpenAI for translation
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
            content: `You are a professional translator specializing in healthcare and medical translations between English and ${languageName}. Translate the provided content to ${languageName} while maintaining accuracy and technical terminology. Keep the same paragraph structure.`
          },
          {
            role: 'user',
            content: `Translate the following content to ${languageName}:\n\n${contentToTranslate}`
          }
        ],
        temperature: 0.3,
      }),
    });
    
    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('OpenAI API error:', data);
      throw new Error('Failed to translate content');
    }
    
    const translatedContent = data.choices[0].message.content;
    
    // Return the translation result
    return new Response(JSON.stringify({
      translatedContent,
      detectedLanguage: targetLanguage === 'ar' ? 'en' : 'ar'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in content-translation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
