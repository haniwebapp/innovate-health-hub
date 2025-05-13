
import { FileText, BookOpen, Video, Presentation, FileCode, Globe } from "lucide-react";

export interface ResourceMockData {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  thumbnail?: string;
  matchScore?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  url?: string;
  downloadCount?: number;
}

export const mockData: ResourceMockData[] = [
  {
    id: '1',
    title: 'Digital Health Strategy Guide 2025',
    description: 'Comprehensive guide for implementing digital health solutions in Saudi healthcare facilities.',
    type: 'PDF Document',
    category: 'Digital Health',
    thumbnail: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    matchScore: 92,
    isNew: true,
    downloadCount: 3217
  },
  {
    id: '2',
    title: 'Medical AI Implementation Handbook',
    description: 'Step-by-step guide to implementing and scaling AI solutions in clinical environments.',
    type: 'Interactive Guide',
    category: 'AI & Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    matchScore: 85,
    downloadCount: 2945
  },
  {
    id: '3',
    title: 'Healthcare Regulatory Framework',
    description: 'Overview of Saudi healthcare regulations and compliance requirements for innovators.',
    type: 'PDF Document',
    category: 'Regulatory',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    downloadCount: 2124
  },
  {
    id: '4',
    title: 'Telehealth Best Practices',
    description: 'Collection of best practices and guidelines for implementing telehealth solutions.',
    type: 'Video Series',
    category: 'Telehealth',
    isFeatured: true,
    downloadCount: 1876
  },
  {
    id: '5',
    title: 'Health Data Security Standards',
    description: 'Comprehensive guide to securing patient data in digital health applications.',
    type: 'Interactive Course',
    category: 'Data Security',
    isNew: true,
    downloadCount: 1532
  },
  {
    id: '6',
    title: 'Innovation Funding Guide',
    description: 'Guide to finding and securing funding for healthcare innovation projects.',
    type: 'PDF Document',
    category: 'Investment',
    downloadCount: 1435
  }
];

export const resourceTypeIcons: Record<string, any> = {
  'PDF Document': FileText,
  'Interactive Guide': BookOpen,
  'Video Series': Video,
  'Interactive Course': Presentation,
  'Code Repository': FileCode,
  'Web Resource': Globe
};
