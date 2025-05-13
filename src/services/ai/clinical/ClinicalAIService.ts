
import { AIService } from '../AIService';
import { AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';
import { supabase } from '@/integrations/supabase/client';

export interface ClinicalRecommendation {
  recommendationId: string;
  title: string;
  description: string;
  confidence: number;
  references: string[];
}

export interface DiagnosisAssessment {
  possibleConditions: {
    name: string;
    probability: number;
    description: string;
  }[];
  suggestedTests: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
}

export class ClinicalAIService implements AIService {
  serviceType = AIServiceType.Clinical;

  constructor() {}

  static getInstance(): ClinicalAIService {
    return new ClinicalAIService();
  }

  async isAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          messages: [{ role: 'user', content: 'ping' }],
          context: 'clinical'
        }
      });
      
      return !error && !!data;
    } catch (error) {
      console.error('Error checking Clinical AI Service availability:', error);
      return false;
    }
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Clinical AI Service call recorded:', trace);
    // In a production environment, we would store this in a database
  }
  
  // Clinical-specific methods
  async getClinicalRecommendations(
    symptoms: string[],
    patientData: Record<string, any>
  ): Promise<ClinicalRecommendation[]> {
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          messages: [
            {
              role: 'system',
              content: 'You are a clinical decision support system. Provide evidence-based recommendations.'
            },
            {
              role: 'user',
              content: `Based on the following symptoms: ${symptoms.join(", ")} and patient data: ${JSON.stringify(patientData)}, provide clinical recommendations.`
            }
          ],
          context: 'clinical',
          options: { temperature: 0.3 }
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Here we'd parse the response into the expected format
      // This is a placeholder that would be implemented properly
      return [
        {
          recommendationId: '1',
          title: 'Recommendation',
          description: data.message,
          confidence: 0.85,
          references: ['Evidence-based clinical guidelines']
        }
      ];
    } catch (error) {
      console.error('Error getting clinical recommendations:', error);
      throw error;
    }
  }
}
