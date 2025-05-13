
export interface PolicyAnnotation {
  section: string;
  annotation: string;
  guidelines: string[];
  challenges: string[];
}

export interface PolicyAnnotationResult {
  annotations: PolicyAnnotation[];
  overallAnalysis: string;
  keyTakeaways: string[];
  error?: string;
}

export interface ImplementationGuidanceResult {
  implementationSteps: string[];
  requiredResources: string[];
  timeline: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  stakeholders: string[];
  potentialChallenges: string[];
  successMetrics: string[];
}

export interface PolicyQAResult {
  answer: string;
  confidence: string;
  relevantSections: string[];
  suggestions: string[];
  error?: string;
}

export interface PolicyData {
  name: string;
  sector: string;
  description: string;
  stakeholders?: string[];
}

export interface PolicyImpactResult {
  economicImpact: {
    score: number;
    description: string;
    details: string[];
  };
  socialImpact: {
    score: number;
    description: string;
    details: string[];
  };
  healthcareImpact: {
    score: number;
    description: string;
    details: string[];
  };
  timeframeImpact: {
    short: string[];
    medium: string[];
    long: string[];
  };
  recommendations: string[];
  overallScore: number;
}

export interface Vision2030AlignmentResult {
  score: number;
  alignmentAreas: string[];
  gapAreas: string[];
  recommendations: string[];
  vision2030Impact: string;
}
