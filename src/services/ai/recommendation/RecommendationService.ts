
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'resource' | 'event' | 'connection' | 'learning' | 'strategy';
  relevanceScore: number;
  reasoning: string;
  url?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface UserRecommendations {
  personalizedRecommendations: RecommendationItem[];
  trendingItems: RecommendationItem[];
  recentlyViewed?: RecommendationItem[];
}

export interface RecommendationParams {
  userId?: string;
  sectors?: string[];
  interests?: string[];
  recentActivity?: {
    type: string;
    itemId: string;
    timestamp: string;
  }[];
  limit?: number;
}

export interface RecommendationFeedback {
  recommendationId: string;
  userId: string;
  isRelevant: boolean;
  feedback?: string;
  timestamp?: string;
}

export class RecommendationService {
  /**
   * Get personalized recommendations for a user
   */
  static async getPersonalizedRecommendations(
    params: RecommendationParams
  ): Promise<UserRecommendations> {
    try {
      const { data, error } = await supabase.functions.invoke("personalized-recommendations", {
        body: params
      });

      if (error) throw error;
      return data as UserRecommendations;
    } catch (error: any) {
      console.error("Error fetching personalized recommendations:", error);
      throw AIServiceUtils.handleError(error, "getPersonalizedRecommendations", "recommendation");
    }
  }

  /**
   * Get recommendations for learning resources based on user interests
   */
  static async getLearningRecommendations(
    userId: string, 
    interests: string[], 
    pastActivity: any[] = []
  ): Promise<RecommendationItem[]> {
    try {
      const { data, error } = await supabase.functions.invoke("learning-recommendations", {
        body: { 
          userId,
          interests,
          pastActivity
        }
      });

      if (error) throw error;
      return data as RecommendationItem[];
    } catch (error: any) {
      console.error("Error fetching learning recommendations:", error);
      throw AIServiceUtils.handleError(error, "getLearningRecommendations", "recommendation");
    }
  }
  
  /**
   * Submit feedback on a recommendation
   */
  static async submitRecommendationFeedback(feedback: RecommendationFeedback): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke("recommendation-feedback", {
        body: feedback
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error submitting recommendation feedback:", error);
      throw AIServiceUtils.handleError(error, "submitRecommendationFeedback", "recommendation");
    }
  }

  /**
   * Get similar items based on an item id
   */
  static async getSimilarItems(
    itemId: string, 
    itemType: string,
    limit: number = 5
  ): Promise<RecommendationItem[]> {
    try {
      const { data, error } = await supabase.functions.invoke("similar-items-finder", {
        body: { 
          itemId,
          itemType,
          limit
        }
      });

      if (error) throw error;
      return data as RecommendationItem[];
    } catch (error: any) {
      console.error("Error fetching similar items:", error);
      throw AIServiceUtils.handleError(error, "getSimilarItems", "recommendation");
    }
  }
}
