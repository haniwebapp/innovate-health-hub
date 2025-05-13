
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class SupportAIService implements AIService {
  serviceType = AIServiceType.Support;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Support AI Service call recorded:', trace);
  }
}
