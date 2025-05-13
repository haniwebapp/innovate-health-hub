
import { AIService } from '../AIService';
import { AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export class ComplianceAIService implements AIService {
  serviceType = AIServiceType.Compliance;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Compliance AI Service call recorded:', trace);
  }
}
