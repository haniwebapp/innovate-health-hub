
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";
import { PolicyData, Vision2030AlignmentResult } from "./types";
import { CallTrace } from "@/types/ai";

/**
 * Service for handling Vision 2030 alignment checks
 */
export class VisionAlignmentService {
  /**
   * Checks the alignment of a policy or innovation with Vision 2030 goals
   */
  static async checkVision2030Alignment(
    description: string,
    sector: string,
    context?: string
  ): Promise<Vision2030AlignmentResult> {
    try {
      const trace = AIServiceUtils.createTrace("vision2030-alignment", context || "policy-alignment");
      
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { policyData: { description, sector }, trace }
      });

      if (error) throw error;
      
      // Log the AI operation for analytics and improvement
      await AIServiceUtils.logAIOperation(
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
        overallScore: 0,
        alignmentAreas: [],
        gapAreas: [],
        recommendations: ["Unable to perform alignment check due to an error."],
        vision2030Impact: "Error performing alignment assessment.",
        overallAssessment: "Error performing alignment assessment.",
        error: error.message
      };
    }
  }

  /**
   * Analyzes a policy's alignment with Vision 2030
   */
  static async analyzeVision2030Alignment(
    policy: PolicyData
  ): Promise<Vision2030AlignmentResult> {
    return this.checkVision2030Alignment(
      policy.description,
      policy.sector,
      policy.name
    );
  }
}
