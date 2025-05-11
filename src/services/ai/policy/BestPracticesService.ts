
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";
import { PolicyData, PolicyBestPracticesResult } from "./types";

/**
 * Service for analyzing policies against best practices
 */
export class BestPracticesService {
  /**
   * Analyzes a policy against healthcare best practices
   */
  static async analyzePolicyAgainstBestPractices(
    policy: PolicyData
  ): Promise<PolicyBestPracticesResult> {
    try {
      const trace = AIService.createTrace("policy-best-practices", "best-practices-analysis");
      
      const { data, error } = await supabase.functions.invoke("healthcare-policy-analysis", {
        body: { 
          policyData: policy,
          analysisType: "best-practices",
          trace 
        }
      });

      if (error) throw error;
      
      // Log the AI operation for analytics and improvement
      await AIService.logAIOperation(
        "policy-best-practices",
        "best-practices-analysis",
        { policy },
        data,
        undefined
      );
      
      return data as PolicyBestPracticesResult;
    } catch (error: any) {
      console.error("Error in policy best practices analysis:", error);
      return {
        overallScore: 0,
        strengths: ["Error analyzing policy"],
        weaknesses: ["Unable to complete analysis"],
        opportunities: [],
        threats: [],
        recommendations: ["Try again with more detailed policy information"],
        error: error.message
      };
    }
  }

  /**
   * Analyzes the stakeholder impact of a policy
   */
  static async analyzeStakeholderImpact(
    policy: PolicyData
  ): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke("healthcare-policy-analysis", {
        body: { 
          policyData: policy,
          analysisType: "stakeholder-impact"
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error in stakeholder impact analysis:", error);
      throw error;
    }
  }

  /**
   * Analyzes the implementation feasibility of a policy
   */
  static async analyzeImplementationFeasibility(
    policy: PolicyData
  ): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke("healthcare-policy-analysis", {
        body: { 
          policyData: policy,
          analysisType: "implementation-feasibility"
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error in implementation feasibility analysis:", error);
      throw error;
    }
  }
}
