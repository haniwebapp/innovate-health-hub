
import { AIServiceType } from '../AIService';

// Common types for AI service implementations
export interface AIServiceStaticReferences {
  [key: string]: any;
}

export interface CallTrace {
  userId?: string;
  action: string;
  parameters?: Record<string, any>;
  timestamp: string;
  result?: string;
  success: boolean;
  error?: string;
  operation?: string; // Add this to fix the AIServiceTracing error
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: any;
}

export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  includeHistory?: boolean;
  tools?: any[];
}

export interface AICompletionResponse {
  message: string;
  error?: string;
}

export interface AIStreamOptions {
  onMessage: (message: string) => void;
  onError: (error: string) => void;
  onComplete: () => void;
}

export interface AIServiceHealth {
  investment: boolean;
  regulatory: boolean;
  innovation: boolean;
  knowledge: boolean;
  policy: boolean;
  challenge: boolean;
  support: boolean;
  clinical: boolean;
  events: boolean;
  admin: boolean;
  compliance: boolean;
  community: boolean;
  overall: boolean;
}

// Add the missing AIOperationType
export enum AIOperationType {
  Completion = "completion",
  Chat = "chat",
  Embedding = "embedding",
  ImageGeneration = "image_generation",
  Analysis = "analysis",
  Recommendation = "recommendation"
}

// Re-export AIServiceType to avoid import issues
export { AIServiceType };
