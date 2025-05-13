
export interface CallTrace {
  traceId: string;
  operation: string;
  context: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface AIServiceStaticReferences {
  investment?: any;
  regulatory?: any;
  innovation?: any;
  knowledge?: any;
  policy?: any;
  challenge?: any;
  support?: any;
  clinical?: any;
  events?: any;
  admin?: any;
  compliance?: any;
  community?: any;
  quotation?: any;
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
