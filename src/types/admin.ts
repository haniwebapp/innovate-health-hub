
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

// Remove the duplicate ChallengeSettings type from admin.ts since we're using the one from challenges.ts
