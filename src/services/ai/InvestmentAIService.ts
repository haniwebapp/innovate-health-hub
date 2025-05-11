
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

export interface Vision2030Alignment {
  alignmentScore: number;
  alignmentAreas: string[];
  vision2030Objectives: string[];
  improvementAreas: string[];
  potentialImpact: string;
  recommendations: string[];
  error?: string;
}

export interface MarketTrendParams {
  sector: string;
  timeframe?: string;
  region?: string;
}

export interface PitchDeckTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  slides: PitchDeckSlide[];
}

export interface PitchDeckSlide {
  id: string;
  title: string;
  description: string;
  type: 'title' | 'problem' | 'solution' | 'market' | 'business_model' | 
         'traction' | 'competition' | 'team' | 'financials' | 'ask' | 'contact';
  templateHtml: string;
  order: number;
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
   * Analyze how well an innovation aligns with Vision 2030 goals
   */
  static async analyzeVision2030Alignment(
    innovationData: InnovationData
  ): Promise<Vision2030Alignment> {
    try {
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { innovationData }
      });

      if (error) throw error;
      return data as Vision2030Alignment;
    } catch (error: any) {
      console.error("Error analyzing Vision 2030 alignment:", error);
      return {
        alignmentScore: 0,
        alignmentAreas: [],
        vision2030Objectives: [],
        improvementAreas: [],
        potentialImpact: "",
        recommendations: [],
        error: error.message || "Failed to analyze Vision 2030 alignment"
      };
    }
  }

  /**
   * Generate personalized pitch deck content based on innovation data
   */
  static async generatePitchDeckContent(
    innovationData: InnovationData,
    templateId: string
  ): Promise<Record<string, string>> {
    try {
      // This would call a pitch-deck-generation edge function in a full implementation
      // For now, we'll return mock data
      
      // In a real implementation, this would call the edge function:
      /*
      const { data, error } = await supabase.functions.invoke("pitch-deck-generation", {
        body: { innovationData, templateId }
      });
      
      if (error) throw error;
      return data as Record<string, string>;
      */
      
      // Mock response for now
      return {
        title: `${innovationData.name} - Investor Pitch`,
        tagline: "Transforming Healthcare Through Innovation",
        problem: `The healthcare sector faces significant challenges in ${innovationData.sector}, including...`,
        solution: `${innovationData.name} addresses these challenges by providing...`,
        market: `The total addressable market for ${innovationData.sector} solutions is estimated at...`,
        businessModel: "Our revenue model consists of...",
        traction: innovationData.traction || "We are currently in early discussions with potential customers...",
        competition: "The competitive landscape includes...",
        team: "Our experienced team brings together expertise in healthcare, technology, and business...",
        financials: "Projected revenue growth of 25% year-over-year...",
        ask: `We are seeking ${innovationData.fundingNeeded ? `$${innovationData.fundingNeeded.toLocaleString()}` : "investment"} to scale our operations and accelerate market penetration...`,
        contactInfo: "For more information, please contact us at..."
      };
    } catch (error: any) {
      console.error("Error generating pitch deck content:", error);
      return {
        error: error.message || "Failed to generate pitch deck content"
      };
    }
  }

  /**
   * Get available pitch deck templates
   */
  static async getPitchDeckTemplates(): Promise<PitchDeckTemplate[]> {
    try {
      // In a full implementation, this would fetch templates from the database
      // For now, returning mock data
      
      return [
        {
          id: "template-healthcare-standard",
          name: "Healthcare Standard",
          description: "A comprehensive template for healthcare innovations focused on clinical impact",
          thumbnailUrl: "/assets/pitch-templates/healthcare-standard.jpg",
          slides: [] // Would contain slide definitions in full implementation
        },
        {
          id: "template-medtech",
          name: "MedTech Investor",
          description: "Specialized for medical device and technology innovations",
          thumbnailUrl: "/assets/pitch-templates/medtech.jpg",
          slides: []
        },
        {
          id: "template-digital-health",
          name: "Digital Health",
          description: "Optimized for digital health solutions and mobile health applications",
          thumbnailUrl: "/assets/pitch-templates/digital-health.jpg",
          slides: []
        }
      ];
    } catch (error: any) {
      console.error("Error fetching pitch deck templates:", error);
      return [];
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
