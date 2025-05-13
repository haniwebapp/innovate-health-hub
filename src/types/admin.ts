
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
