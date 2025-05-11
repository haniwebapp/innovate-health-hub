
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.22.0";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { userId, interests = [], pastEvents = [] } = await req.json();

    // Fetch upcoming events
    const { data: events, error } = await supabaseClient
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('start_date', { ascending: true });
      
    if (error) throw error;

    // If no events found, return empty array
    if (!events || events.length === 0) {
      return new Response(
        JSON.stringify([]),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If userId is provided, fetch user registrations to exclude events user already registered for
    let userRegisteredEventIds: string[] = [];
    
    if (userId) {
      const { data: registrations } = await supabaseClient
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', userId);
        
      if (registrations && registrations.length > 0) {
        userRegisteredEventIds = registrations.map(reg => reg.event_id);
      }
    }

    // Filter out events user is already registered for
    const availableEvents = events.filter(event => 
      !userRegisteredEventIds.includes(event.id)
    );

    // Calculate relevance scores for events based on interests and past events
    const scoredEvents = availableEvents.map(event => {
      let score = 0;
      let matchReasons = [];

      // Score based on category match with interests
      const categoryMatch = interests.some(interest => 
        event.category.toLowerCase().includes(interest.toLowerCase())
      );
      if (categoryMatch) {
        score += 30;
        matchReasons.push("Category matches your interests");
      }
      
      // Score based on tags match with interests
      if (event.tags && Array.isArray(event.tags)) {
        const tagMatches = interests.filter(interest => 
          event.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
        );
        
        score += tagMatches.length * 15;
        if (tagMatches.length > 0) {
          matchReasons.push("Event topics align with your interests");
        }
      }
      
      // If the user attended similar events in the past
      if (pastEvents.includes(event.category)) {
        score += 25;
        matchReasons.push("Similar to events you've attended");
      }
      
      // Boost score for featured events
      if (event.featured) {
        score += 10;
        matchReasons.push("Featured event");
      }
      
      // Slight boost for events happening sooner
      const eventDate = new Date(event.start_date);
      const now = new Date();
      const daysDifference = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDifference < 7) {
        score += 10;
        matchReasons.push("Happening soon");
      } else if (daysDifference < 14) {
        score += 5;
      }
      
      return {
        eventId: event.id,
        eventTitle: event.title,
        matchScore: Math.min(100, score), // Cap at 100
        matchReason: matchReasons.join(". "),
      };
    });

    // Sort by score (descending) and take top ones
    const recommendations = scoredEvents
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
