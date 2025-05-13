
import { AIService } from './AIService';
import { AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export class PolicyAIService implements AIService {
  serviceType = AIServiceType.Policy;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Policy AI Service call recorded:', trace);
  }
}
