
export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'webinar' | 'conference' | 'workshop' | 'panel' | 'other';
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  eventUrl?: string;
  registrationUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  presenter?: string;
  presenterTitle?: string;
  presenterOrganization?: string;
  category: string;
  tags?: string[];
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registrationDate: Date;
  attended?: boolean;
  feedback?: string;
  rating?: number;
}

export interface EventRecommendation {
  eventId: string;
  eventTitle: string;
  matchScore: number;
  matchReason: string;
}
