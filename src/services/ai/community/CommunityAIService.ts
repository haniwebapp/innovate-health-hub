
import { AIService } from '../AIService';
import { AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class CommunityAIService implements AIService {
  serviceType = AIServiceType.Community;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Community AI Service call recorded:', trace);
  }
}
