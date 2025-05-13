
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";
import { 
  PolicyAnnotationResult, 
  PolicyQAResult, 
  ImplementationGuidanceResult 
} from "./types";

export class PolicyAnnotationService {
  /**
   * Annotate policy text with insights and guidelines
   */
  static async annotatePolicy(
    policyText: string,
    sector?: string
  ): Promise<PolicyAnnotationResult> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-annotation", {
        body: { 
          policyText,
          sector
        }
      });

      if (error) throw error;
      return data as PolicyAnnotationResult;
    } catch (error: any) {
      console.error("Error annotating policy:", error);
      return {
        annotations: [],
        overallAnalysis: "Failed to analyze policy. Please try again later.",
        keyTakeaways: ["Error occurred during analysis"],
        error: error.message || "Unknown error occurred"
      };
    }
  }

  /**
   * Get implementation guidance for a policy
   */
  static async getImplementationGuidance(
    policyText: string,
    policyTitle?: string,
    sector?: string
  ): Promise<ImplementationGuidanceResult> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-implementation-guidance", {
        body: { 
          policyText,
          policyTitle,
          sector
        }
      });

      if (error) throw error;
      return data as ImplementationGuidanceResult;
    } catch (error: any) {
      console.error("Error getting implementation guidance:", error);
      throw AIService.handleError(error, "getImplementationGuidance", "policy");
    }
  }

  /**
   * Ask a question about a specific policy
   */
  static async askPolicyQuestion(
    policyText: string,
    question: string
  ): Promise<PolicyQAResult> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-analysis-qa", {
        body: { 
          policyText,
          question
        }
      });

      if (error) throw error;
      return data as PolicyQAResult;
    } catch (error: any) {
      console.error("Error asking policy question:", error);
      return {
        answer: "Unable to answer your question at this moment.",
        confidence: "low",
        relevantSections: [],
        suggestions: ["Please try again later."],
        error: error.message || "Unknown error occurred"
      };
    }
  }
}
