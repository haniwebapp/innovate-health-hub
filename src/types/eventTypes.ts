
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  category: string;
  tags?: string[];
  presenter?: string;
  registrationUrl?: string;
  eventType: string;
  status: string;
  recordingUrl?: string;
  presenterTitle?: string;
  presenterOrganization?: string;
  featured?: boolean;
  eventUrl?: string;
  maxAttendees?: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registrationDate: Date;
  attended: boolean;
  feedback?: string;
  rating?: number;
}

export interface EventRecommendation {
  eventId: string;
  eventTitle: string;
  matchScore: number;
  matchReason: string;
  eventDate: string;
}
