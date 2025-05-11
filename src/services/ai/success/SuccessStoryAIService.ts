
import { supabase } from "@/integrations/supabase/client";
import { StoryGenerationPrompt, StoryGenerationResult, StoryAnalysisResult } from "./types";

// Use 'export type' for re-exporting types when isolatedModules is enabled
export type { StoryGenerationPrompt, StoryGenerationResult, StoryAnalysisResult };

export class SuccessStoryAIService {
  /**
   * Generate a success story based on provided information
   */
  static async generateSuccessStory(
    organization: string,
    category: string,
    keyPoints: string[]
  ): Promise<{
    title: string,
    summary: string,
    content: string,
    impactMetrics?: Record<string, any>,
    suggestedTags?: string[]
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('success-story-generation', {
        body: { organization, category, keyPoints }
      });
      
      if (error) throw error;
      
      return data || {
        title: '',
        summary: '',
        content: '',
        impactMetrics: {},
        suggestedTags: []
      };
    } catch (error) {
      console.error("Error generating success story:", error);
      return {
        title: '',
        summary: '',
        content: '',
        impactMetrics: {},
        suggestedTags: []
      };
    }
  }
  
  /**
   * Enhance an existing success story with AI
   */
  static async enhanceSuccessStory(
    storyId: string,
    enhancementOptions: { 
      improveSummary?: boolean,
      addImpactMetrics?: boolean,
      expandContent?: boolean,
      suggestTags?: boolean
    }
  ): Promise<{
    enhancedSummary?: string,
    enhancedContent?: string,
    impactMetrics?: Record<string, any>,
    suggestedTags?: string[]
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('success-story-enhancement', {
        body: { storyId, enhancementOptions }
      });
      
      if (error) throw error;
      
      return data || {};
    } catch (error) {
      console.error(`Error enhancing success story ${storyId}:`, error);
      return {};
    }
  }
  
  /**
   * Suggest similar success stories based on content similarity
   */
  static async suggestSimilarStories(
    storyId: string,
    limit: number = 3
  ): Promise<{ id: string, title: string, similarity: number }[]> {
    try {
      const { data, error } = await supabase.functions.invoke('success-story-similarity', {
        body: { storyId, limit }
      });
      
      if (error) throw error;
      
      return data?.similarStories || [];
    } catch (error) {
      console.error(`Error finding similar success stories to ${storyId}:`, error);
      return [];
    }
  }
  
  /**
   * Extract key insights from a collection of success stories
   */
  static async extractInsightsFromStories(
    categoryFilter?: string,
    limit: number = 10
  ): Promise<{
    commonThemes: string[],
    successFactors: string[],
    challenges: string[],
    impactSummary: string
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('success-story-insights', {
        body: { categoryFilter, limit }
      });
      
      if (error) throw error;
      
      return data || {
        commonThemes: [],
        successFactors: [],
        challenges: [],
        impactSummary: ''
      };
    } catch (error) {
      console.error("Error extracting insights from success stories:", error);
      return {
        commonThemes: [],
        successFactors: [],
        challenges: [],
        impactSummary: ''
      };
    }
  }
}
