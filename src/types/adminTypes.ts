
export interface AdminLog {
  id: string;
  log_type: "access" | "error" | "audit" | "event";
  source: string;
  severity: "info" | "warning" | "error" | "critical";
  details: any;
  user_id?: string;
  created_at: Date;
}

// Add the DateRange type if it doesn't already exist
export interface DateRange {
  from: Date;
  to?: Date;
}
