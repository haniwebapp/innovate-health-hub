
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "./AIService";

export interface DocumentData {
  id?: string;
  title: string;
  content: string;
  type: string;
  category?: string;
  tags?: string[];
  summary?: string;
  author?: string;
}

export interface SemanticSearchParams {
  query: string;
  filters?: {
    categories?: string[];
    types?: string[];
    tags?: string[];
  };
  limit?: number;
}

export interface DocumentSummary {
  summary: string;
  keyPoints: string[];
  relevantTopics: string[];
  error?: string;
}

export interface SearchResults {
  results: {
    id: string;
    title: string;
    summary: string;
    type: string;
    category: string;
    relevanceScore: number;
  }[];
  totalCount: number;
  error?: string;
}

export interface LearningRecommendation {
  resourceId: string;
  title: string;
  type: string;
  category: string;
  relevanceScore: number;
  reason: string;
}

export class KnowledgeAIService {
  /**
   * Generate a summary of a document with key points extracted
   */
  static async generateDocumentSummary(documentData: DocumentData): Promise<DocumentSummary> {
    try {
      const { data, error } = await supabase.functions.invoke("document-summarization", {
        body: { documentData }
      });

      if (error) throw error;
      return data as DocumentSummary;
    } catch (error: any) {
      throw AIService.handleError(error, "generateDocumentSummary", "knowledge");
    }
  }

  /**
   * Perform semantic search across documents and resources
   */
  static async semanticSearch(params: SemanticSearchParams): Promise<SearchResults> {
    try {
      const { data, error } = await supabase.functions.invoke("semantic-search", {
        body: params
      });

      if (error) throw error;
      return data as SearchResults;
    } catch (error: any) {
      throw AIService.handleError(error, "semanticSearch", "knowledge");
    }
  }

  /**
   * Generate personalized learning recommendations for a user
   */
  static async generateLearningRecommendations(
    userId: string,
    interests?: string[],
    pastActivity?: string[]
  ): Promise<LearningRecommendation[]> {
    try {
      const { data, error } = await supabase.functions.invoke("learning-recommendations", {
        body: { userId, interests, pastActivity }
      });

      if (error) throw error;
      return data as LearningRecommendation[];
    } catch (error: any) {
      throw AIService.handleError(error, "generateLearningRecommendations", "knowledge");
    }
  }

  /**
   * Extract tags and categories from document content
   */
  static async extractDocumentMetadata(content: string): Promise<{
    tags: string[];
    categories: string[];
    keyphrases: string[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("document-metadata", {
        body: { content }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "extractDocumentMetadata", "knowledge");
    }
  }

  /**
   * Check if a document contains sensitive or confidential information
   */
  static async detectSensitiveContent(content: string): Promise<{
    containsSensitiveInfo: boolean;
    sensitiveCategories: string[];
    confidence: number;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("sensitive-content-detection", {
        body: { content }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "detectSensitiveContent", "knowledge");
    }
  }
}
