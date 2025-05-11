
/**
 * Common types for policy and strategy AI services
 */

/**
 * Interface for policy data
 */
export interface PolicyData {
  name: string;
  description: string;
  sector: string;
  goals?: string[];
  stakeholders?: string[];
}

/**
 * Interface for Vision 2030 alignment check results
 */
export interface Vision2030AlignmentResult {
  overallScore: number;
  alignmentAreas: {
    pillar: string;
    score: number;
    relevance: string;
    opportunities: string[];
  }[];
  recommendations: string[];
  overallAssessment: string;
  error?: string;
}

/**
 * Interface for policy impact simulation results
 */
export interface PolicyImpactResult {
  impactScore: number;
  stakeholderImpact: {
    [key: string]: {
      score: number;
      description: string;
    };
  };
  economicImpact: string;
  healthcareOutcomeImpact: string;
  implementationComplexity: string;
  recommendations: string[];
  error?: string;
}

/**
 * Interface for policy impact simulation results (legacy)
 */
export interface PolicyImpactSimulation {
  sectors: {
    sector: string;
    impact: "positive" | "neutral" | "negative";
    magnitude: number;
    description: string;
  }[];
  timelineImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  stakeholders: {
    group: string;
    impact: string;
  }[];
  risks: string[];
  opportunities: string[];
  overallAssessment: string;
  error?: string;
}
