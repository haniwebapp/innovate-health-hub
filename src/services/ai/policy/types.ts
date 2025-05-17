
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
