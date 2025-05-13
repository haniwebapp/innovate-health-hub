
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
