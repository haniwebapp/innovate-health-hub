
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";

export interface SuccessPredictionParams {
  title: string;
  description: string;
  sector: string;
  technology: string[];
  targetUsers: string[];
  implementationTimeframe: string;
}

export interface SuccessPredictionResult {
  overallScore: number;
  factors: {
    name: string;
    score: number;
    analysis: string;
  }[];
  recommendations: string[];
  risks: {
    name: string;
    likelihood: number;
    impact: number;
    mitigation: string;
  }[];
  similarInnovationsAnalysis: {
    count: number;
    averageSuccessRate: number;
    keyDifferentiators: string[];
  };
}

export interface MarketFitAnalysisResult {
  marketFitScore: number;
  targetMarketAnalysis: string;
  competitivePositioning: string;
  adoptionBarriers: string[];
  suggestedModifications: string[];
  suggestedPartners: string[];
}

export class InnovationPredictiveService {
  /**
   * Predict success likelihood of an innovation
   */
  static async predictSuccessProbability(
    params: SuccessPredictionParams
  ): Promise<SuccessPredictionResult> {
    try {
      const { data, error } = await supabase.functions.invoke("innovation-success-predictor", {
        body: params
      });

      if (error) throw error;
      return data as SuccessPredictionResult;
    } catch (error: any) {
      console.error("Error predicting innovation success:", error);
      throw AIServiceUtils.handleError(error, "predictSuccessProbability", "innovation");
    }
  }

  /**
   * Analyze market fit for an innovation
   */
  static async analyzeMarketFit(
    innovationId: string,
    additionalContext?: string
  ): Promise<MarketFitAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("innovation-market-fit", {
        body: { 
          innovationId,
          additionalContext
        }
      });

      if (error) throw error;
      return data as MarketFitAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing market fit:", error);
      throw AIServiceUtils.handleError(error, "analyzeMarketFit", "innovation");
    }
  }

  /**
   * Identify critical success factors for innovation by sector
   */
  static async getSuccessFactorsBySector(
    sector: string
  ): Promise<{
    factors: { name: string; importance: number; description: string }[];
    trends: { name: string; direction: 'increasing' | 'decreasing' | 'stable'; description: string }[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("success-factors-by-sector", {
        body: { sector }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error getting success factors:", error);
      throw AIServiceUtils.handleError(error, "getSuccessFactorsBySector", "innovation");
    }
  }
}
