
import { Event, EventRegistration } from "@/types/eventTypes";

export class EventBaseService {
  /**
   * Map database event to client event
   */
  protected static mapDbEventToClient(dbEvent: any): Event {
    return {
      id: dbEvent.id,
      title: dbEvent.title,
      description: dbEvent.description,
      eventType: dbEvent.event_type,
      startDate: new Date(dbEvent.start_date),
      endDate: new Date(dbEvent.end_date),
      location: dbEvent.location,
      isVirtual: dbEvent.is_virtual,
      eventUrl: dbEvent.event_url,
      registrationUrl: dbEvent.registration_url,
      recordingUrl: dbEvent.recording_url,
      presenter: dbEvent.presenter,
      presenterTitle: dbEvent.presenter_title,
      presenterOrganization: dbEvent.presenter_organization,
      featured: dbEvent.featured,
      category: dbEvent.category,
      status: dbEvent.status,
      maxAttendees: dbEvent.max_attendees,
      tags: dbEvent.tags
    };
  }

  /**
   * Map database events to client events
   */
  protected static mapDbEventsToClient(dbEvents: any[]): Event[] {
    return dbEvents.map(event => this.mapDbEventToClient(event));
  }

  /**
   * Map database registration to client registration
   */
  protected static mapDbRegistrationToClient(dbRegistration: any): EventRegistration {
    return {
      eventId: dbRegistration.event_id,
      userId: dbRegistration.user_id,
      registrationDate: new Date(dbRegistration.registration_date),
      attended: dbRegistration.attended,
      feedback: dbRegistration.feedback,
      rating: dbRegistration.rating
    };
  }
}
