
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface WikiArticle {
  title: string;
  content: string;
  tags: string[];
  references: string[];
}

export interface ResearchOutreach {
  title: string;
  summary: string;
  keyPoints: string[];
  callToAction: string;
}

export interface CommentAssistResponse {
  suggestedComment: string;
  alternativePhrasing: string;
  tone: "supportive" | "questioning" | "neutral" | "critical";
}

/**
 * Service for handling community and content AI operations
 */
export class CommunityAIService {
  /**
   * Generate a wiki article based on a topic and references
   */
  static async generateWikiArticle(
    topic: string,
    references?: string[],
    existingContent?: string
  ): Promise<WikiArticle> {
    try {
      const { data, error } = await supabase.functions.invoke("wiki-builder", {
        body: { 
          topic,
          references,
          existingContent
        }
      });

      if (error) throw error;
      return data as WikiArticle;
    } catch (error: any) {
      console.error("Error generating wiki article:", error);
      throw AIService.handleError(error, "generateWikiArticle", "community");
    }
  }

  /**
   * Compose research outreach content for social media or newsletters
   */
  static async composeResearchOutreach(
    researchTitle: string,
    researchAbstract: string,
    audience: string,
    platform?: string
  ): Promise<ResearchOutreach> {
    try {
      const { data, error } = await supabase.functions.invoke("research-outreach-composer", {
        body: { 
          researchTitle,
          researchAbstract,
          audience,
          platform
        }
      });

      if (error) throw error;
      return data as ResearchOutreach;
    } catch (error: any) {
      console.error("Error composing research outreach:", error);
      throw AIService.handleError(error, "composeResearchOutreach", "community");
    }
  }

  /**
   * Generate comment suggestions based on article content
   */
  static async generateCommentSuggestion(
    articleContent: string,
    commentContext?: string,
    tone?: "supportive" | "questioning" | "neutral"
  ): Promise<CommentAssistResponse> {
    try {
      const { data, error } = await supabase.functions.invoke("comment-assistant", {
        body: { 
          articleContent,
          commentContext,
          tone
        }
      });

      if (error) throw error;
      return data as CommentAssistResponse;
    } catch (error: any) {
      console.error("Error generating comment suggestion:", error);
      throw AIService.handleError(error, "generateCommentSuggestion", "community");
    }
  }
}
