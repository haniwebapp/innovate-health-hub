
// Strategy Gap Analysis Types
export interface StrategyGapInput {
  currentPolicyImplementation: string;
  policyGoals: string;
  sector: string;
}

export interface StrategyGap {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  potentialImpact?: string;
}

export interface StrategyGapResult {
  overallAnalysis: string;
  gaps: StrategyGap[];
  recommendations: string[];
}

// Policy Data Types
export interface PolicyData {
  name: string;
  description: string;
  sector: string;
  stakeholders?: string[];
  policyText?: string;
}

// Policy Impact Simulation Types
export interface PolicyImpactScore {
  score: number;
  description: string;
}

export interface StakeholderImpact {
  [key: string]: {
    score: number;
    description: string;
  };
}

export interface TimeframeImpact {
  short: string[];
  medium: string[];
  long: string[];
}

export interface PolicyImpactResult {
  overallScore?: number;
  impactScore: number;
  stakeholderImpact: StakeholderImpact;
  economicImpact: PolicyImpactScore;
  socialImpact: PolicyImpactScore;
  healthcareImpact: PolicyImpactScore;
  healthcareOutcomeImpact: string;
  implementationComplexity: string;
  recommendations: string[];
  timeframeImpact?: TimeframeImpact;
  error?: string;
}

export interface PolicyImpactSimulation {
  impactScore: number;
  stakeholderImpact: {
    patients?: { score: number; description: string };
    providers?: { score: number; description: string };
    payers?: { score: number; description: string };
    [key: string]: { score: number; description: string } | undefined;
  };
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

// Vision 2030 Alignment Types
export interface Vision2030AlignmentInput {
  name: string;
  description: string;
  goals?: string;
  targetAudience?: string;
  sector: string;
}

export interface Vision2030AlignmentResult {
  score?: number;
  alignmentScore?: number;
  overallScore?: number;
  alignmentAreas: string[];
  gapAreas: string[];
  vision2030Objectives: string[];
  recommendations: string[];
  vision2030Impact: string;
  potentialImpact?: string;
  improvementAreas: string[];
  overallAssessment?: string;
  error?: string;
}

// Policy Annotation Types
export interface PolicyAnnotation {
  text: string;
  type: string;
  insight: string;
}

export interface PolicyAnnotationResult {
  annotations: PolicyAnnotation[];
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
  phases: {
    title: string;
    description: string;
    tasks: string[];
    timeline: string;
    keyConsiderations: string[];
  }[];
  stakeholderEngagement: {
    group: string;
    engagementStrategy: string;
  }[];
  risks: {
    description: string;
    mitigation: string;
    severity: "high" | "medium" | "low";
  }[];
  recommendations: string[];
  error?: string;
}

// Policy Best Practices Types
export interface PolicyRecommendation {
  title: string;
  description: string;
  implementationTips: string[];
}

export interface PolicyBestPracticesResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: PolicyRecommendation[];
  error?: string;
}

// Innovation Guide Types
export interface InnovationGuideInput {
  innovationStage: string;
  innovationType: string;
  challenges?: string;
  goals?: string;
}

export interface InnovationGuideResult {
  stageSpecificGuidance: {
    title: string;
    description: string;
    steps: string[];
  };
  recommendations: string[];
  resources: {
    title: string;
    description: string;
    url?: string;
  }[];
  marketInsights: string[];
  nextSteps: string[];
  error?: string;
}

// Regulatory Checklist Types
export interface RegulatoryChecklistInput {
  innovationType: string;
  description: string;
  sector?: string;
}

export interface RegulatoryChecklistItem {
  requirement: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  timeline: string;
  guidelines: string[];
}

export interface RegulatoryChecklistResult {
  checklist: RegulatoryChecklistItem[];
  regulatoryPathway: string;
  timeToCompliance: string;
  keyConsiderations: string[];
  recommendations: string[];
  error?: string;
}
