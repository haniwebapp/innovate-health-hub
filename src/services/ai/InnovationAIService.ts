
import { supabase } from "@/integrations/supabase/client";

export interface InnovationData {
  name: string;
  description: string;
  sector: string;
  type: string;
  stage: string;
  features?: string[];
  targetUsers?: string[];
  problemSolved?: string;
  [key: string]: any;
}

export interface InnovationInsights {
  summary: string;
  innovationScore: number;
  disruptionPotential: string;
  marketOpportunities: {
    opportunity: string;
    relevance: string;
    potentialImpact: string;
  }[];
  competitiveLandscape: {
    directCompetitors: string[];
    indirectCompetitors: string[];
    uniqueSellingPoints: string[];
  };
  technicalRecommendations: string[];
  implementationChallenges: string[];
  scalingPathway: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
  collaborationOpportunities: string[];
  fundingConsiderations: string;
  vision2030Impact: string;
  error?: string;
}

export class InnovationAIService {
  /**
   * Generate AI-powered insights for an innovation
   */
  static async generateInnovationInsights(innovationData: InnovationData): Promise<InnovationInsights> {
    try {
      const { data, error } = await supabase.functions.invoke("innovation-insights", {
        body: { innovationData }
      });

      if (error) throw error;
      return data as InnovationInsights;
    } catch (error: any) {
      console.error("Error generating innovation insights:", error);
      return {
        summary: "",
        innovationScore: 0,
        disruptionPotential: "Unknown",
        marketOpportunities: [],
        competitiveLandscape: {
          directCompetitors: [],
          indirectCompetitors: [],
          uniqueSellingPoints: []
        },
        technicalRecommendations: [],
        implementationChallenges: [],
        scalingPathway: {
          phase1: "",
          phase2: "",
          phase3: ""
        },
        collaborationOpportunities: [],
        fundingConsiderations: "",
        vision2030Impact: "",
        error: error.message || "Failed to generate innovation insights"
      };
    }
  }

  /**
   * Generate recommendations for potential collaborators
   */
  static async generateCollaborationRecommendations(innovationData: InnovationData): Promise<string[]> {
    try {
      const insights = await this.generateInnovationInsights(innovationData);
      return insights.collaborationOpportunities || [];
    } catch (error: any) {
      console.error("Error generating collaboration recommendations:", error);
      return [];
    }
  }

  /**
   * Generate funding strategy recommendations
   */
  static async generateFundingRecommendations(innovationData: InnovationData): Promise<string> {
    try {
      const insights = await this.generateInnovationInsights(innovationData);
      return insights.fundingConsiderations || "No funding recommendations available.";
    } catch (error: any) {
      console.error("Error generating funding recommendations:", error);
      return "Error generating funding recommendations.";
    }
  }

  /**
   * Assess Vision 2030 alignment
   */
  static async assessVision2030Alignment(innovationData: InnovationData): Promise<string> {
    try {
      const insights = await this.generateInnovationInsights(innovationData);
      return insights.vision2030Impact || "No Vision 2030 alignment assessment available.";
    } catch (error: any) {
      console.error("Error assessing Vision 2030 alignment:", error);
      return "Error assessing Vision 2030 alignment.";
    }
  }
}
