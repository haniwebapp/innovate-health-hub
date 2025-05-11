
export interface AdminLog {
  id: string;
  log_type: string;
  source: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  details: Record<string, any> | string;
  created_at: Date;
  user_id?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  organization: string;
  lastSignIn: string;
  status: 'active' | 'inactive';
}
