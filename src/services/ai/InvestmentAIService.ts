
import { AIService, AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export class InvestmentAIService implements AIService {
  serviceType = AIServiceType.Investment;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Investment AI Service call recorded:', trace);
  }
}
