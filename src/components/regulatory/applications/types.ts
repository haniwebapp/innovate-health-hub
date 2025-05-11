
// Types related to regulatory applications

export interface Application {
  id: string;
  name: string;
  status: 'approved' | 'in-review' | 'draft' | 'rejected';
  submittedDate: string;
  framework: string;
  progress: number;
  testingPeriod?: string;
  description?: string;
  innovationType?: string;
  riskLevel?: string;
}

export interface ApplicationFormData {
  name: string;
  description: string;
  innovationType: string;
  framework: string;
  regulatoryChallenges?: string;
  testingDuration: string;
  organizationType: string;
}
