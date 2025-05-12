
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface AdminInsight {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  actionItems: string[];
}

export interface AnomalyDetection {
  anomalyType: string;
  description: string;
  severity: "critical" | "warning" | "info";
  detectedAt: Date;
  relatedEntities: string[];
  potentialCauses: string[];
  recommendedActions: string[];
}

export interface PerformanceMetrics {
  category: string;
  current: number;
  previous: number;
  trend: "up" | "down" | "stable";
  percentChange: number;
}

/**
 * AI Service for Admin capabilities
 */
export class AdminAIService {
  /**
   * Generate admin-focused insights from platform data
   */
  static async generateAdminInsights(
    dataSource: string,
    timeframe: string = "7days"
  ): Promise<AdminInsight[]> {
    try {
      const { data, error } = await supabase.functions.invoke("admin-analytics", {
        body: { 
          dataSource,
          timeframe,
          operation: "insights"
        }
      });

      if (error) throw error;
      return data as AdminInsight[];
    } catch (error: any) {
      console.error("Error generating admin insights:", error);
      throw AIService.handleError(error, "generateAdminInsights", "admin");
    }
  }

  /**
   * Detect anomalies in system data
   */
  static async detectAnomalies(
    systems: string[] = ["all"],
    sensitivity: number = 0.8
  ): Promise<AnomalyDetection[]> {
    try {
      const { data, error } = await supabase.functions.invoke("admin-analytics", {
        body: { 
          systems,
          sensitivity,
          operation: "anomalies"
        }
      });

      if (error) throw error;
      return data as AnomalyDetection[];
    } catch (error: any) {
      console.error("Error detecting anomalies:", error);
      throw AIService.handleError(error, "detectAnomalies", "admin");
    }
  }

  /**
   * Generate performance metrics for the admin dashboard
   */
  static async getPerformanceMetrics(
    categories: string[] = ["users", "content", "engagement", "processing"],
    timeframe: string = "30days"
  ): Promise<PerformanceMetrics[]> {
    try {
      const { data, error } = await supabase.functions.invoke("admin-analytics", {
        body: { 
          categories,
          timeframe,
          operation: "metrics"
        }
      });

      if (error) throw error;
      return data as PerformanceMetrics[];
    } catch (error: any) {
      console.error("Error getting performance metrics:", error);
      throw AIService.handleError(error, "getPerformanceMetrics", "admin");
    }
  }

  /**
   * Generate recommendations for system improvements
   */
  static async getSystemRecommendations(): Promise<{
    recommendations: string[];
    priority: "high" | "medium" | "low";
    impact: string;
    effort: string;
  }[]> {
    try {
      const { data, error } = await supabase.functions.invoke("admin-analytics", {
        body: { operation: "recommendations" }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error getting system recommendations:", error);
      throw AIService.handleError(error, "getSystemRecommendations", "admin");
    }
  }

  /**
   * Analyze admin logs for patterns and insights
   */
  static async analyzeAdminLogs(
    timeframe: string = "7days", 
    logTypes: string[] = ["error", "warning", "info"]
  ): Promise<{
    patterns: { description: string; frequency: number; severity: string }[];
    totalErrors: number;
    criticalIssues: number;
    recommendations: string[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("admin-analytics", {
        body: { 
          timeframe,
          logTypes,
          operation: "logAnalysis"
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error analyzing admin logs:", error);
      throw AIService.handleError(error, "analyzeAdminLogs", "admin");
    }
  }
}
