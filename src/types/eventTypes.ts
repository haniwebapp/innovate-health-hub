
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  isVirtual: boolean;
  category: string;
  tags?: string[];
  presenter?: string;
  registrationUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registrationDate: string;
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
