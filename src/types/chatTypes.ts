
export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: any;
}

export interface ChatSession {
  id: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}
