
export interface Challenge {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  deadline: string;
  submission_deadline: string;
  category: string;
  participants: number;
  prize: string;
  image_url?: string;
  organizer: string;
  status: 'Open' | 'Closed' | 'Upcoming' | 'Reviewing' | 'Completed';
  eligibility?: string;
  requirements?: string[];
  timeline?: {
    date: string;
    event: string;
  }[];
}

export interface Submission {
  id: string;
  challenge_id: string;
  challenge_title: string;
  title: string;
  description: string;
  status: 'draft' | 'submitted' | 'under-review' | 'completed' | 'rejected';
  submitted_at: string;
  updated_at: string;
  category: string;
  score?: number;
}
