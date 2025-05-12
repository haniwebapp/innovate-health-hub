
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

    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title and content are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, this would use NLP APIs or an LLM
    // For now, we'll generate a simple analysis
    
    // Calculate a simple readability score based on sentence and word length
    const sentences = content.split(/[.!?]+/).filter(Boolean);
    const avgSentenceLength = sentences.reduce((sum, sentence) => 
      sum + sentence.split(/\s+/).length, 0) / sentences.length;
    
    // Readability score: lower is better (8-12 is ideal for general audience)
    const readabilityScore = Math.min(100, Math.max(0, 
      Math.round(50 + (avgSentenceLength - 15) * 3)));
    
    // Calculate sentiment based on positive and negative words
    const positiveWords = ['success', 'improvement', 'benefit', 'positive', 'effective', 
      'enhance', 'efficient', 'innovative', 'breakthrough', 'progress'];
    const negativeWords = ['challenge', 'difficulty', 'problem', 'struggle', 'issue', 
      'obstacle', 'hurdle', 'complicated', 'complex', 'risk'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    const contentLower = content.toLowerCase();
    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = contentLower.match(regex);
      if (matches) positiveCount += matches.length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = contentLower.match(regex);
      if (matches) negativeCount += matches.length;
    });
    
    // Sentiment score from 0-100 (higher is more positive)
    const totalWords = positiveCount + negativeCount;
    const sentimentScore = totalWords > 0 
      ? Math.round((positiveCount / totalWords) * 100)
      : 50; // Neutral if no sentiment words found
    
    // Engagement score based on story structure elements
    const hasHeadings = content.includes('#');
    const hasBulletPoints = content.includes('• ') || content.includes('* ');
    const hasQuotes = content.includes('"') || content.includes("'");
    const hasNumbers = /\d+%|\d+ percent|\d+ patients/i.test(content);
    
    // Calculate engagement score (0-100)
    let engagementScore = 50; // Start at neutral
    if (hasHeadings) engagementScore += 10;
    if (hasBulletPoints) engagementScore += 10;
    if (hasQuotes) engagementScore += 15;
    if (hasNumbers) engagementScore += 15;
    
    // Add or subtract based on content length
    const contentWords = content.split(/\s+/).length;
    if (contentWords < 200) engagementScore -= 10; // Too short
    else if (contentWords > 1500) engagementScore -= 10; // Too long
    else if (contentWords > 500 && contentWords < 1000) engagementScore += 10; // Just right
    
    // Cap at 0-100
    engagementScore = Math.min(100, Math.max(0, engagementScore));
    
    // Generate improvement suggestions
    const improvementSuggestions = [];
    
    if (readabilityScore > 70) {
      improvementSuggestions.push("Consider using shorter sentences and simpler language to improve readability.");
    }
    
    if (sentimentScore < 60) {
      improvementSuggestions.push("Include more positive language highlighting benefits and outcomes.");
    }
    
    if (!hasHeadings) {
      improvementSuggestions.push("Add clear section headings to organize your content.");
    }
    
    if (!hasBulletPoints) {
      improvementSuggestions.push("Use bullet points to highlight key outcomes or benefits.");
    }
    
    if (!hasNumbers) {
      improvementSuggestions.push("Include specific metrics or numbers to quantify the impact.");
    }
    
    if (contentWords < 300) {
      improvementSuggestions.push("Consider expanding your story with more details about the implementation and results.");
    } else if (contentWords > 1200) {
      improvementSuggestions.push("The story might benefit from being more concise. Consider trimming less important details.");
    }
    
    // If we have few suggestions, add a general one
    if (improvementSuggestions.length < 2) {
      improvementSuggestions.push("Consider adding quotes from stakeholders or patients to make the story more relatable.");
    }
    
    // Extract key highlights
    const keyHighlights = [
      `The story has a ${sentimentScore > 70 ? 'positive' : sentimentScore > 40 ? 'balanced' : 'cautious'} tone.`,
      `The content is ${readabilityScore < 50 ? 'highly readable' : readabilityScore < 70 ? 'moderately readable' : 'somewhat challenging to read'}.`,
      `The narrative ${hasHeadings ? 'is well-structured with clear headings' : 'could benefit from better structure'}.`,
      `The story ${hasNumbers ? 'effectively uses metrics to demonstrate impact' : 'could be enhanced with specific metrics'}.`
    ];

    const result = {
      readabilityScore,
      sentimentScore,
      engagementPotential: engagementScore,
      improvementSuggestions,
      keyHighlights,
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
