
import { supabase } from '@/integrations/supabase/client';
import { AICallTracer } from '../utils/AICallTracer';
import { AIOperationType, AIServiceType } from '../AIServiceRegistry';

// Define types needed for the QuotationAIService
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
  relatedResources?: {
    title: string;
    url: string;
    type: string;
  }[];
  followUpQuestions?: string[];
}

export class QuotationAIService {
  private tracer: AICallTracer;
  
  constructor() {
    this.tracer = new AICallTracer(AIServiceType.Quotation);
  }

  /**
   * Generate a response to a quotation query
   */
  public async getQuotationResponse(
    query: string,
    context?: Record<string, any>
  ): Promise<string> {
    try {
      const operationContext = {
        query,
        userContext: context || {}
      };

      return this.tracer.traceOperation(
        AIOperationType.GenerateResponse,
        operationContext,
        async () => {
          // For now, we'll implement a simple response. In a production environment,
          // this would call an edge function or external API
          const { data, error } = await supabase.functions.invoke('quotation-assistant', {
            body: { query, context }
          });

          if (error) {
            console.error('Error calling quotation-assistant function:', error);
            throw error;
          }

          return data?.response || "I'm sorry, I couldn't process your request at this time.";
        }
      );
    } catch (error) {
      console.error('Error in getQuotationResponse:', error);
      return "I apologize, but I'm experiencing some technical difficulties. Please try again later.";
    }
  }

  /**
   * Handle a quotation query and return structured data
   */
  public static async handleQuotationQuery(query: QuotationQuery): Promise<QuotationResponse> {
    try {
      // In a full implementation, this would call a Supabase Edge Function
      // For now, create a mock response
      return {
        answer: `Thank you for your query about "${query.query}". Here's information about our investment services.`,
        quotationData: {
          price: 15000,
          timeframe: "4-6 weeks",
          services: ["Market Analysis", "Investment Strategy", "ROI Projection"],
          requirements: ["Business Plan", "Financial Records", "Market Research"]
        },
        relatedResources: [
          {
            title: "Investment Guide 2025",
            url: "/resources/investment-guide-2025",
            type: "Guide"
          },
          {
            title: "Healthcare Investment Opportunities",
            url: "/resources/healthcare-investment",
            type: "Report"
          }
        ],
        followUpQuestions: [
          "What kinds of healthcare projects are you looking to invest in?",
          "What is your expected ROI timeframe?",
          "Do you need assistance with regulatory compliance?"
        ]
      };
    } catch (error) {
      console.error('Error handling quotation query:', error);
      return {
        answer: "I apologize, but I'm experiencing some technical difficulties. Please try again later."
      };
    }
  }
}
