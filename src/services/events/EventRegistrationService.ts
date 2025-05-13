
import { supabase } from "@/integrations/supabase/client";
import { EventRegistration } from "@/types/eventTypes";
import { EventBaseService } from "./EventBaseService";

export class EventRegistrationService extends EventBaseService {
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
}
