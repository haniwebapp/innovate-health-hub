
import { supabase } from '@/integrations/supabase/client';
import { AICallTracer } from '../utils/AICallTracer';
import { AIOperationType, AIServiceType } from '../AIServiceRegistry';

export class QuotationAIService {
  private static instance: QuotationAIService;
  private tracer: AICallTracer;

  constructor() {
    this.tracer = new AICallTracer(AIServiceType.Quotation);
  }

  public static getInstance(): QuotationAIService {
    if (!QuotationAIService.instance) {
      QuotationAIService.instance = new QuotationAIService();
    }
    return QuotationAIService.instance;
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
}
