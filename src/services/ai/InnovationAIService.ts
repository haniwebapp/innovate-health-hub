
import { AIService, AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export class InnovationAIService implements AIService {
  serviceType = AIServiceType.Innovation;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Innovation AI Service call recorded:', trace);
  }
}
