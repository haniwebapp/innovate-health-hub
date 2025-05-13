
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class EventsAIService implements AIService {
  serviceType = AIServiceType.Events;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Events AI Service call recorded:', trace);
  }
}
