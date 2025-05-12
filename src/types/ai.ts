
export interface CallTrace {
  traceId: string;
  operation: string;
  context: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface AIModelConfig {
  model: string;
  temperature: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
}

export interface AIRequest {
  trace?: CallTrace;
  input: any;
  config?: AIModelConfig;
  context?: string;
}

export interface AIResponse<T> {
  trace: CallTrace;
  data?: T;
  error?: string;
  processingTime?: number;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIFeedback {
  traceId: string;
  rating: number; // 1-5
  comments?: string;
  userId?: string;
  timestamp: string;
}

export interface AIEvaluation {
  traceId: string;
  metrics: {
    accuracy?: number;
    relevance?: number;
    completeness?: number;
    helpfulness?: number;
    [key: string]: number | undefined;
  };
  evaluationMethod: 'human' | 'automatic' | 'hybrid';
  timestamp: string;
}
