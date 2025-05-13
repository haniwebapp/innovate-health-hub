
import { AIService } from "../AIService";
import { AIServiceType } from "../AIServiceRegistry";
import { AIServiceStaticReferences, CallTrace } from "../types/AIServiceTypes";
import { supabase } from "@/integrations/supabase/client";

export interface QuotationQuery {
  query: string;
  userId?: string | null;
  context?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface QuotationData {
  price?: number;
  timeframe?: string;
  services?: string[];
  requirements?: string[];
}

export interface QuotationResponse {
  answer: string;
  quotationData?: QuotationData;
  relatedResources?: Resource[];
  followUpQuestions?: string[];
}

export class QuotationAIService extends AIService {
  serviceType = AIServiceType.Quotation;
  private static instance: QuotationAIService;
  private messageHistory: {role: 'user' | 'assistant', content: string}[] = [];

  constructor() {
    super();
  }

  public static getInstance(): QuotationAIService {
    if (!QuotationAIService.instance) {
      QuotationAIService.instance = new QuotationAIService();
    }
    return QuotationAIService.instance;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Quotation AI Service call recorded:', trace);
  }

  public async handleQuotationQuery(query: QuotationQuery): Promise<QuotationResponse> {
    try {
      console.log("Processing quotation query:", query);
      
      // Add user message to history
      this.messageHistory.push({
        role: 'user',
        content: query.query
      });
      
      // Limit history to last 10 messages to prevent token overflow
      if (this.messageHistory.length > 10) {
        this.messageHistory = this.messageHistory.slice(this.messageHistory.length - 10);
      }
      
      // Call the chat-gpt edge function
      const { data, error } = await supabase.functions.invoke("chat-gpt", {
        body: { 
          messages: this.messageHistory,
          context: query.context || null
        }
      });

      if (error) {
        console.error("Error calling chat-gpt function:", error);
        throw error;
      }
      
      // Add assistant response to history
      if (data && data.answer) {
        this.messageHistory.push({
          role: 'assistant',
          content: data.answer
        });
      }
      
      return data as QuotationResponse;
    } catch (error) {
      console.error("Error in handleQuotationQuery:", error);
      throw error;
    }
  }
  
  // Clear message history (useful for starting new conversations)
  public clearMessageHistory(): void {
    this.messageHistory = [];
  }
}
