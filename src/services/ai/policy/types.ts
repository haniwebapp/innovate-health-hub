
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
  overallScore?: number;
  overallAssessment?: string;
  error?: string;
}

// Strategy Gap Types
export interface StrategyMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  description?: string;
  id?: string;
  category?: string;
  currentValue?: number;
}

export interface StrategyGap {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  potentialImpact: string;
  metricId?: string;
  metricName?: string;
  category?: string;
  currentValue?: number;
  benchmarkValue?: number;
  gap?: number;
  gapPercentage?: number;
  priority?: 'critical' | 'high' | 'medium' | 'low';
}

export interface BenchmarkData {
  name: string;
  value: number;
  metrics: StrategyMetric[];
  id?: string;
  source?: string;
  scope?: string;
}

export interface StrategyGapAnalysisResult {
  gaps: StrategyGap[];
  recommendations: {
    title?: string;
    description: string;
    priority?: string;
    expectedOutcome?: string;
    category?: string;
    expectedImpact?: string;
    timeframe?: string;
  }[];
  benchmarkComparison?: {
    currentScore: number;
    benchmarkScore: number;
    differencePercentage: number;
  };
  overallScore?: number;
  categoryScores?: {
    category: string;
    score: number;
    benchmarkComparison: number;
  }[];
  benchmarkSource?: string;
  error?: string;
}

// Best Practices Types
export interface PolicyBestPracticesResult {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats?: string[];
  recommendations: {
    title?: string;
    description?: string;
    implementationTips?: string[];
  }[];
  overallScore?: number;
  error?: string;
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
  sectors?: string[];
  timelineImpact?: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  stakeholders?: string[];
  risks?: string[];
  opportunities?: string[];
  overallAssessment?: string;
  error?: string;
}

// Policy Data Interface
export interface PolicyData {
  name: string;
  description: string;
  sector: string;
  stakeholders?: string[];
  goals?: string[];
  metrics?: string[];
}

// Policy Impact Result Interface 
export interface PolicyImpactResult {
  impactScore: number;
  stakeholderImpact: Record<string, {
    score: number;
    description: string;
  }>;
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
  overallScore?: number;
  error?: string;
}
