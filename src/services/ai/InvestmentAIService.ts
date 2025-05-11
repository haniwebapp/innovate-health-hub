
import { supabase } from "@/integrations/supabase/client";
import { AIResponse } from "@/utils/aiUtils";

export interface InnovationData {
  name: string;
  description: string;
  stage: string;
  sector: string;
  fundingNeeded?: number;
  teamSize?: number;
  revenue?: number;
  traction?: string;
  patentStatus?: string;
  regulatoryStatus?: string;
  [key: string]: any;
}

export interface InvestorCriteria {
  investmentFocus?: string[];
  investmentStage?: string[];
  geographicFocus?: string[];
  investmentSizeMin?: number;
  investmentSizeMax?: number;
  [key: string]: any;
}

export interface MatchResult {
  matchScore: number;
  mainReasons: string[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendedApproach: string;
  keyMetrics: string[];
  alignmentAreas: string[];
  error?: string;
}

export interface MarketAnalysis {
  summary: string;
  growthRate: number;
  marketSize: string;
  keyTrends: string[];
  emergingOpportunities: string[];
  riskFactors: string[];
  competitiveLandscape: {
    keyPlayers: string[];
    marketShare: Record<string, number>;
    barriers: string[];
  };
  regulatoryImpact: string;
  vision2030Alignment: string;
  investmentRecommendations: string[];
  error?: string;
}

export interface MarketTrendParams {
  sector: string;
  timeframe?: string;
  region?: string;
}

export class InvestmentAIService {
  /**
   * Generate an AI-powered investment match analysis
   */
  static async generateMatchAnalysis(
    innovationData: InnovationData, 
    investorCriteria?: InvestorCriteria
  ): Promise<MatchResult> {
    try {
      const { data, error } = await supabase.functions.invoke("investment-match", {
        body: { innovationData, investorCriteria }
      });

      if (error) throw error;
      return data as MatchResult;
    } catch (error: any) {
      console.error("Error generating investment match analysis:", error);
      return {
        matchScore: 0,
        mainReasons: [],
        swotAnalysis: {
          strengths: [],
          weaknesses: [],
          opportunities: [],
          threats: []
        },
        recommendedApproach: "",
        keyMetrics: [],
        alignmentAreas: [],
        error: error.message || "Failed to generate investment match analysis"
      };
    }
  }

  /**
   * Generate market trend analysis for investment decisions
   */
  static async generateMarketAnalysis(params: MarketTrendParams): Promise<MarketAnalysis> {
    try {
      const { data, error } = await supabase.functions.invoke("market-analysis", {
        body: params
      });

      if (error) throw error;
      return data as MarketAnalysis;
    } catch (error: any) {
      console.error("Error generating market analysis:", error);
      return {
        summary: "",
        growthRate: 0,
        marketSize: "",
        keyTrends: [],
        emergingOpportunities: [],
        riskFactors: [],
        competitiveLandscape: {
          keyPlayers: [],
          marketShare: {},
          barriers: []
        },
        regulatoryImpact: "",
        vision2030Alignment: "",
        investmentRecommendations: [],
        error: error.message || "Failed to generate market analysis"
      };
    }
  }

  /**
   * Save match analysis results to the database
   */
  static async saveMatchAnalysis(
    innovationId: string,
    investorId: string,
    matchResult: MatchResult
  ): Promise<void> {
    try {
      const { error } = await supabase.from('ai_match_scores').upsert({
        innovation_id: innovationId,
        investor_id: investorId,
        match_score: matchResult.matchScore,
        match_reasons: {
          mainReasons: matchResult.mainReasons,
          swotAnalysis: matchResult.swotAnalysis,
          recommendedApproach: matchResult.recommendedApproach,
          keyMetrics: matchResult.keyMetrics,
          alignmentAreas: matchResult.alignmentAreas
        },
        analyzed_at: new Date().toISOString()
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error saving match analysis:", error);
      throw error;
    }
  }
}
