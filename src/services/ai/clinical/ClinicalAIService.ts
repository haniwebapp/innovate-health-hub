
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class ClinicalAIService implements AIService {
  serviceType = AIServiceType.Clinical;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Clinical AI Service call recorded:', trace);
  }
}
