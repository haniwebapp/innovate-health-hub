
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "./AIService";

export interface PolicyData {
  name: string;
  description: string;
  sector: string;
  stakeholders?: string[];
  goals?: string[];
  metrics?: string[];
  timeline?: {
    start?: string;
    end?: string;
  };
  [key: string]: any;
}

export interface Vision2030AlignmentResult {
  overallScore: number;
  alignmentDetails: {
    pillar: string;
    score: number;
    relevance: string;
    opportunities: string[];
  }[];
  recommendations: string[];
  error?: string;
}

export interface PolicyImpactResult {
  impactScore: number;
  stakeholderImpact: Record<string, {
    score: number;
    description: string;
  }>;
  economicImpact: string;
  healthcareOutcomeImpact: string;
  implementationComplexity: string;
  recommendations: string[];
  error?: string;
}

export interface StrategyGapAnalysis {
  identifiedGaps: {
    area: string;
    description: string;
    severity: string;
    potentialSolutions: string[];
  }[];
  strengthAreas: string[];
  recommendedFocus: string[];
  error?: string;
}

export class PolicyAIService {
  /**
   * Analyze alignment with Saudi Vision 2030
   */
  static async analyzeVision2030Alignment(data: PolicyData): Promise<Vision2030AlignmentResult> {
    try {
      const { data: result, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { policyData: data }
      });

      if (error) throw error;
      return result as Vision2030AlignmentResult;
    } catch (error: any) {
      throw AIService.handleError(error, "analyzeVision2030Alignment", "policy");
    }
  }

  /**
   * Simulate policy impact across multiple domains
   */
  static async simulatePolicyImpact(
    policyData: PolicyData, 
    simulationParams?: { timeframe?: string, region?: string }
  ): Promise<PolicyImpactResult> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-impact-simulation", {
        body: { 
          policyData,
          simulationParams: simulationParams || { timeframe: "5 years", region: "Saudi Arabia" }
        }
      });

      if (error) throw error;
      return data as PolicyImpactResult;
    } catch (error: any) {
      throw AIService.handleError(error, "simulatePolicyImpact", "policy");
    }
  }

  /**
   * Analyze healthcare strategy gaps
   */
  static async analyzeStrategyGaps(
    currentStrategy: PolicyData,
    benchmarks?: { global?: boolean, regional?: boolean }
  ): Promise<StrategyGapAnalysis> {
    try {
      const { data, error } = await supabase.functions.invoke("strategy-gap-analysis", {
        body: { 
          currentStrategy,
          benchmarks: benchmarks || { global: true, regional: true }
        }
      });

      if (error) throw error;
      return data as StrategyGapAnalysis;
    } catch (error: any) {
      throw AIService.handleError(error, "analyzeStrategyGaps", "policy");
    }
  }

  /**
   * Generate KPIs for healthcare policy
   */
  static async generatePolicyKPIs(
    policyData: PolicyData
  ): Promise<{
    kpis: {
      name: string;
      description: string;
      measurementMethod: string;
      targetValue: string;
      timeframe: string;
    }[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("policy-kpi-generation", {
        body: { policyData }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "generatePolicyKPIs", "policy");
    }
  }

  /**
   * Create a draft implementation roadmap for a policy
   */
  static async createImplementationRoadmap(
    policyData: PolicyData
  ): Promise<{
    phases: {
      name: string;
      timeline: string;
      goals: string[];
      activities: string[];
      resources: string[];
      risks: string[];
    }[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("implementation-roadmap", {
        body: { policyData }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw AIService.handleError(error, "createImplementationRoadmap", "policy");
    }
  }
}
