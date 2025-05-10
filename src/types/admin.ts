
export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
  organization?: string;
  lastSignIn?: string;
  status: "active" | "inactive";
};

export type GeneralSettings = {
  allowNewRegistrations: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
};

export type ChallengeSettings = {
  requireApproval: boolean;
  allowPublicSubmissions: boolean;
  autoCloseExpiredChallenges: boolean;
  submissionTimeLimit: string;
};

// Update to ensure avatar_url is included
export interface ProfileData {
  first_name?: string;
  last_name?: string;
  user_type?: string;
  organization?: string;
  avatar_url?: string;
  email?: string;
  updated_at?: string;
}

export interface ProfileWithEmail {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  organization?: string;
  last_sign_in?: string;
  status: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  roles: string[];
}
