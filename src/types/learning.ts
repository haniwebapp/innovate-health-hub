
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'article' | 'quiz' | 'interactive';
  contentUrl?: string;
  estimatedMinutes: number;
  orderIndex: number;
  pathId: string;
  resourceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedHours: number;
  prerequisitePathId?: string;
  featured: boolean;
  totalModules: number;
  completedModules?: number;
  isEnrolled?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  pathId: string;
  moduleId: string;
  progressPercentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastActivityAt: string;
  completedAt?: string;
  notes?: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  specialties: string[];
  experience: string;
  availability: string;
  bio: string;
  rating?: number;
  totalMentees: number;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  topic: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  pathId: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl: string;
}
