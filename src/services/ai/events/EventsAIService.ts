
import { supabase } from "@/integrations/supabase/client";

interface EventRecommendation {
  eventId: string;
  eventTitle: string;
  matchScore: number;
  matchReason: string;
}

export class EventsAIService {
  /**
   * Get personalized event recommendations for a user
   */
  static async getEventRecommendations(
    userId: string,
    interests: string[] = [],
    pastEvents: string[] = []
  ): Promise<EventRecommendation[]> {
    try {
      // Call the Supabase edge function for recommendations
      const { data, error } = await supabase.functions.invoke('event-recommendation-service', {
        body: { userId, interests, pastEvents, limit: 5 },
      });

      if (error) throw error;

      // Map the response to the expected format
      return (data || []).map((item: any) => ({
        eventId: item.id,
        eventTitle: item.title,
        matchScore: item.match_score,
        matchReason: item.match_reason,
      }));
    } catch (error) {
      console.error("Error fetching event recommendations:", error);
      throw error;
    }
  }

  /**
   * Analyze event feedback and generate summary
   */
  static async analyzeEventFeedback(eventId: string): Promise<{ summary: string; sentiment: string; suggestions: string[] }> {
    try {
      const { data, error } = await supabase.functions.invoke('event-feedback-summarizer', {
        body: { eventId },
      });

      if (error) throw error;

      return data || {
        summary: "No feedback data available for analysis.",
        sentiment: "neutral",
        suggestions: []
      };
    } catch (error) {
      console.error("Error analyzing event feedback:", error);
      throw error;
    }
  }

  /**
   * Predict event trends based on historical data
   */
  static async predictEventTrends(): Promise<{ trends: any[]; forecast: any }> {
    try {
      const { data, error } = await supabase.functions.invoke('event-trend-predictor', {
        body: {},
      });

      if (error) throw error;

      return data || { trends: [], forecast: {} };
    } catch (error) {
      console.error("Error predicting event trends:", error);
      throw error;
    }
  }
}
