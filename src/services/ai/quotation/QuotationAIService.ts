
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export interface QuotationQuery {
  query: string;
  context?: string;
  userId?: string;
}

export interface QuotationResponse {
  response: string;
  source?: string;
  confidence: number;
  contextLinks?: string[];
}

export class QuotationAIService implements AIService {
  serviceType = AIServiceType.Quotation;

  constructor() {}

  static getInstance(): QuotationAIService {
    return new QuotationAIService();
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

  static async handleQuotationQuery(query: QuotationQuery): Promise<QuotationResponse> {
    console.log('Processing quotation query:', query);
    
    // Mock implementation
    return {
      response: `Here's a response to your query: "${query.query}"`,
      source: "Database/Knowledge Base",
      confidence: 0.92,
      contextLinks: [
        "/resources/healthcare-policy",
        "/faq/quotation-process"
      ]
    };
  }
}
