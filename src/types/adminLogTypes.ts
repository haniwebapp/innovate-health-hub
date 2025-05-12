
export interface AdminLog {
  id: string;
  user_id: string | null;
  username: string | null;
  log_type: string;
  action: string;
  resource_id: string | null;
  resource_type: string | null;
  status_code: number;
  ip_address: string;
  request_path: string;
  details: any;
  session_id: string | null;
  environment: string;
  duration_ms: number;
  created_at: Date;
}

export type LogSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AdminLogSearchParams {
  startDate?: Date;
  endDate?: Date;
  logType?: string;
  username?: string;
  resourceType?: string;
  statusCode?: number;
  environment?: string;
  page?: number;
  pageSize?: number;
}

export interface AdminLogStats {
  totalLogs: number;
  errorsCount: number;
  averageDuration: number;
  topEndpoints: {
    path: string;
    count: number;
  }[];
  recentErrors: AdminLog[];
}

export interface AdminLogAnomaly {
  id: string;
  type: string;
  description: string;
  severity: LogSeverity;
  affectedLogs: number;
  detectedAt: Date;
}
