
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "./AIService";
import { CallTrace } from "@/types/ai";

/**
 * Interface for Vision 2030 alignment check results
 */
export interface Vision2030AlignmentResult {
  score: number;
  alignmentAreas: {
    area: string;
    score: number;
    rationale: string;
  }[];
  recommendations: string[];
  overallAssessment: string;
  error?: string;
}

/**
 * Interface for policy impact simulation results
 */
export interface PolicyImpactSimulation {
  sectors: {
    sector: string;
    impact: "positive" | "neutral" | "negative";
    magnitude: number;
    description: string;
  }[];
  timelineImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  stakeholders: {
    group: string;
    impact: string;
  }[];
  risks: string[];
  opportunities: string[];
  overallAssessment: string;
  error?: string;
}

/**
 * Service for handling policy and strategy related AI operations
 */
export class PolicyAIService {
  /**
   * Checks the alignment of a policy or innovation with Vision 2030 goals
   */
  static async checkVision2030Alignment(
    description: string,
    sector: string,
    context?: string
  ): Promise<Vision2030AlignmentResult> {
    try {
      const trace = AIService.createTrace("vision2030-alignment", context || "policy-alignment");
      
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { description, sector, trace }
      });

      if (error) throw error;
      
      // Log the AI operation for analytics and improvement
      await AIService.logAIOperation(
        "vision2030-alignment",
        context || "policy-alignment",
        { description, sector },
        data,
        undefined
      );
      
      return data as Vision2030AlignmentResult;
    } catch (error: any) {
      console.error("Error in Vision 2030 alignment check:", error);
      return {
        score: 0,
        alignmentAreas: [],
        recommendations: ["Unable to perform alignment check due to an error."],
        overallAssessment: "Error performing alignment assessment.",
        error: error.message
      };
    }
  }

  /**
   * Simulates the potential impact of a policy or healthcare innovation
   */
  static async simulatePolicyImpact(
    policyDescription: string,
    targetSectors: string[],
    timeframe: "short" | "medium" | "long",
    context?: string
  ): Promise<PolicyImpactSimulation> {
    try {
      const trace = AIService.createTrace("policy-impact-simulation", context || "impact-analysis");
      
      const { data, error } = await supabase.functions.invoke("policy-impact-simulation", {
        body: { 
          policyDescription, 
          targetSectors, 
          timeframe,
          trace 
        }
      });

      if (error) throw error;
      
      // Log the AI operation for analytics and improvement
      await AIService.logAIOperation(
        "policy-impact-simulation",
        context || "impact-analysis",
        { policyDescription, targetSectors, timeframe },
        data,
        undefined
      );
      
      return data as PolicyImpactSimulation;
    } catch (error: any) {
      console.error("Error in policy impact simulation:", error);
      return {
        sectors: [],
        timelineImpact: {
          shortTerm: "Unable to analyze due to error.",
          mediumTerm: "Unable to analyze due to error.",
          longTerm: "Unable to analyze due to error."
        },
        stakeholders: [],
        risks: ["Analysis failed due to technical error."],
        opportunities: [],
        overallAssessment: "Error performing policy impact analysis.",
        error: error.message
      };
    }
  }

  /**
   * Analyzes a policy against global healthcare best practices
   */
  static async analyzePolicyAgainstBestPractices(
    policyText: string,
    region?: string
  ): Promise<{
    matchingPractices: string[];
    gaps: string[];
    recommendations: string[];
    overallScore: number;
  }> {
    try {
      // This would connect to a Supabase Edge Function in a full implementation
      // For now, return mock data
      return {
        matchingPractices: [
          "Evidence-based healthcare delivery",
          "Patient-centered care approach"
        ],
        gaps: [
          "Digital health integration",
          "Cross-sector collaboration framework"
        ],
        recommendations: [
          "Consider integrating digital health solutions into the policy framework",
          "Develop stronger mechanisms for cross-sector collaboration"
        ],
        overallScore: 65
      };
    } catch (error: any) {
      console.error("Error in policy best practices analysis:", error);
      return {
        matchingPractices: [],
        gaps: [],
        recommendations: ["Analysis failed due to technical error."],
        overallScore: 0
      };
    }
  }
}
