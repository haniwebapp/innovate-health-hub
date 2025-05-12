
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface StoryGenerationPrompt {
  title: string;
  innovationType: string;
  organization: string;
  challenge: string;
  solution: string;
  outcome: string;
  quotes?: string[];
  keywords?: string[];
}

export interface StoryGenerationResult {
  title: string;
  content: string;
  summary: string;
  highlights: string[];
  suggestedImages: string[];
  socialMediaSnippets: {
    twitter: string;
    linkedin: string;
    facebook: string;
  };
}

export interface StoryAnalysisResult {
  readabilityScore: number;
  sentimentScore: number;
  tone: "professional" | "casual" | "inspirational" | "technical";
  targetAudience: string[];
  keyMessages: string[];
  improvementSuggestions: string[];
  strengths: string[];
}

/**
 * Service for AI-powered success story generation and analysis
 */
export class SuccessStoryAIService {
  /**
   * Generate a success story based on provided details
   */
  static async generateSuccessStory(
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
      throw AIService.handleError(error, "generateSuccessStory", "success");
    }
  }

  /**
   * Analyze a success story for quality and improvement suggestions
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
      console.error("Error analyzing story:", error);
      throw AIService.handleError(error, "analyzeStory", "success");
    }
  }

  /**
   * Generate social media content from a success story
   */
  static async generateSocialContent(
    storyTitle: string,
    storyContent: string,
    platforms: string[] = ["twitter", "linkedin", "facebook"]
  ): Promise<Record<string, string[]>> {
    try {
      const { data, error } = await supabase.functions.invoke("social-content-generator", {
        body: { 
          storyTitle,
          storyContent,
          platforms
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error generating social content:", error);
      throw AIService.handleError(error, "generateSocialContent", "success");
    }
  }

  /**
   * Generate image prompts for success story illustrations
   */
  static async generateImagePrompts(
    storyTitle: string,
    storyContent: string,
    count: number = 3
  ): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke("image-prompt-generator", {
        body: { 
          storyTitle,
          storyContent,
          count
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error generating image prompts:", error);
      throw AIService.handleError(error, "generateImagePrompts", "success");
    }
  }
}
