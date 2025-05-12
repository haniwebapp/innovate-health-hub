
export interface AdminLog {
  id: string;
  log_type: "access" | "error" | "audit" | "event";
  source: string;
  severity: "info" | "warning" | "error" | "critical";
  details: any;
  user_id?: string;
  created_at: Date;
  resource_id?: string;
  session_id?: string;
  ip_address?: string;
  request_path?: string;
  status_code?: number;
  duration_ms?: number;
  environment?: string;
  tags?: string[];
}

// Add the DateRange type if it doesn't already exist
export interface DateRange {
  from: Date;
  to?: Date;
}
