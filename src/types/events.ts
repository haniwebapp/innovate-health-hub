
export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  eventUrl?: string;
  registrationUrl?: string;
  recordingUrl?: string;
  presenter?: string;
  presenterTitle?: string;
  presenterOrganization?: string;
  featured?: boolean;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxAttendees?: number;
  tags?: string[];
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
