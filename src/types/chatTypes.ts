
export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: any;
}

export interface ChatMessageProps {
  message: AIMessage;
  isLoading?: boolean;
}

export interface ChatState {
  messages: AIMessage[];
  isLoading: boolean;
  error: string | null;
  context: string;
}
