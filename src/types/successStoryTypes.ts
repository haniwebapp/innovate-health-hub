
export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  content: string;
  impactMetrics?: Record<string, any>;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags?: string[];
  authorId?: string;
  organization?: string;
  publicationDate?: Date;
  coverImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuccessStoryFormData {
  title: string;
  summary: string;
  content: string;
  impactMetrics?: Record<string, any>;
  category: string;
  tags?: string[];
  organization?: string;
  coverImageUrl?: string;
}
