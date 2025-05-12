
export interface CallTrace {
  traceId: string;
  operation: string;
  context: string;
  timestamp: string;
  metadata: Record<string, any>;
}
