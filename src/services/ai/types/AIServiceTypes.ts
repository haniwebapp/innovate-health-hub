
export interface CallTrace {
  traceId: string;
  operation: string;
  context: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface AIServiceStaticReferences {
  investment: any;
  regulatory: any;
  innovation: any;
  knowledge: any;
  policy: any;
  challenge: any;
  support: any;
  clinical: any;
  events: any;
  admin: any;
  compliance: any;
  community: any;
  quotation: any; // Add quotation service reference
}
