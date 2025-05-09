
export interface Challenge {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  category: string;
  start_date: string;
  end_date: string;
  status: string;
  prize: string | null;
  eligibility: string | null;
  requirements: string[] | null;
  image_url: string | null;
  organizer: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  // Adding fields used by frontend components that aren't in the DB
  deadline?: string;
  submission_deadline?: string;
  participants?: number;
  timeline?: {date: string; event: string}[];
}

export interface Submission {
  id: string;
  title: string;
  summary: string;
  description: string;
  challenge_id: string;
  user_id: string;
  team_members: string | null;
  status: string;
  submitted_at: string;
  updated_at: string;
  score: number | null;
  feedback: string | null;
  // Adding fields used by frontend components
  challenge_title?: string;
  category?: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    organization: string | null;
  };
}

export interface ChallengeSettings {
  requireApproval: boolean;
  allowPublicSubmissions: boolean;
  autoCloseExpiredChallenges: boolean;
  submissionTimeLimit: number;
}
