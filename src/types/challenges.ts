
export interface Challenge {
  id: string;
  title: string;
  description: string;
  long_description: string;
  deadline: string;
  submission_deadline: string;
  category: string;
  participants: number;
  prize: string;
  image_url: string;
  organizer: string;
  status: string;
  eligibility: string;
  requirements: string[];
  timeline: {
    date: string;
    event: string;
  }[];
}

export interface Submission {
  id: string;
  title: string;
  challenge_id: string;
  challenge_title: string;
  status: string;
  submitted_at: string | null;
  updated_at: string;
  category: string;
  description?: string;
  team_members?: string;
}

export type SubmissionStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected";
export type ChallengeStatus = "open" | "closed" | "upcoming" | "completed";

// Stats interfaces for dashboard
export interface UserStats {
  total_submissions: number;
  approved_submissions: number;
  ongoing_challenges: number;
}
