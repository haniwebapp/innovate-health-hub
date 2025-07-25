
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
    const { userId, interests = [], pastActivity = [] } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    console.log('Processing learning recommendations for user:', userId);
    
    // Initialize Supabase client
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching user profile:', profileError);
      throw new Error('Error fetching user data');
    }
    
    // Get available resources to recommend from
    const { data: resources, error: resourcesError } = await supabase
      .from('knowledge_resources')
      .select('id, title, description, type, category, tags')
      .limit(50);
      
    if (resourcesError) {
      console.error('Error fetching resources:', resourcesError);
      throw new Error('Error fetching knowledge resources');
    }
    
    if (!resources || resources.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Prepare user context for recommendation
    const userContext = {
      interests: interests || [],
      pastActivity: pastActivity || [],
      profile: profileData || {}
    };
    
    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    // Call OpenAI for personalized recommendations
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: [
          {
            role: 'system',
            content: 'You are a learning recommendation system for a healthcare innovation platform. Your task is to recommend relevant resources to users based on their interests, past activity, and profile information. Provide personalized recommendations with clear reasons why each resource is relevant to the user.'
          },
          {
            role: 'user',
            content: `Generate personalized learning recommendations for a user with the following context:\n${JSON.stringify(userContext, null, 2)}\n\nAvailable resources:\n${JSON.stringify(resources, null, 2)}\n\nReturn a JSON array of recommendation objects, each containing: resourceId, title, type, category, relevanceScore (0-100), and reason (why this is recommended).`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5,
      });
      
      const recommendationsResponse = JSON.parse(completion.choices[0].message.content || "{}");
      const recommendations = recommendationsResponse.recommendations || [];
      
      return new Response(JSON.stringify(recommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error('Error in learning-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
