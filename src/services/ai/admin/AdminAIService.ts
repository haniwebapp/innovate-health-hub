
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class AdminAIService implements AIService {
  serviceType = AIServiceType.Admin;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Admin AI Service call recorded:', trace);
  }
}
