
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface EventRecommendation {
  eventId: string;
  eventTitle: string;
  matchScore: number;
  matchReason: string;
}

export interface SpeakerSuggestion {
  name: string;
  expertise: string[];
  relevanceScore: number;
  reasonForSuggestion: string;
  potentialTopics: string[];
}

export interface EventTrend {
  topic: string;
  popularity: number;
  momentumScore: number;
  relevantAudiences: string[];
  relatedEvents: string[];
}

/**
 * Service for handling events-related AI operations
 */
export class EventsAIService {
  /**
   * Get personalized event recommendations for a user
   */
  static async getEventRecommendations(
    userId: string,
    interests?: string[],
    pastEvents?: string[]
  ): Promise<EventRecommendation[]> {
    try {
      const { data, error } = await supabase.functions.invoke("event-recommender", {
        body: { 
          userId,
          interests,
          pastEvents 
        }
      });

      if (error) throw error;
      return data as EventRecommendation[];
    } catch (error: any) {
      console.error("Error getting event recommendations:", error);
      throw AIService.handleError(error, "getEventRecommendations", "events");
    }
  }

  /**
   * Get speaker suggestions for an event
   */
  static async getSpeakerSuggestions(
    eventTopic: string,
    eventDetails: string
  ): Promise<SpeakerSuggestion[]> {
    try {
      const { data, error } = await supabase.functions.invoke("speaker-suggester", {
        body: { 
          eventTopic,
          eventDetails
        }
      });

      if (error) throw error;
      return data as SpeakerSuggestion[];
    } catch (error: any) {
      console.error("Error getting speaker suggestions:", error);
      throw AIService.handleError(error, "getSpeakerSuggestions", "events");
    }
  }

  /**
   * Predict trending event topics
   */
  static async predictEventTrends(
    sector?: string,
    timeframe?: string
  ): Promise<EventTrend[]> {
    try {
      const { data, error } = await supabase.functions.invoke("event-trend-predictor", {
        body: { 
          sector,
          timeframe
        }
      });

      if (error) throw error;
      return data as EventTrend[];
    } catch (error: any) {
      console.error("Error predicting event trends:", error);
      throw AIService.handleError(error, "predictEventTrends", "events");
    }
  }

  /**
   * Summarize event feedback
   */
  static async summarizeEventFeedback(
    feedbackItems: string[]
  ): Promise<{
    summary: string;
    sentimentScore: number;
    strengths: string[];
    improvements: string[];
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
      throw AIService.handleError(error, "summarizeEventFeedback", "events");
    }
  }
}
