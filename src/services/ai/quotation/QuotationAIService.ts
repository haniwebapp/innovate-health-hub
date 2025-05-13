
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "@/services/ai/AIService";
import { CallTrace } from "@/types/ai";

export interface QuotationQuery {
  query: string;
  userId?: string;
  context?: string;
}

export interface QuotationResponse {
  answer: string;
  quotationData?: {
    price?: number;
    timeframe?: string;
    services?: string[];
    requirements?: string[];
  };
  relatedResources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  followUpQuestions?: string[];
}

export class QuotationAIService {
  /**
   * Handle quotation queries from users and generate appropriate responses
   */
  static async handleQuotationQuery(query: QuotationQuery): Promise<QuotationResponse> {
    try {
      const trace: CallTrace = AIService.createTrace("query_quotation", "quotation");
      
      // Log the operation for analytics
      await AIService.logAIOperation(trace, {
        query: query.query,
        userId: query.userId,
        context: query.context
      });

      // Call edge function (in production would use actual Supabase edge function)
      const { data, error } = await supabase.functions.invoke("quotation-assistant", {
        body: { 
          query: query.query,
          userId: query.userId,
          context: query.context || "investment"
        }
      });

      if (error) throw error;
      
      // For now, create a mock response while the edge function is being developed
      const response: QuotationResponse = data || {
        answer: `Thank you for your question about "${query.query}". I'm Fahad, your investment assistant. Let me help you with that quotation. Based on the current market analysis, I recommend exploring our digital health sector which has shown a 15% growth rate this quarter. Would you like me to provide more specific information?`,
        quotationData: {
          price: query.query.toLowerCase().includes("price") ? 25000 : undefined,
          timeframe: query.query.toLowerCase().includes("time") ? "3-6 months" : undefined,
          services: ["Market Analysis", "Investment Matching", "Regulatory Guidance"],
          requirements: ["Business Plan", "Financial Projections", "Compliance Documentation"]
        },
        relatedResources: [
          {
            title: "2023 Healthcare Investment Guide",
            url: "/dashboard/investment/market-analysis",
            type: "guide"
          },
          {
            title: "Investment Matching Service",
            url: "/dashboard/investment/investor-matching",
            type: "service"
          }
        ],
        followUpQuestions: [
          "What investment sectors are trending this quarter?",
          "How can I improve my pitch deck?",
          "What are the regulatory requirements for healthcare startups?"
        ]
      };

      return response;
    } catch (error: any) {
      console.error("Error in QuotationAIService:", error);
      return {
        answer: "I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.",
        followUpQuestions: [
          "Can you tell me about investment opportunities?",
          "What services do you offer?",
          "How can I contact a human advisor?"
        ]
      };
    }
  }
}
