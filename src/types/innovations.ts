
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
