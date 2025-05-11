
import { DateRange } from "react-day-picker";

// Admin log types
export interface AdminLog {
  id: string;
  log_type: string;
  source: string;
  details: Record<string, any>;
  severity: "info" | "warning" | "error" | "critical";
  created_at: Date;
  user_id?: string;
}

// Admin user profile types
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  organization?: string;
  lastSignIn?: string;
  status: "active" | "inactive";
}

export interface ProfileWithEmail {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  organization?: string;
  last_sign_in?: string;
  status?: string;
}

// Settings types
export interface GeneralSettings {
  [key: string]: boolean;
  allowNewRegistrations: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
}

export interface ChallengeSettings {
  [key: string]: boolean | string;
  requireApproval: boolean;
  allowPublicSubmissions: boolean;
  autoCloseExpiredChallenges: boolean;
  submissionTimeLimit: string;
}

// Log types
export type LogType = "system" | "user" | "api" | "security";

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "debug";
  message: string;
  source: LogType;
  details: Record<string, any>;
}

export interface LogFilterOptions {
  startDate?: Date;
  endDate?: Date;
  level?: string;
  source?: LogType;
  searchTerm?: string;
  userId?: string;
  statusCode?: number;
}
