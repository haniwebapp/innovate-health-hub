
// General platform settings
export interface GeneralSettings {
  allowNewRegistrations: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
}

// Challenge-specific settings
export interface ChallengeSettings {
  requireApproval: boolean;
  allowPublicSubmissions: boolean;
  autoCloseExpiredChallenges: boolean;
  submissionTimeLimit: string; // days
}

// Notification settings
export interface NotificationSettings {
  enableEmailNotifications: boolean;
  enableInAppNotifications: boolean;
  notificationTemplates: NotificationTemplate[];
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  content: string;
  active: boolean;
}

// Integration settings
export interface IntegrationSettings {
  id: string;
  name: string;
  enabled: boolean;
  apiKey?: string;
  endpoint?: string;
  config: Record<string, any>;
}

export interface AdminSettings {
  general: GeneralSettings;
  challenges: ChallengeSettings;
  notifications: NotificationSettings;
  integrations: IntegrationSettings[];
}

// User profile types
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  organization?: string;
  lastSignIn?: string;
  status: "active" | "inactive";
  avatarUrl?: string;
  createdAt?: string;
}

export interface ProfileData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  user_type?: string;
  organization?: string;
  updated_at?: string;
  avatar_url?: string;
  status?: "active" | "inactive";
}

export type ProfileWithEmail = ProfileData & {
  email: string;
};
