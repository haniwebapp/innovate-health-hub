
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
    const { documentData } = await req.json();
    
    if (!documentData) {
      throw new Error("Document data is required");
    }

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Call OpenAI API for document summarization
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are an AI document analysis expert specializing in healthcare documents.
              Analyze the provided document to create a comprehensive summary with key points and relevant topics.
              Your response MUST be in valid JSON format with these fields:
              {
                "summary": "Brief summary of the document (1-3 paragraphs)",
                "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
                "relevantTopics": ["Topic 1", "Topic 2", "Topic 3"]
              }
              Remember: Only return valid JSON - do not include any other text or explanation.
            `
          },
          {
            role: "user",
            content: `Analyze this document:
              Title: ${documentData.title}
              Type: ${documentData.type}
              ${documentData.category ? `Category: ${documentData.category}` : ''}
              ${documentData.author ? `Author: ${documentData.author}` : ''}
              
              Content:
              ${documentData.content}`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const summary = JSON.parse(data.choices[0].message.content);

    // Return the summarization results
    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in document-summarization function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        summary: "",
        keyPoints: [],
        relevantTopics: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
