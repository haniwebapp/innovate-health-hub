
import { AIService, AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export class RegulatoryAIService implements AIService {
  serviceType = AIServiceType.Regulatory;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Regulatory AI Service call recorded:', trace);
  }
}
