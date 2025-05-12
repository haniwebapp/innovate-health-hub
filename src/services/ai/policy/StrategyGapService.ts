
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";
import { BenchmarkData, StrategyGapAnalysisResult, StrategyMetric } from "./types";

/**
 * Service for analyzing strategy gaps against benchmarks
 */
export class StrategyGapService {
  /**
   * Fetches available benchmark datasets
   */
  static async getAvailableBenchmarks(): Promise<BenchmarkData[]> {
    // In a real implementation, this would fetch from the database or an API
    // For now, we'll return mock data
    return [
      {
        id: "who-2023",
        name: "WHO Healthcare Standards 2023",
        source: "World Health Organization",
        scope: "global",
        metrics: [
          { id: "digital-adoption", name: "Digital Health Adoption", category: "Digital Transformation", value: 75, unit: "%" },
          { id: "preventive-care", name: "Preventive Care Coverage", category: "Prevention", value: 80, unit: "%" },
          { id: "accessibility", name: "Healthcare Accessibility", category: "Access", value: 85, unit: "%" },
          { id: "quality-care", name: "Quality of Care", category: "Quality", value: 82, unit: "%" },
          { id: "workforce", name: "Healthcare Workforce Density", category: "Workforce", value: 76, unit: "per 10,000" }
        ]
      },
      {
        id: "gcc-2023",
        name: "GCC Healthcare Benchmark 2023",
        source: "Gulf Cooperation Council",
        scope: "regional",
        metrics: [
          { id: "digital-adoption", name: "Digital Health Adoption", category: "Digital Transformation", value: 70, unit: "%" },
          { id: "preventive-care", name: "Preventive Care Coverage", category: "Prevention", value: 73, unit: "%" },
          { id: "accessibility", name: "Healthcare Accessibility", category: "Access", value: 79, unit: "%" },
          { id: "quality-care", name: "Quality of Care", category: "Quality", value: 77, unit: "%" },
          { id: "workforce", name: "Healthcare Workforce Density", category: "Workforce", value: 65, unit: "per 10,000" }
        ]
      },
      {
        id: "best-practice-2023",
        name: "Healthcare Best Practices 2023",
        source: "International Health Policy Center",
        scope: "global",
        metrics: [
          { id: "digital-adoption", name: "Digital Health Adoption", category: "Digital Transformation", value: 85, unit: "%" },
          { id: "preventive-care", name: "Preventive Care Coverage", category: "Prevention", value: 87, unit: "%" },
          { id: "accessibility", name: "Healthcare Accessibility", category: "Access", value: 90, unit: "%" },
          { id: "quality-care", name: "Quality of Care", category: "Quality", value: 88, unit: "%" },
          { id: "workforce", name: "Healthcare Workforce Density", category: "Workforce", value: 82, unit: "per 10,000" }
        ]
      }
    ];
  }

  /**
   * Gets current strategy metrics
   */
  static async getCurrentStrategyMetrics(): Promise<StrategyMetric[]> {
    // In a real implementation, this would fetch from the database
    // For now, we'll return mock data
    return [
      { id: "digital-adoption", name: "Digital Health Adoption", category: "Digital Transformation", currentValue: 58, targetValue: 80, unit: "%" },
      { id: "preventive-care", name: "Preventive Care Coverage", category: "Prevention", currentValue: 65, targetValue: 85, unit: "%" },
      { id: "accessibility", name: "Healthcare Accessibility", category: "Access", currentValue: 72, targetValue: 90, unit: "%" },
      { id: "quality-care", name: "Quality of Care", category: "Quality", currentValue: 70, targetValue: 85, unit: "%" },
      { id: "workforce", name: "Healthcare Workforce Density", category: "Workforce", currentValue: 55, targetValue: 75, unit: "per 10,000" }
    ];
  }

  /**
   * Analyzes gaps between current strategy and benchmarks
   */
  static async analyzeStrategyGaps(
    currentMetrics: StrategyMetric[],
    benchmarkId: string
  ): Promise<StrategyGapAnalysisResult> {
    try {
      const trace = AIService.createTrace("strategy-gap-analysis", "gap-analysis");
      
      // In a real implementation, we would call an edge function
      // For the POC, we'll simulate the analysis with logic here
      
      const benchmarks = await this.getAvailableBenchmarks();
      const selectedBenchmark = benchmarks.find(b => b.id === benchmarkId);
      
      if (!selectedBenchmark) {
        throw new Error(`Benchmark with ID ${benchmarkId} not found`);
      }
      
      // Calculate gaps for each metric
      const gaps = currentMetrics.map(metric => {
        const benchmarkMetric = selectedBenchmark.metrics.find(bm => bm.id === metric.id);
        if (!benchmarkMetric) return null;
        
        const gap = benchmarkMetric.value - metric.currentValue;
        const gapPercentage = (gap / benchmarkMetric.value) * 100;
        
        let priority: "critical" | "high" | "medium" | "low" = "medium";
        if (gapPercentage > 30) priority = "critical";
        else if (gapPercentage > 20) priority = "high";
        else if (gapPercentage < 10) priority = "low";
        
        return {
          metricId: metric.id,
          metricName: metric.name,
          category: metric.category,
          currentValue: metric.currentValue,
          benchmarkValue: benchmarkMetric.value,
          gap,
          gapPercentage,
          priority
        };
      }).filter(Boolean) as StrategyGapAnalysisResult["gaps"];
      
      // Calculate category scores
      const categories = [...new Set(currentMetrics.map(m => m.category))];
      const categoryScores = categories.map(category => {
        const categoryGaps = gaps.filter(g => g.category === category);
        const categoryScore = 100 - (categoryGaps.reduce((acc, g) => acc + g.gapPercentage, 0) / categoryGaps.length);
        
        return {
          category,
          score: Math.round(categoryScore),
          benchmarkComparison: Math.round(categoryScore)
        };
      });
      
      // Calculate overall score
      const overallScore = Math.round(categoryScores.reduce((acc, cs) => acc + cs.score, 0) / categoryScores.length);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(gaps, categoryScores);
      
      return {
        overallScore,
        categoryScores,
        gaps,
        recommendations,
        benchmarkSource: selectedBenchmark.name
      };
      
    } catch (error: any) {
      console.error("Error analyzing strategy gaps:", error);
      return {
        overallScore: 0,
        categoryScores: [],
        gaps: [],
        recommendations: [],
        benchmarkSource: "",
        error: error.message
      };
    }
  }

  /**
   * Generate recommendations based on gap analysis
   * @private
   */
  private static generateRecommendations(
    gaps: StrategyGapAnalysisResult["gaps"],
    categoryScores: StrategyGapAnalysisResult["categoryScores"]
  ): StrategyGapAnalysisResult["recommendations"] {
    const recommendations: StrategyGapAnalysisResult["recommendations"] = [];
    
    // Sort categories by lowest score
    const sortedCategories = [...categoryScores].sort((a, b) => a.score - b.score);
    
    // Generate recommendations for the lowest scoring categories
    sortedCategories.slice(0, 3).forEach(category => {
      const categoryGaps = gaps.filter(g => g.category === category.category);
      
      if (category.score < 70) {
        recommendations.push({
          category: category.category,
          description: `Develop a comprehensive improvement plan for ${category.category} with specific targets and milestones.`,
          expectedImpact: "Significant improvements in overall healthcare outcomes and alignment with global standards.",
          timeframe: "medium"
        });
      }
      
      // Add recommendations for critical gaps
      const criticalGaps = categoryGaps.filter(g => g.priority === "critical");
      if (criticalGaps.length > 0) {
        recommendations.push({
          category: category.category,
          description: `Address critical gaps in ${criticalGaps.map(g => g.metricName).join(", ")}.`,
          expectedImpact: "Rapid improvement in key healthcare indicators and better patient outcomes.",
          timeframe: "short"
        });
      }
    });
    
    // Add general recommendations
    if (recommendations.length < 3) {
      recommendations.push({
        category: "General",
        description: "Establish a continuous monitoring system for healthcare strategy metrics with quarterly reviews.",
        expectedImpact: "More agile response to changing healthcare needs and improved strategic alignment.",
        timeframe: "medium"
      });
    }
    
    return recommendations;
  }
}
