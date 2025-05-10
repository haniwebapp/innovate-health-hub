
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
