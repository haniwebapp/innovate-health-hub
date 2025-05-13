
import { supabase } from "@/integrations/supabase/client";
import { Event, EventRegistration } from "@/types/eventTypes";

export class EventBaseService {
  /**
   * Map database event objects to client-side objects
   */
  protected static mapDbEventsToClient(dbEvents: any[]): Event[] {
    return dbEvents.map(event => this.mapDbEventToClient(event));
  }
  
  /**
   * Map a single database event object to client-side object
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
      maxAttendees: dbEvent.max_attendees,
      presenter: dbEvent.presenter,
      presenterTitle: dbEvent.presenter_title,
      presenterOrganization: dbEvent.presenter_organization,
      category: dbEvent.category,
      tags: dbEvent.tags,
      featured: dbEvent.featured,
      status: dbEvent.status
    };
  }
  
  /**
   * Map a database registration object to client-side object
   */
  protected static mapDbRegistrationToClient(dbReg: any): EventRegistration {
    return {
      id: dbReg.id,
      eventId: dbReg.event_id,
      userId: dbReg.user_id,
      registrationDate: new Date(dbReg.registration_date),
      attended: dbReg.attended,
      feedback: dbReg.feedback,
      rating: dbReg.rating
    };
  }
}
