
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
  tags?: string[];
  difficulty_level?: string;
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
  team_members?: string[];
  feedback?: string;
  score?: number;
}
