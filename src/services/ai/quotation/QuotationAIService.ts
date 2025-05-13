
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

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

  // Add specific methods required for quotation generation here
}
