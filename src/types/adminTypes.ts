
export interface AdminLog {
  id: string;
  log_type: string;
  source: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error' | 'critical';
  created_at: Date;
  user_id?: string;
}

export interface AdminAnalytics {
  id: string;
  metric_name: string;
  metric_value: number;
  dimension?: string;
  time_period: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UserActivitySummary {
  id: string;
  user_id: string;
  last_login_at?: Date;
  login_count: number;
  submission_count: number;
  comment_count: number;
  event_participation_count: number;
  resource_view_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface LogAnomalyDetection {
  log_type: string;
  source: string;
  normal_count: number;
  current_count: number;
  percent_change: number;
  is_anomaly: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  organization?: string;
  lastSignIn: string;
  status: 'active' | 'inactive';
}

export interface ProfileWithEmail extends UserProfile {
  email: string;
}

export interface SystemHealth {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  lastChecked: Date;
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalSubmissions: number;
  completedChallenges: number;
  pendingApprovals: number;
  systemHealth: SystemHealth[];
}
