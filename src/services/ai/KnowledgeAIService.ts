
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
  file_url?: string;
  language?: string;
}

export interface SemanticSearchParams {
  query: string;
  filters?: {
    categories?: string[];
    types?: string[];
    tags?: string[];
  };
  limit?: number;
  language?: string;
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

export interface DocumentMetadata {
  tags: string[];
  categories: string[];
  keyphrases: string[];
  error?: string;
}

export interface TranslationResult {
  translatedContent: string;
  detectedLanguage?: string;
  error?: string;
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
  static async extractDocumentMetadata(content: string): Promise<DocumentMetadata> {
    try {
      const { data, error } = await supabase.functions.invoke("document-metadata", {
        body: { content }
      });

      if (error) throw error;
      return data as DocumentMetadata;
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

  /**
   * Translate document content to a target language
   * @param content Text content to translate
   * @param targetLanguage Language code to translate to (e.g., 'en', 'ar')
   */
  static async translateContent(content: string, targetLanguage: string): Promise<TranslationResult> {
    try {
      const { data, error } = await supabase.functions.invoke("content-translation", {
        body: { content, targetLanguage }
      });

      if (error) throw error;
      return data as TranslationResult;
    } catch (error: any) {
      throw AIService.handleError(error, "translateContent", "knowledge");
    }
  }

  /**
   * Generate document embeddings for vector search
   * @param documentId ID of the document to generate embeddings for
   * @param content Document content
   */
  static async generateDocumentEmbeddings(documentId: string, content: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke("generate-embeddings", {
        body: { documentId, content }
      });

      if (error) throw error;
      return data.success as boolean;
    } catch (error: any) {
      throw AIService.handleError(error, "generateDocumentEmbeddings", "knowledge");
    }
  }

  /**
   * Find similar documents based on content similarity
   * @param documentId ID of the document to find similar documents for
   * @param limit Maximum number of similar documents to return
   */
  static async findSimilarDocuments(documentId: string, limit: number = 5): Promise<{
    similarDocuments: {
      id: string;
      title: string;
      similarity: number;
      type: string;
    }[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("similar-documents", {
        body: { documentId, limit }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "findSimilarDocuments", "knowledge");
    }
  }

  /**
   * Answer questions based on document content
   * @param question User question
   * @param documentIds Optional list of document IDs to search within
   */
  static async answerQuestion(question: string, documentIds?: string[]): Promise<{
    answer: string;
    sourceDocuments: {
      id: string;
      title: string;
      relevance: number;
    }[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("question-answering", {
        body: { question, documentIds }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "answerQuestion", "knowledge");
    }
  }
}
