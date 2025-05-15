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
  sector: string;
}

export interface Vision2030AlignmentResult {
  score: number;
  alignmentScore?: number;
  overallScore?: number;
  alignmentAreas: string[];
  gapAreas: string[];
  vision2030Objectives?: string[];
  recommendations: string[];
  vision2030Impact: string;
  potentialImpact?: string;
  improvementAreas?: string[];
  overallAssessment?: string;
  error?: string;
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

// Additional types needed for the policy components
export interface PolicyData {
  name?: string;
  description: string;
  sector: string;
  goals?: string;
  stakeholders?: string[]; // Added stakeholders property
}

export interface PolicyImpactResult {
  impactScore: number;
  overallScore?: number;
  stakeholderImpact: Record<string, any>;
  economicImpact: {
    score: number;
    description: string;
  };
  socialImpact: {
    score: number;
    description: string;
  };
  healthcareImpact: {
    score: number;
    description: string;
  };
  healthcareOutcomeImpact: string;
  implementationComplexity: string;
  recommendations: string[];
  timeframeImpact?: {
    short: string[];
    medium: string[];
    long: string[];
  };
  error?: string;
}

export interface PolicyImpactSimulation {
  impactScore: number;
  stakeholderImpact: Record<string, { score: number, description: string }>;
  economicImpact: string;
  healthcareOutcomeImpact: string;
  implementationComplexity: string;
  recommendations: string[];
  sectors: string[];
  timelineImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  stakeholders: string[];
  risks: string[];
  opportunities: string[];
  overallAssessment: string;
  error?: string;
}

export interface PolicyAnnotationResult {
  annotations: Array<{
    text: string;
    insight: string;
    type: "key_concept" | "policy_requirement" | "guideline" | "implementation_detail";
  }>;
  overallAnalysis: string;
  keyTakeaways: string[];
  error?: string;
}

export interface PolicyQAResult {
  answer: string;
  confidence: "high" | "medium" | "low";
  relevantSections: string[];
  suggestions: string[];
  error?: string;
}

export interface ImplementationGuidanceResult {
  steps: Array<{
    title: string;
    description: string;
    stakeholders: string[];
    timeline: string;
    resources: string[];
  }>;
  keyConsiderations: string[];
  potentialChallenges: string[];
  successMetrics: string[];
  error?: string;
}

export interface PolicyBestPracticesResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: Array<{
    title: string;
    description: string;
    implementationTips: string[];
  }>;
  error?: string;
}
