
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

// Update the ProfileData interface to include avatar_url
export interface ProfileData {
  first_name?: string;
  last_name?: string;
  user_type?: string;
  organization?: string;
  avatar_url?: string;  // Added avatar_url field
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
  avatar_url?: string;  // Added avatar_url field
}
