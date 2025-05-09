
export interface Innovation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  rating: number;
  status: "New" | "Validated" | "Scaling" | "Established";
  createdAt: string;
  longDescription?: string;
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

export const statusColors: Record<string, string> = {
  "New": "bg-blue-100 text-blue-800",
  "Validated": "bg-green-100 text-green-800",
  "Scaling": "bg-purple-100 text-purple-800",
  "Established": "bg-gray-100 text-gray-800"
};

export const categoryColors: Record<string, string> = {
  "Digital Health": "bg-moh-lightGreen text-moh-darkGreen border-moh-green",
  "Telehealth": "bg-cyan-100 text-cyan-800 border-cyan-300",
  "MedTech": "bg-amber-100 text-amber-800 border-amber-300",
  "Healthcare IT": "bg-indigo-100 text-indigo-800 border-indigo-300",
  "Therapeutics": "bg-rose-100 text-rose-800 border-rose-300"
};

export interface InnovationSubmission {
  title: string;
  description: string;
  category: string;
  tags: string[];
  organization: string;
  contactName: string;
  contactEmail: string;
  website?: string;
  implementationStatus: "Concept" | "Prototype" | "Pilot" | "Deployed";
  images: File[];
  documentationFiles?: File[];
  videoUrl?: string;
}
