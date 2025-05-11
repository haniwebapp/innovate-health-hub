
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  organization?: string;
  lastSignIn: string;
  status: "active" | "inactive";
}

export interface ProfileWithEmail extends UserProfile {
  email: string;
}

export interface GeneralSettings {
  allowNewRegistrations: boolean;
  requireEmailVerification: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
  [key: string]: boolean;
}

export interface ChallengeSettings {
  requireApproval: boolean;
  allowPublicSubmissions: boolean;
  autoCloseExpiredChallenges: boolean;
  submissionTimeLimit: string;
  [key: string]: boolean | string;
}

export interface TableFilter {
  field: string;
  value: string;
}

export interface SystemEvent {
  text: string;
  time: string;
  type: "user" | "submission" | "challenge" | "system";
}

export interface SystemHealth {
  name: string;
  status: string;
  value: number;
}

export interface AdminStatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  type: string;
  config: any;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "draft" | "closed";
  startDate: string;
  endDate: string;
  submissions: number;
}

export interface Innovation {
  id: string;
  title: string;
  creator: string;
  status: string;
  submittedDate: string;
  category: string;
}

export interface InvestmentProgram {
  id: string;
  name: string;
  type: string;
  amount: string;
  status: string;
  applicants: number;
  deadline: string;
}

export interface SandboxProject {
  id: string;
  name: string;
  innovator: string;
  status: string;
  startDate: string;
  endDate: string;
  riskLevel: string;
}

export interface KnowledgeResource {
  id: string;
  title: string;
  type: string;
  category: string;
  tags: string[];
  dateAdded: string;
  downloads: number;
  featured: boolean;
}
