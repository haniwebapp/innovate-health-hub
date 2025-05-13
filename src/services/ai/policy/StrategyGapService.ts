
import { supabase } from "@/integrations/supabase/client";
import { AIServiceUtils } from "../AIService";
import { PolicyData, StrategyGapResult } from "./types";

/**
 * Interface representing a strategy gap analysis request
 */
export interface StrategyGapAnalysisRequest {
  policyData: PolicyData;
  benchmarkIds?: string[];
}

/**
 * Interface representing a time period for analysis
 */
export interface TimePeriodAnalysis {
  period: string;
  coverage: number;
  gaps: string[];
  opportunities: string[];
}

/**
 * Interface representing a strategy coverage metric
 */
export interface StrategyCoverageMetric {
  category: string;
  currentCoverage: number;
  benchmarkCoverage: number;
  gap: number;
  impact: 'low' | 'medium' | 'high';
}

/**
 * Service for strategy gap analysis and recommendations
 */
export class StrategyGapService {
  /**
   * Analyzes gaps between current healthcare policy/strategy and benchmark strategies
   */
  static async analyzeStrategyGaps(
    policyData: PolicyData,
    benchmarkIds?: string[]
  ): Promise<StrategyGapResult> {
    try {
      // Call the edge function for strategy gap analysis
      const { data, error } = await supabase.functions.invoke("strategy-gap-analysis", {
        body: { policyData, benchmarkIds } 
      });
      
      if (error) throw error;
      return data as StrategyGapResult;
    } catch (error: any) {
      console.error("Error analyzing strategy gaps:", error);
      return this.getFallbackStrategyGapResult(error.message);
    }
  }

  /**
   * Generate a strategy gap report based on analysis
   */
  static async generateStrategyGapReport(
    policyData: PolicyData,
    format: 'executive' | 'comprehensive' | 'technical' = 'comprehensive'
  ): Promise<string> {
    try {
      // First get the analysis
      const analysis = await this.analyzeStrategyGaps(policyData);
      
      // Then generate report from analysis
      const { data, error } = await supabase.functions.invoke("strategy-report-generator", {
        body: { 
          policyData,
          analysis,
          format
        }
      });
      
      if (error) throw error;
      return data.report;
    } catch (error: any) {
      console.error("Error generating strategy report:", error);
      return `Unable to generate strategy gap report due to an error: ${error.message}`;
    }
  }
  
  /**
   * Get recommendations for addressing strategy gaps
   */
  static async getGapRecommendations(
    gapAnalysis: StrategyGapResult
  ): Promise<string[]> {
    try {
      const trace = AIServiceUtils.createTrace("strategy-gap-recommendations", "strategy-analysis");
      
      const { data, error } = await supabase.functions.invoke("strategy-recommendations", {
        body: { 
          gapAnalysis,
          trace
        }
      });
      
      if (error) throw error;
      
      // Log the AI operation
      await AIServiceUtils.logAIOperation(
        "strategy-gap-recommendations",
        "strategy-analysis",
        { gapAnalysis },
        data,
        undefined
      );
      
      return data.recommendations;
    } catch (error: any) {
      console.error("Error getting gap recommendations:", error);
      return [
        "Review your current strategy against industry benchmarks",
        "Consider incorporating emerging healthcare technologies",
        "Address identified policy implementation gaps",
        "Error occurred during detailed recommendation generation"
      ];
    }
  }
  
  /**
   * Returns a fallback strategy gap result when the analysis fails
   */
  private static getFallbackStrategyGapResult(errorMessage: string): StrategyGapResult {
    return {
      overallGapScore: 50,
      coverageMetrics: [
        { 
          category: "Error", 
          currentCoverage: 0, 
          benchmarkCoverage: 100, 
          gap: 100, 
          impact: "high" 
        }
      ],
      topGapAreas: ["Unable to analyze gap areas due to an error"],
      timePeriodAnalysis: [{
        period: "Error",
        coverage: 0,
        gaps: ["Analysis failed"],
        opportunities: []
      }],
      recommendations: ["Unable to generate recommendations due to an error"],
      benchmarkComparison: {},
      error: errorMessage
    };
  }
}
