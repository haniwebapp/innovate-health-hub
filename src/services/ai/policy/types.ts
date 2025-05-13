
export interface StrategyGapInput {
  policyDetails: {
    title: string;
    description: string;
    objectives: string[];
    targetSectors?: string[];
  };
  currentState?: string;
  desiredState?: string;
}

export interface StrategyGapResult {
  gaps: {
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
    potentialImpact: string;
  }[];
  recommendations: string[];
  overallAnalysis: string;
}

export interface Vision2030AlignmentInput {
  name: string;
  description: string;
  goals?: string;
  targetAudience?: string;
  sector?: string;
}

export interface Vision2030AlignmentResult {
  alignmentScore: number;
  alignmentAreas: string[];
  vision2030Objectives: string[];
  improvementAreas: string[];
  potentialImpact: string;
  recommendations: string[];
}

export interface RegulatoryChecklistInput {
  innovationType: string;
  description: string;
  sector?: string;
}

export interface RegulatoryChecklistItem {
  id: string;
  title: string;
  description: string;
  type: "document" | "test" | "approval" | "certification";
  priority: "high" | "medium" | "low";
  regulatoryBody: string;
  timelineEstimate: string;
}

export interface RegulatoryChecklistResult {
  checklist: RegulatoryChecklistItem[];
  regulatoryPathway: {
    name: string;
    description: string;
    steps: string[];
    estimatedTimeline: string;
  };
  keyConsiderations: string[];
  recommendedExperts: string[];
}

export interface InnovationGuideInput {
  innovationStage: string;
  innovationType: string;
  challenges?: string;
  goals?: string;
}

export interface InnovationGuideResult {
  nextSteps: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    resources: string[];
  }[];
  commonPitfalls: {
    title: string;
    description: string;
    avoidanceStrategy: string;
  }[];
  marketInsights: {
    opportunities: string[];
    challenges: string[];
    keyPlayerTypes: string[];
  };
  resourceRecommendations: {
    expertTypes: string[];
    tools: string[];
    knowledgeAreas: string[];
  };
  timelineEstimate: {
    nextMilestone: string;
    estimatedTimeframe: string;
  };
}
