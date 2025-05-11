
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface SupportQuery {
  query: string;
  context?: string;
  userId?: string;
}

export interface SupportResponse {
  answer: string;
  relatedResources?: {
    title: string;
    url: string;
    type: string;
  }[];
  followUpQuestions?: string[];
}

export interface TicketClassification {
  urgency: "low" | "medium" | "high" | "critical";
  sentiment: "positive" | "neutral" | "negative";
  category: string;
  assignedTeam: string;
}

/**
 * Service for handling support-related AI operations
 */
export class SupportAIService {
  /**
   * Generate an AI-powered response to a support query
   */
  static async handleSupportQuery(query: SupportQuery): Promise<SupportResponse> {
    try {
      const { data, error } = await supabase.functions.invoke("support-assistant", {
        body: query
      });

      if (error) throw error;
      return data as SupportResponse;
    } catch (error: any) {
      console.error("Error handling support query:", error);
      throw AIService.handleError(error, "handleSupportQuery", "support");
    }
  }

  /**
   * Classify support ticket by urgency, sentiment, and category
   */
  static async classifyTicket(
    ticketContent: string
  ): Promise<TicketClassification> {
    try {
      const { data, error } = await supabase.functions.invoke("ticket-classification", {
        body: { ticketContent }
      });

      if (error) throw error;
      return data as TicketClassification;
    } catch (error: any) {
      console.error("Error classifying ticket:", error);
      throw AIService.handleError(error, "classifyTicket", "support");
    }
  }

  /**
   * Generate first response for a support ticket
   */
  static async generateFirstResponse(
    ticketContent: string,
    ticketCategory: string
  ): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke("first-response-generator", {
        body: { 
          ticketContent,
          ticketCategory
        }
      });

      if (error) throw error;
      return data.response;
    } catch (error: any) {
      console.error("Error generating first response:", error);
      throw AIService.handleError(error, "generateFirstResponse", "support");
    }
  }

  /**
   * Summarize feedback from multiple tickets
   */
  static async summarizeFeedback(
    feedbackItems: string[]
  ): Promise<{
    summary: string;
    sentimentBreakdown: Record<string, number>;
    commonThemes: string[];
    recommendations: string[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("feedback-summarizer", {
        body: { feedbackItems }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error summarizing feedback:", error);
      throw AIService.handleError(error, "summarizeFeedback", "support");
    }
  }
}
