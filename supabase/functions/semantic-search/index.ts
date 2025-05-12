
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS } from "../_shared/openai.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, filters, limit = 10 } = await req.json();
    
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required');
    }

    console.log('Processing semantic search request:', query);
    
    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    // Get embedding for the search query using OpenAI
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: OPENAI_MODELS.TEXT_EMBEDDING,
        input: query,
        encoding_format: "float"
      });
      
      const embedding = embeddingResponse.data[0].embedding;
      
      // Initialize Supabase client
      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Supabase configuration is missing');
      }
      
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Build the search query
      let queryBuilder = supabase
        .rpc('match_documents', {
          query_embedding: embedding,
          match_threshold: 0.3,
          match_count: limit
        });
      
      // Apply filters if provided
      if (filters) {
        if (filters.categories && filters.categories.length > 0) {
          queryBuilder = queryBuilder.in('category', filters.categories);
        }
        
        if (filters.types && filters.types.length > 0) {
          queryBuilder = queryBuilder.in('type', filters.types);
        }
        
        if (filters.tags && filters.tags.length > 0) {
          // This assumes a tags array field or jsonb field that can be queried
          queryBuilder = queryBuilder.containedBy('tags', filters.tags);
        }
      }
      
      // Execute search
      const { data: searchResults, error: searchError } = await queryBuilder
        .select('id, title, summary, type, category, similarity')
        .order('similarity', { ascending: false });
      
      if (searchError) {
        console.error('Database search error:', searchError);
        throw new Error('Error executing semantic search');
      }
      
      // Transform results
      const results = searchResults.map(item => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        type: item.type,
        category: item.category,
        relevanceScore: Math.round(item.similarity * 100)
      }));
      
      return new Response(JSON.stringify({ 
        results,
        totalCount: results.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error('Error in semantic-search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      results: [],
      totalCount: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
