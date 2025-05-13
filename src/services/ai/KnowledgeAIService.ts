
import { AIService, AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export class KnowledgeAIService implements AIService {
  serviceType = AIServiceType.Knowledge;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Knowledge AI Service call recorded:', trace);
  }
}
