
import { supabase } from '@/integrations/supabase/client';
import { safeJSONParse } from '@/utils/securityUtils';

export interface ComplianceResult {
  standardName: string;
  matchScore: number;
  requiredActions: string[];
  complianceEstimate: {
    percentCompliant: number;
    missingElements: string[];
  };
}

export interface ComplianceMatchOptions {
  innovationDescription: string;
  innovationType?: string;
  standards?: string[];
}

export class ComplianceMatcherService {
  private static instance: ComplianceMatcherService;
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  public static getInstance(): ComplianceMatcherService {
    if (!ComplianceMatcherService.instance) {
      ComplianceMatcherService.instance = new ComplianceMatcherService();
    }
    return ComplianceMatcherService.instance;
  }
  
  /**
   * Analyzes an innovation against regulatory standards
   */
  public async matchCompliance(options: ComplianceMatchOptions): Promise<ComplianceResult[]> {
    try {
      // Use standards or default ones if not provided
      const standards = options.standards || ["ISO 13485", "HIPAA", "GDPR", "MOH Standards"];
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('compliance-matcher', {
        body: {
          innovationDescription: options.innovationDescription,
          innovationType: options.innovationType,
          standards
        }
      });
      
      if (error) {
        console.error('Compliance matcher error:', error);
        throw new Error('Failed to analyze compliance requirements');
      }
      
      // Parse the response
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error('Error in compliance matching:', error);
      // Fallback data in case of error
      return standards.map(standard => ({
        standardName: standard,
        matchScore: 0,
        requiredActions: ["Unable to analyze compliance requirements at this time."],
        complianceEstimate: {
          percentCompliant: 0,
          missingElements: ["Analysis failed"]
        }
      }));
    }
  }
}

// Export singleton instance
export const complianceMatcherService = ComplianceMatcherService.getInstance();
