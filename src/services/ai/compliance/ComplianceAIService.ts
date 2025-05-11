
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface IPOverlapResult {
  hasOverlap: boolean;
  overlapScore: number;
  overlappingAreas: string[];
  recommendations: string[];
}

export interface ComplianceMatchResult {
  standardName: string;
  matchScore: number;
  requiredActions: string[];
  complianceEstimate: {
    percentCompliant: number;
    missingElements: string[];
  };
}

export interface EthicsAssessment {
  ethicsScore: number;
  risks: {
    category: string;
    description: string;
    severity: "low" | "medium" | "high";
    mitigationSteps: string[];
  }[];
  recommendations: string[];
  requiredActions: string[];
}

/**
 * Service for handling compliance and legal AI operations
 */
export class ComplianceAIService {
  /**
   * Detect IP overlap with existing innovations
   */
  static async detectIPOverlap(
    innovationDescription: string,
    patentClaims?: string[]
  ): Promise<IPOverlapResult> {
    try {
      const { data, error } = await supabase.functions.invoke("ip-overlap-detector", {
        body: { 
          innovationDescription,
          patentClaims
        }
      });

      if (error) throw error;
      return data as IPOverlapResult;
    } catch (error: any) {
      console.error("Error detecting IP overlap:", error);
      throw AIService.handleError(error, "detectIPOverlap", "compliance");
    }
  }

  /**
   * Match innovation against compliance standards (GDPR, HIPAA, WHO)
   */
  static async matchComplianceStandards(
    innovationDescription: string,
    standards: string[]
  ): Promise<ComplianceMatchResult[]> {
    try {
      const { data, error } = await supabase.functions.invoke("compliance-matcher", {
        body: { 
          innovationDescription,
          standards
        }
      });

      if (error) throw error;
      return data as ComplianceMatchResult[];
    } catch (error: any) {
      console.error("Error matching compliance standards:", error);
      throw AIService.handleError(error, "matchComplianceStandards", "compliance");
    }
  }

  /**
   * Assess ethics considerations for an innovation
   */
  static async assessEthics(
    innovationDescription: string,
    sector: string,
    userImpact: string
  ): Promise<EthicsAssessment> {
    try {
      const { data, error } = await supabase.functions.invoke("ethics-assessment", {
        body: { 
          innovationDescription,
          sector,
          userImpact
        }
      });

      if (error) throw error;
      return data as EthicsAssessment;
    } catch (error: any) {
      console.error("Error assessing ethics considerations:", error);
      throw AIService.handleError(error, "assessEthics", "compliance");
    }
  }
}
