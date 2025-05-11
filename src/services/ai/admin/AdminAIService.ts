
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface LogAnalysisResult {
  anomalies: {
    timestamp: string;
    description: string;
    severity: "low" | "medium" | "high";
    suggestedAction: string;
  }[];
  patterns: {
    description: string;
    frequency: number;
    examples: string[];
  }[];
  summary: string;
}

export interface EcosystemSentiment {
  overallSentiment: number;
  trendDirection: "improving" | "stable" | "declining";
  topicSentiments: Record<string, number>;
  influentialFactors: string[];
  recommendations: string[];
}

export interface UserBehaviorPrediction {
  churnRisk: {
    score: number;
    factors: string[];
  };
  engagementOpportunities: string[];
  recommendedInterventions: string[];
}

/**
 * Service for handling admin-related AI operations
 */
export class AdminAIService {
  /**
   * Analyze AI system logs for anomalies and patterns
   */
  static async analyzeSystemLogs(
    logData: any[],
    timeRange?: { start: string; end: string }
  ): Promise<LogAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("log-analyzer", {
        body: { 
          logData,
          timeRange
        }
      });

      if (error) throw error;
      return data as LogAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing system logs:", error);
      throw AIService.handleError(error, "analyzeSystemLogs", "admin");
    }
  }

  /**
   * Analyze ecosystem sentiment from user interactions and feedback
   */
  static async analyzeEcosystemSentiment(
    timeRange: { start: string; end: string }
  ): Promise<EcosystemSentiment> {
    try {
      const { data, error } = await supabase.functions.invoke("ecosystem-sentiment-analyzer", {
        body: { timeRange }
      });

      if (error) throw error;
      return data as EcosystemSentiment;
    } catch (error: any) {
      console.error("Error analyzing ecosystem sentiment:", error);
      throw AIService.handleError(error, "analyzeEcosystemSentiment", "admin");
    }
  }

  /**
   * Predict user drop-off and churn
   */
  static async predictUserBehavior(
    userId: string,
    activityHistory: any[]
  ): Promise<UserBehaviorPrediction> {
    try {
      const { data, error } = await supabase.functions.invoke("user-behavior-predictor", {
        body: { 
          userId,
          activityHistory
        }
      });

      if (error) throw error;
      return data as UserBehaviorPrediction;
    } catch (error: any) {
      console.error("Error predicting user behavior:", error);
      throw AIService.handleError(error, "predictUserBehavior", "admin");
    }
  }

  /**
   * Generate a report comparing the platform against global benchmarks
   */
  static async generateBenchmarkReport(
    metrics: any[],
    benchmarkCategories: string[]
  ): Promise<{
    summary: string;
    benchmarkComparisons: Record<string, {
      platformScore: number;
      benchmarkScore: number;
      percentDifference: number;
      recommendations: string[];
    }>;
    overallAssessment: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("benchmark-report-generator", {
        body: { 
          metrics,
          benchmarkCategories
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error generating benchmark report:", error);
      throw AIService.handleError(error, "generateBenchmarkReport", "admin");
    }
  }
}
