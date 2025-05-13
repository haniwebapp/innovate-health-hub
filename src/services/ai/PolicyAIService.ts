
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "./AIService";

export interface PolicyAnalysisResult {
  score: number;
  alignmentAreas: string[];
  gapAreas: string[];
  recommendations: string[];
  vision2030Impact: string;
}

export interface StrategyGapParams {
  policyDetails: {
    title: string;
    description: string;
    objectives: string[];
    targetSectors?: string[];
  };
  currentState?: string;
  desiredState?: string;
}

export class PolicyAIService {
  /**
   * Analyze policy alignment with Vision 2030
   */
  static async analyzeVisionAlignment(
    policyText: string, 
    policyTitle?: string
  ): Promise<PolicyAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-vision-alignment", {
        body: { 
          policyText,
          policyTitle
        }
      });

      if (error) throw error;
      return data as PolicyAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing policy alignment:", error);
      throw AIService.handleError(error, "analyzeVisionAlignment", "policy");
    }
  }

  /**
   * Analyze healthcare strategy gaps using AI
   */
  static async analyzeStrategyGaps(
    params: StrategyGapParams
  ): Promise<{
    gaps: { 
      title: string; 
      description: string; 
      severity: 'low' | 'medium' | 'high';
      potentialImpact: string;
    }[];
    recommendations: string[];
    overallAnalysis: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("strategy-gap-analysis", {
        body: params
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error analyzing strategy gaps:", error);
      throw AIService.handleError(error, "analyzeStrategyGaps", "policy");
    }
  }

  /**
   * Generate policy recommendations based on input parameters
   */
  static async generatePolicyRecommendations(
    sector: string,
    focus: string,
    currentChallenges: string[]
  ): Promise<{
    recommendations: string[];
    potentialImpact: string;
    implementationConsiderations: string[];
    stakeholders: string[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-recommendations", {
        body: { 
          sector,
          focus,
          currentChallenges
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error generating policy recommendations:", error);
      throw AIService.handleError(error, "generatePolicyRecommendations", "policy");
    }
  }
}
