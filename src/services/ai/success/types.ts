
export interface StoryGenerationPrompt {
  organization: string;
  category: string;
  keyPoints: string[];
  tone?: string;
  target_audience?: string;
}

export interface StoryGenerationResult {
  title: string;
  summary: string;
  content: string;
  impactMetrics?: Record<string, any>;
  suggestedTags?: string[];
}

export interface StoryAnalysisResult {
  clarity: number;
  engagement: number;
  persuasiveness: number;
  accuracy: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  audienceFit: number;
  sentimentAnalysis: {
    positive: number;
    negative: number;
    neutral: number;
    dominant: string;
  };
}
