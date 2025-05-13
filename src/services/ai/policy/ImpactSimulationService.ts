
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";
import { PolicyData, PolicyImpactResult, PolicyImpactSimulation } from "./types";
import { CallTrace } from "@/types/ai";

/**
 * Service for simulating policy impacts
 */
export class ImpactSimulationService {
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
      const trace = AIServiceUtils.createTrace("policy-impact-simulation", context || "impact-analysis");
      
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
      await AIServiceUtils.logAIOperation(
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
        impactScore: 0,
        stakeholderImpact: {
          patients: { score: 0, description: "Unable to analyze due to error." },
          providers: { score: 0, description: "Unable to analyze due to error." },
          payers: { score: 0, description: "Unable to analyze due to error." }
        },
        economicImpact: "Unable to analyze due to error.",
        healthcareOutcomeImpact: "Unable to analyze due to error.",
        implementationComplexity: "Error occurred",
        recommendations: ["Analysis failed due to technical error."],
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
   * Simulates the potential impact of a policy using the policy data object
   * This version is used in the PolicyImpactSimulator component
   */
  static async simulateImpact(
    policy: PolicyData,
    params: { timeframe: string; region: string }
  ): Promise<PolicyImpactResult> {
    try {
      // Call the policy-impact-simulation edge function
      const { data, error } = await supabase.functions.invoke("policy-impact-simulation", {
        body: { 
          policyData: policy,
          simulationParams: params
        }
      });

      if (error) throw error;
      
      return data as PolicyImpactResult;
    } catch (error: any) {
      console.error("Error in policy impact simulation:", error);
      return {
        impactScore: 0,
        stakeholderImpact: {},
        economicImpact: {
          score: 0,
          description: "Unable to analyze due to an error."
        },
        socialImpact: {
          score: 0,
          description: "Unable to analyze due to an error."
        },
        healthcareImpact: {
          score: 0,
          description: "Unable to analyze due to an error."
        },
        healthcareOutcomeImpact: "Unable to analyze due to an error.",
        implementationComplexity: "Unable to analyze due to an error.",
        recommendations: ["Analysis failed due to technical error."],
        error: error.message
      };
    }
  }
}
