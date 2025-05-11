
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

    const { feedbackItems } = await req.json();

    if (!feedbackItems || !Array.isArray(feedbackItems) || feedbackItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid feedbackItems. Provide an array of feedback strings." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, this would use OpenAI or another LLM to analyze feedback
    // For now, we'll create a simple analysis

    // Join all feedback into one text for analysis
    const allFeedback = feedbackItems.join(" ");
    
    // Simple sentiment analysis based on positive and negative words
    const positiveWords = ['great', 'excellent', 'good', 'liked', 'helpful', 'informative', 
      'enjoyed', 'best', 'useful', 'valuable', 'engaging', 'clear', 'insightful'];
    const negativeWords = ['poor', 'bad', 'difficult', 'confusing', 'boring', 'waste', 
      'unhelpful', 'disappointed', 'lacking', 'unclear', 'disorganized', 'technical issues'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = allFeedback.match(regex);
      if (matches) positiveCount += matches.length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = allFeedback.match(regex);
      if (matches) negativeCount += matches.length;
    });
    
    const totalWords = positiveCount + negativeCount;
    const sentimentScore = totalWords > 0 
      ? Math.round((positiveCount / totalWords) * 100)
      : 50; // Neutral if no sentiment words found
    
    // Generate sentiment breakdown
    const sentimentBreakdown = {
      positive: Math.round((positiveCount / Math.max(1, totalWords)) * 100),
      neutral: Math.max(0, 100 - Math.round(((positiveCount + negativeCount) / Math.max(1, feedbackItems.length * 5)) * 100)),
      negative: Math.round((negativeCount / Math.max(1, totalWords)) * 100),
    };
    
    // Normalize to ensure they sum to 100
    const total = sentimentBreakdown.positive + sentimentBreakdown.neutral + sentimentBreakdown.negative;
    if (total > 0) {
      sentimentBreakdown.positive = Math.round((sentimentBreakdown.positive / total) * 100);
      sentimentBreakdown.neutral = Math.round((sentimentBreakdown.neutral / total) * 100);
      sentimentBreakdown.negative = 100 - sentimentBreakdown.positive - sentimentBreakdown.neutral;
    }
    
    // Extract potential themes from feedback
    const contentThemes = [
      { term: "content", variations: ["content", "material", "information", "topic"] },
      { term: "presenter", variations: ["presenter", "speaker", "expert", "instructor"] },
      { term: "organization", variations: ["organization", "structure", "format", "agenda"] },
      { term: "time", variations: ["time", "duration", "length", "schedule"] },
      { term: "interactivity", variations: ["interactive", "engagement", "participation", "questions"] },
      { term: "technical", variations: ["technical", "audio", "video", "connection", "platform"] },
    ];
    
    // Count theme mentions in feedback
    const themeCounts = contentThemes.map(theme => {
      let count = 0;
      theme.variations.forEach(variation => {
        const regex = new RegExp(`\\b${variation}\\b`, 'gi');
        const matches = allFeedback.match(regex);
        if (matches) count += matches.length;
      });
      return { theme: theme.term, count };
    });
    
    // Sort and get top themes
    const topThemes = themeCounts
      .sort((a, b) => b.count - a.count)
      .filter(item => item.count > 0)
      .slice(0, 3)
      .map(item => item.theme);
    
    // Generate common themes based on our analysis
    const commonThemes = [];
    
    if (topThemes.includes('content')) {
      commonThemes.push(sentimentScore > 60 
        ? "Participants highly valued the content and information provided"
        : "Content may need improvement to better meet participant expectations");
    }
    
    if (topThemes.includes('presenter')) {
      commonThemes.push(sentimentScore > 60 
        ? "The presenter was well-received and engaged effectively with the audience"
        : "Presentation delivery could be enhanced to improve engagement");
    }
    
    if (topThemes.includes('organization')) {
      commonThemes.push(sentimentScore > 60 
        ? "Event organization and structure received positive feedback"
        : "The event structure and organization could be improved");
    }
    
    if (topThemes.includes('time')) {
      commonThemes.push(sentimentScore > 60 
        ? "Time management was appropriate for the content covered"
        : "Time allocation should be reconsidered for future events");
    }
    
    if (topThemes.includes('interactivity')) {
      commonThemes.push(sentimentScore > 60 
        ? "Interactive elements were appreciated by participants"
        : "More interactive components would enhance the experience");
    }
    
    if (topThemes.includes('technical')) {
      commonThemes.push(sentimentScore > 60 
        ? "Technical aspects of the event ran smoothly"
        : "Technical issues should be addressed in future events");
    }
    
    // If we don't have enough themes, add generic ones
    if (commonThemes.length < 3) {
      if (sentimentScore > 70) {
        commonThemes.push("Overall, the event was very well-received by participants");
      } else if (sentimentScore < 50) {
        commonThemes.push("Overall satisfaction with the event could be improved");
      }
      
      if (feedbackItems.length > 5) {
        commonThemes.push("There was strong participation in providing feedback");
      }
    }
    
    // Generate recommendations based on sentiment and themes
    const recommendations = [];
    
    if (sentimentScore < 60 && topThemes.includes('content')) {
      recommendations.push("Review and enhance content to better align with participant expectations and knowledge levels");
    }
    
    if (sentimentScore < 60 && topThemes.includes('presenter')) {
      recommendations.push("Consider additional preparation or training for presenters to improve delivery");
    }
    
    if (topThemes.includes('time')) {
      recommendations.push("Optimize time allocation for different sections based on content importance");
    }
    
    if (!topThemes.includes('interactivity') || sentimentScore < 60) {
      recommendations.push("Incorporate more interactive elements to increase engagement");
    }
    
    if (topThemes.includes('technical') && sentimentScore < 60) {
      recommendations.push("Test and improve technical setup before future events");
    }
    
    // Add general recommendations if needed
    if (recommendations.length < 3) {
      recommendations.push("Collect more detailed feedback through targeted questions");
      recommendations.push("Follow up with participants to gather additional insights");
    }
    
    // Generate action items based on recommendations
    const actionItems = recommendations.map(rec => {
      // Convert recommendation to action item
      return rec
        .replace("Review and enhance", "Review and update")
        .replace("Consider", "Schedule")
        .replace("Optimize", "Restructure")
        .replace("Incorporate", "Add")
        .replace("Test and improve", "Test")
        .replace("Collect", "Implement system to collect")
        .replace("Follow up", "Send follow-up emails to");
    });

    // Create a summary narrative
    const summary = sentimentScore > 70
      ? `The event received primarily positive feedback with an overall sentiment score of ${sentimentScore}/100. Participants especially appreciated aspects related to ${topThemes.slice(0, 2).join(" and ")}.`
      : sentimentScore > 50
        ? `The event received mixed feedback with an overall sentiment score of ${sentimentScore}/100. While some aspects were well-received, there are opportunities for improvement, particularly regarding ${topThemes.slice(0, 2).join(" and ")}.`
        : `The event received feedback suggesting room for improvement, with a sentiment score of ${sentimentScore}/100. Key areas to address include ${topThemes.slice(0, 2).join(" and ")}.`;

    const result = {
      summary,
      sentimentScore,
      sentimentBreakdown,
      commonThemes,
      recommendations,
      actionItems,
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
