
import { AIService } from '../AIService';
import { AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';
import { supabase } from '@/integrations/supabase/client';

// Types specific to compliance analysis
export interface ComplianceAnalysisResult {
  overallCompliance: number; // 0-100 score
  riskLevel: 'low' | 'medium' | 'high';
  requirements: ComplianceRequirement[];
  recommendations: string[];
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: 'met' | 'partially_met' | 'not_met' | 'not_applicable';
  details?: string;
}

export class ComplianceAIService implements AIService {
  serviceType = AIServiceType.Compliance;

  async isAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          messages: [{ role: 'user', content: 'ping' }],
          context: 'regulatory'
        }
      });
      
      return !error && !!data;
    } catch (error) {
      console.error('Error checking Compliance AI Service availability:', error);
      return false;
    }
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Compliance AI Service call recorded:', trace);
    // In a production environment, we would store this in a database
  }

  // Compliance-specific methods
  async analyzeCompliance(
    innovationDescription: string, 
    innovationType: string
  ): Promise<ComplianceAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          messages: [
            {
              role: 'system',
              content: 'You are a healthcare regulatory compliance expert. Analyze the described innovation for compliance requirements.'
            },
            {
              role: 'user',
              content: `Analyze compliance requirements for this innovation:
                Type: ${innovationType}
                Description: ${innovationDescription}`
            }
          ],
          context: 'regulatory',
          options: { temperature: 0.3 }
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Parse response and return structured data
      // This is simplified; in a real implementation we'd parse the response
      return {
        overallCompliance: 65,
        riskLevel: 'medium',
        requirements: [
          {
            id: '1',
            name: 'Data Privacy',
            description: 'Assessment of data privacy protections',
            status: 'partially_met',
            details: 'Further documentation needed on data encryption methods'
          }
        ],
        recommendations: [
          'Complete a comprehensive data protection impact assessment',
          'Document encryption methods for stored patient data'
        ]
      };
    } catch (error) {
      console.error('Error analyzing compliance:', error);
      throw error;
    }
  }
}
