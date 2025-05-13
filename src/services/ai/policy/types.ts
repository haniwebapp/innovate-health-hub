
// Policy Annotation Types
export interface PolicyAnnotation {
  id: string;
  text: string;
  startIndex: number;
  endIndex: number;
  category: string;
  insights: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface PolicyAnnotationResult {
  annotations: PolicyAnnotation[];
  overallAnalysis: string;
  keyTakeaways: string[];
  error?: string;
}

export interface PolicyQAResult {
  answer: string;
  confidence: string;
  relevantSections: string[];
  suggestions: string[];
  error?: string;
}

export interface ImplementationGuidanceResult {
  steps: {
    title: string;
    description: string;
    timeframe: string;
    resources: string[];
  }[];
  keyStakeholders: string[];
  potentialChallenges: string[];
  successMetrics: string[];
  summary: string;
  error?: string;
}

// Vision Alignment Types
export interface Vision2030AlignmentResult {
  score: number;
  alignmentAreas: string[];
  gapAreas: string[];
  recommendations: string[];
  vision2030Impact: string;
}

// Strategy Gap Types
export interface StrategyMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  description?: string;
}

export interface StrategyGap {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  potentialImpact: string;
}

export interface BenchmarkData {
  name: string;
  value: number;
  metrics: StrategyMetric[];
}

export interface StrategyGapAnalysisResult {
  score: number;
  gaps: StrategyGap[];
  recommendations: {
    title: string;
    description: string;
    priority: string;
    expectedOutcome: string;
  }[];
  benchmarkComparison: {
    currentScore: number;
    benchmarkScore: number;
    differencePercentage: number;
  };
}

// Best Practices Types
export interface PolicyBestPracticesResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  bestPractices: {
    title: string;
    description: string;
    implementationTips: string[];
  }[];
}

// Impact Simulation Types
export interface PolicyImpactSimulation {
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
}
