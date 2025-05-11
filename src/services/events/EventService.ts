
import { supabase } from "@/integrations/supabase/client";
import { Event, EventRegistration } from "@/types/eventTypes";

export class EventService {
  /**
   * Get all events
   */
  static async getAllEvents(): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });
        
      if (error) throw error;
      
      return this.mapDbEventsToClient(data || []);
    } catch (error) {
      console.error("Error fetching all events:", error);
      throw error;
    }
  }
  
  /**
   * Get upcoming events
   */
  static async getUpcomingEvents(limit?: number): Promise<Event[]> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('start_date', { ascending: true });
        
      if (limit) {
        query = query.limit(limit);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      
      return this.mapDbEventsToClient(data || []);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  }
  
  /**
   * Get past events
   */
  static async getPastEvents(limit?: number): Promise<Event[]> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .in('status', ['completed', 'cancelled'])
        .order('start_date', { ascending: false });
        
      if (limit) {
        query = query.limit(limit);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      
      return this.mapDbEventsToClient(data || []);
    } catch (error) {
      console.error("Error fetching past events:", error);
      throw error;
    }
  }
  
  /**
   * Get featured events
   */
  static async getFeaturedEvents(limit: number = 3): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('featured', true)
        .order('start_date', { ascending: true })
        .limit(limit);
        
      if (error) throw error;
      
      return this.mapDbEventsToClient(data || []);
    } catch (error) {
      console.error("Error fetching featured events:", error);
      throw error;
    }
  }
  
  /**
   * Get event by ID
   */
  static async getEventById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data ? this.mapDbEventToClient(data) : null;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Register for an event
   */
  static async registerForEvent(eventId: string): Promise<EventRegistration> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to register for an event");
      }
      
      const { data, error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: eventId,
          user_id: user.data.user.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbRegistrationToClient(data);
    } catch (error) {
      console.error(`Error registering for event with ID ${eventId}:`, error);
      throw error;
    }
  }
  
  /**
   * Check if user is registered for an event
   */
  static async isUserRegisteredForEvent(eventId: string): Promise<boolean> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) return false;
      
      const { data, error } = await supabase
        .from('event_registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user.data.user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error(`Error checking registration status for event with ID ${eventId}:`, error);
      throw error;
    }
  }
  
  /**
   * Submit feedback for an event
   */
  static async submitEventFeedback(eventId: string, feedback: string, rating?: number): Promise<EventRegistration> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to submit event feedback");
      }
      
      const { data, error } = await supabase
        .from('event_registrations')
        .update({
          feedback,
          rating,
        })
        .eq('event_id', eventId)
        .eq('user_id', user.data.user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      return this.mapDbRegistrationToClient(data);
    } catch (error) {
      console.error(`Error submitting feedback for event with ID ${eventId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get user's event registrations
   */
  static async getUserEventRegistrations(): Promise<EventRegistration[]> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) return [];
      
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user.data.user.id);
        
      if (error) throw error;
      
      return (data || []).map(reg => this.mapDbRegistrationToClient(reg));
    } catch (error) {
      console.error("Error fetching user event registrations:", error);
      throw error;
    }
  }
  
  /**
   * Map database event objects to client-side objects
   */
  private static mapDbEventsToClient(dbEvents: any[]): Event[] {
    return dbEvents.map(event => this.mapDbEventToClient(event));
  }
  
  /**
   * Map a single database event object to client-side object
   */
  private static mapDbEventToClient(dbEvent: any): Event {
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
      status: dbEvent.status,
      createdBy: dbEvent.created_by,
      createdAt: new Date(dbEvent.created_at),
      updatedAt: new Date(dbEvent.updated_at)
    };
  }
  
  /**
   * Map a database registration object to client-side object
   */
  private static mapDbRegistrationToClient(dbReg: any): EventRegistration {
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
