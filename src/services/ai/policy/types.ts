
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
  metrics?: string[];
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

/**
 * Interface for policy best practices analysis results
 */
export interface PolicyBestPracticesResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  error?: string;
}

/**
 * Interface for policy implementation feasibility analysis
 */
export interface PolicyFeasibilityResult {
  feasibilityScore: number;
  technicalFeasibility: {
    score: number;
    description: string;
  };
  financialFeasibility: {
    score: number;
    description: string;
  };
  timelineFeasibility: {
    score: number;
    description: string;
  };
  barriers: string[];
  enablers: string[];
  recommendations: string[];
  error?: string;
}

/**
 * Interface for policy stakeholder impact analysis
 */
export interface StakeholderImpactResult {
  stakeholderImpacts: {
    patients: { score: number; description: string };
    providers: { score: number; description: string };
    payers: { score: number; description: string };
    government: { score: number; description: string };
    industry: { score: number; description: string };
  };
  overallAnalysis: string;
  recommendations: string[];
  error?: string;
}

/**
 * Interface for policy annotation results
 */
export interface PolicyAnnotationResult {
  annotations: PolicyAnnotation[];
  overallAnalysis: string;
  keyTakeaways: string[];
  error?: string;
}

/**
 * Interface for a single policy annotation
 */
export interface PolicyAnnotation {
  section: string;
  annotation: string;
  guidelines: string[];
  challenges: string[];
}

/**
 * Interface for implementation guidance
 */
export interface ImplementationGuidanceResult {
  implementationSteps: string[];
  requiredResources: string[];
  stakeholders: string[];
  timeline: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  potentialChallenges: string[];
  successMetrics: string[];
  error?: string;
}

/**
 * Interface for policy Q&A results
 */
export interface PolicyQAResult {
  answer: string;
  confidence: "high" | "medium" | "low";
  relevantSections: string[];
  suggestions: string[];
  error?: string;
}

/**
 * Interface for benchmark data
 */
export interface BenchmarkData {
  id: string;
  name: string;
  source: string;
  scope: "global" | "regional" | "national";
  metrics: BenchmarkMetric[];
}

/**
 * Interface for an individual benchmark metric
 */
export interface BenchmarkMetric {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  description?: string;
}

/**
 * Interface for strategy metric
 */
export interface StrategyMetric {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  description?: string;
}

/**
 * Interface for strategy gap analysis results
 */
export interface StrategyGapAnalysisResult {
  overallScore: number;
  categoryScores: {
    category: string;
    score: number;
    benchmarkComparison: number; // Percentage relative to benchmark
  }[];
  gaps: {
    metricId: string;
    metricName: string;
    category: string;
    currentValue: number;
    benchmarkValue: number;
    gap: number;
    gapPercentage: number;
    priority: "critical" | "high" | "medium" | "low";
  }[];
  recommendations: {
    category: string;
    description: string;
    expectedImpact: string;
    timeframe: "short" | "medium" | "long";
  }[];
  benchmarkSource: string;
  error?: string;
}
