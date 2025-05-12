
// Define the PageSection interface
export interface PageSection {
  type: string;
  title?: string;
  content?: string;
  buttonText?: string;
  imageUrl?: string;
  backgroundImage?: string;
  items?: any[];
  alignment?: string;
  [key: string]: any; // Allow for additional fields
}

// Define the PageContent interface
export interface PageContent {
  sections: PageSection[];
}

// Define the WebsitePage interface
export interface WebsitePage {
  id: string;
  slug: string;
  title: string;
  content: PageContent;
  metaDescription?: string;
  lastUpdatedBy?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the WebsitePageFormData interface for create/update operations
export interface WebsitePageFormData {
  slug: string;
  title: string;
  content: PageContent;
  metaDescription?: string;
  published?: boolean;
}

// Define the AIComplianceRequirement interface
export interface AIComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: 'required' | 'recommended' | 'optional';
  completed: boolean;
}

export interface AIComplianceAnalysis {
  score: number;
  summary: string;
  requirements: AIComplianceRequirement[];
  documentRecommendations: string[];
}
