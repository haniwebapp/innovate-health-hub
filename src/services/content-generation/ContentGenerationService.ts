
import { supabase } from "@/integrations/supabase/client";
import { StoryGenerationPrompt, StoryGenerationResult, StoryAnalysisResult } from "@/services/ai/success/SuccessStoryAIService";

export class ContentGenerationService {
  /**
   * Generate a success story draft based on provided information
   */
  static async generateSuccessStory(prompt: StoryGenerationPrompt): Promise<StoryGenerationResult> {
    try {
      const { data, error } = await supabase.functions.invoke("story-generator", {
        body: { prompt }
      });
      
      if (error) throw error;
      return data as StoryGenerationResult;
    } catch (error: any) {
      console.error("Error generating success story:", error);
      throw new Error(`Failed to generate story: ${error.message}`);
    }
  }
  
  /**
   * Analyze a success story for quality and improvement suggestions
   */
  static async analyzeStory(title: string, content: string): Promise<StoryAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("story-analyzer", {
        body: { 
          title,
          content
        }
      });
      
      if (error) throw error;
      return data as StoryAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing story:", error);
      throw new Error(`Failed to analyze story: ${error.message}`);
    }
  }
  
  /**
   * Summarize event feedback
   */
  static async summarizeEventFeedback(feedbackItems: string[]): Promise<{
    summary: string;
    sentimentScore: number;
    sentimentBreakdown: Record<string, number>;
    commonThemes: string[];
    recommendations: string[];
    actionItems: string[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("event-feedback-summarizer", {
        body: { feedbackItems }
      });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error summarizing event feedback:", error);
      throw new Error(`Failed to summarize feedback: ${error.message}`);
    }
  }
  
  /**
   * Predict event trends
   */
  static async predictEventTrends(
    sector: string = "healthcare", 
    timeframe: string = "6months"
  ): Promise<{
    topic: string;
    popularity: number;
    momentumScore: number;
    relevantAudiences: string[];
    relatedEvents: string[];
  }[]> {
    try {
      const { data, error } = await supabase.functions.invoke("event-trend-predictor", {
        body: { sector, timeframe }
      });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error predicting event trends:", error);
      throw new Error(`Failed to predict trends: ${error.message}`);
    }
  }
  
  /**
   * Get speaker suggestions for an event
   */
  static async getSpeakerSuggestions(
    eventTopic: string,
    eventDetails: string
  ): Promise<{
    name: string;
    expertise: string[];
    relevanceScore: number;
    reasonForSuggestion: string;
    potentialTopics: string[];
  }[]> {
    try {
      const { data, error } = await supabase.functions.invoke("speaker-suggester", {
        body: { 
          eventTopic,
          eventDetails
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error getting speaker suggestions:", error);
      throw new Error(`Failed to get speaker suggestions: ${error.message}`);
    }
  }
}
