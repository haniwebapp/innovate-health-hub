
// Base interface for all AI services
export interface AIService {
  serviceType: AIServiceType;
  isAvailable(): Promise<boolean>;
  getStaticReferences(): AIServiceStaticReferences;
  recordCall(trace: CallTrace): Promise<void>;
}

export enum AIServiceType {
  Admin = "admin",
  Clinical = "clinical",
  Community = "community",
  Compliance = "compliance",
  Events = "events",
  Innovation = "innovation",
  Regulatory = "regulatory",
  Strategy = "strategy",
  Vision = "vision",
  Chat = "chat"
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

export interface AIServiceStaticReferences {
  [key: string]: any;
}
