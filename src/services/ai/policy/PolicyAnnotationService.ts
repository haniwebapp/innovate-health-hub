
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";
import { PolicyAnnotationResult, PolicyData } from "./types";

/**
 * Service for annotating policy documents and providing implementation guidance
 */
export class PolicyAnnotationService {
  /**
   * Analyzes a policy document and provides annotations for key sections
   */
  static async annotatePolicy(
    policyText: string,
    policyName: string
  ): Promise<PolicyAnnotationResult> {
    try {
      const trace = AIService.createTrace("policy-annotation", policyName);
      
      const { data, error } = await supabase.functions.invoke("policy-analysis-qa", {
        body: { 
          policyText, 
          analysisType: "annotation",
          trace 
        }
      });

      if (error) throw error;
      
      // Log the AI operation for analytics and improvement
      await AIService.logAIOperation(
        "policy-annotation",
        policyName,
        { policyText: policyText.substring(0, 100) + "..." }, // Don't log the full text
        data,
        undefined
      );
      
      return data as PolicyAnnotationResult;
    } catch (error: any) {
      console.error("Error in policy annotation:", error);
      return {
        annotations: [],
        overallAnalysis: "Error performing annotation analysis.",
        keyTakeaways: ["Unable to analyze policy due to an error."],
        error: error.message
      };
    }
  }

  /**
   * Provides implementation guidance for a policy
   */
  static async getImplementationGuidance(
    policyText: string,
    policyName: string
  ): Promise<any> {
    try {
      const trace = AIService.createTrace("implementation-guidance", policyName);
      
      const { data, error } = await supabase.functions.invoke("policy-analysis-qa", {
        body: { 
          policyText, 
          analysisType: "implementation",
          trace 
        }
      });

      if (error) throw error;
      
      await AIService.logAIOperation(
        "implementation-guidance",
        policyName,
        { policyTextLength: policyText.length },
        data,
        undefined
      );
      
      return data;
    } catch (error: any) {
      console.error("Error getting implementation guidance:", error);
      throw error;
    }
  }

  /**
   * Ask a question about a specific policy
   */
  static async askQuestion(
    policyText: string,
    question: string,
    context?: string
  ): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-analysis-qa", {
        body: { 
          policyText, 
          question,
          analysisType: "qa"
        }
      });

      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error("Error asking policy question:", error);
      return {
        answer: "Sorry, I encountered an error while processing your question.",
        confidence: "low",
        relevantSections: [],
        suggestions: ["Please try asking again or reformulate your question."],
        error: error.message
      };
    }
  }
}
