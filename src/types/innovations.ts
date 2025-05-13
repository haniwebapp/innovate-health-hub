
export interface Innovation {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  rating?: number;
  status: 'New' | 'Validated' | 'Scaling' | 'Established';
  createdAt: string;
  organization?: string;
  website?: string;
  contact?: string;
  aiMatchScore?: number;
  impactMetrics?: {
    potentialReach?: number;
    costEfficiency?: number;
    implementationTime?: number;
  };
  regulatoryStatus?: {
    compliant: boolean;
    certifications: string[];
    pendingApprovals: string[];
  };
}

// Add the statusColors export
export const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Validated': 'bg-amber-100 text-amber-800',
  'Scaling': 'bg-green-100 text-green-800',
  'Established': 'bg-purple-100 text-purple-800'
};

// Add the categoryColors export
export const categoryColors: Record<string, string> = {
  'Digital Health': 'bg-moh-lightGreen text-moh-darkGreen border-moh-green/30',
  'MedTech': 'bg-amber-100 text-amber-800 border-amber-300/30',
  'Telehealth': 'bg-blue-100 text-blue-800 border-blue-300/30',
  'Healthcare IT': 'bg-indigo-100 text-indigo-800 border-indigo-300/30',
  'Therapeutics': 'bg-rose-100 text-rose-800 border-rose-300/30',
  'Diagnostics': 'bg-purple-100 text-purple-800 border-purple-300/30',
  'Wearables': 'bg-sky-100 text-sky-800 border-sky-300/30',
  'AI Health': 'bg-emerald-100 text-emerald-800 border-emerald-300/30'
};

// Update the InnovationSubmission interface with all required properties
export interface InnovationSubmission {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  organization?: string;
  website?: string;
  contact?: string;
  imageUrl?: string;
  status: string;
  regulatoryStatus?: {
    compliant: boolean;
    certifications: string[];
    pendingApprovals: string[];
  };
  technicalDetails?: {
    platform: string;
    integrations: string[];
    dataHandling: string;
  };
  // Form specific fields
  contactName?: string;
  contactEmail?: string;
  phoneNumber?: string;
  address?: string;
  additionalInfo?: string;
  allowPublicContact?: boolean;
  implementationStatus?: string;
  hasAI?: boolean;
  hasConnectedDevices?: boolean;
  hasMobileApp?: boolean;
  regulatoryStatusType?: "notStarted" | "inProgress" | "approved" | "notApplicable";
  imageUrls?: string[];
  documentNames?: string[];
  
  // Additional form fields needed
  longDescription?: string;
  problem?: string;
  solution?: string;
  videoUrl?: string;
  technicalSpecifications?: string;
  innovationAdvantages?: string;
  patentStatus?: string;
  compatibleSystems?: string;
  targetUsers?: string;
  approvalType?: string;
  approvalDetails?: string;
  hasRiskAssessment?: boolean;
  hasClinicalTrials?: boolean;
  hasEthicalReview?: boolean;
  complianceStandards?: string;
  regulatoryChallenges?: string;
}

export interface SubmissionFormProgress {
  basicInfo: boolean;
  details: boolean;
  media: boolean;
  technical: boolean;
  regulatory: boolean;
  contact: boolean;
  review: boolean;
}
