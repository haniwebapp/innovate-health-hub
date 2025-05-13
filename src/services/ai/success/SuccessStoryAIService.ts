
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";

export interface StoryGenerationPrompt {
  innovation: string;
  impact: string;
  organization: string;
  keyOutcomes: string[];
}

export interface StoryGenerationResult {
  title: string;
  summary: string;
  content: string;
  impactMetrics: Record<string, any>;
  suggestedTags: string[];
}

export interface StoryAnalysisResult {
  readabilityScore: number;
  sentimentScore: number;
  engagementPotential: number;
  improvementSuggestions: string[];
  keyHighlights: string[];
}

/**
 * Service for handling success story-related AI operations
 */
export class SuccessStoryAIService {
  /**
   * Generate a draft success story based on provided information
   */
  static async generateStory(
    prompt: StoryGenerationPrompt
  ): Promise<StoryGenerationResult> {
    try {
      const { data, error } = await supabase.functions.invoke("story-generator", {
        body: { prompt }
      });

      if (error) throw error;
      return data as StoryGenerationResult;
    } catch (error: any) {
      console.error("Error generating success story:", error);
      throw AIServiceUtils.handleError(error, "generateStory", "success");
    }
  }

  /**
   * Analyze an existing story for quality and improvement suggestions
   */
  static async analyzeStory(
    title: string,
    content: string
  ): Promise<StoryAnalysisResult> {
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
      console.error("Error analyzing success story:", error);
      throw AIServiceUtils.handleError(error, "analyzeStory", "success");
    }
  }

  /**
   * Suggest relevant success stories based on user interests
   */
  static async suggestRelatedStories(
    currentStoryId: string,
    limit: number = 3
  ): Promise<{
    id: string;
    title: string;
    summary: string;
    relevanceScore: number;
    category: string;
  }[]> {
    try {
      const { data, error } = await supabase.functions.invoke("story-recommender", {
        body: { 
          currentStoryId,
          limit
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error suggesting related stories:", error);
      throw AIServiceUtils.handleError(error, "suggestRelatedStories", "success");
    }
  }
}
