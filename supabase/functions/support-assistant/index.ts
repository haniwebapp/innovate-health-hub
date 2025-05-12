
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS } from "../_shared/openai.ts";

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { query, context, userId } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Log request for debugging
    console.log(`Processing support query. Context: ${context || 'none'}, User ID: ${userId || 'anonymous'}`);
    
    // Fetch relevant knowledge resources to provide context
    let knowledgeContext = "";
    try {
      const { data: resources, error } = await supabase
        .from('knowledge_resources')
        .select('title, content, category')
        .limit(5);
        
      if (!error && resources) {
        knowledgeContext = resources
          .map(r => `Title: ${r.title}\nCategory: ${r.category}\nContent: ${r.content?.substring(0, 300)}...\n\n`)
          .join("\n");
      }
    } catch (err) {
      console.error("Error fetching knowledge resources:", err);
      // Continue even if we can't get resources
    }
    
    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    // Construct messages for OpenAI
    const messages = [
      {
        role: "system",
        content: `You are a helpful support assistant for a healthcare innovation platform. 
                  Your purpose is to provide accurate and concise answers to users' questions about the platform.
                  The platform facilitates healthcare innovation submissions, regulatory guidance, investment opportunities, 
                  and knowledge sharing. When answering:
                  
                  1. Be concise and helpful
                  2. If you don't know something, say so and suggest contacting human support
                  3. Suggest related resources when appropriate
                  4. Include follow-up questions that might help the user
                  
                  Here is some relevant platform content for context:
                  ${knowledgeContext}`
      },
      {
        role: "user",
        content: query
      }
    ];
    
    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages,
        temperature: 0.5,
        max_tokens: 500
      });
      
      const answer = completion.choices[0].message.content;
      
      // Generate follow-up questions
      const followUpResponse = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: "system",
            content: "Based on the user's query and the answer provided, suggest 3 short, specific follow-up questions the user might want to ask. Keep each question under 10 words if possible. Return only the questions as a JSON array with no explanations."
          },
          {
            role: "user",
            content: `User query: ${query}\n\nAnswer provided: ${answer}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        response_format: { type: "json_object" }
      });
      
      let followUpQuestions = [];
      
      try {
        const parsedContent = JSON.parse(followUpResponse.choices[0].message.content || "{}");
        followUpQuestions = parsedContent.questions || [];
      } catch (err) {
        console.error("Error parsing follow-up questions:", err);
      }
      
      // Find related resources
      let relatedResources = [];
      
      const embeddingResponse = await openai.embeddings.create({
        model: OPENAI_MODELS.TEXT_EMBEDDING,
        input: query
      });
      
      const embedding = embeddingResponse.data[0].embedding;
      
      // Use the embedding to find similar resources
      // For simplicity, we'll just fetch a few resources by category that might be relevant
      const { data: resources } = await supabase
        .from('knowledge_resources')
        .select('title, type, url')
        .limit(3);
        
      if (resources) {
        relatedResources = resources.map(r => ({
          title: r.title,
          url: r.url || `/dashboard/knowledge/resource/${r.id}`,
          type: r.type
        }));
      }
      
      // Return response with answer, follow-up questions, and related resources
      return new Response(
        JSON.stringify({
          answer,
          followUpQuestions,
          relatedResources
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Support assistant error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to process support query",
        details: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
