
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/eventTypes";
import { EventBaseService } from "./EventBaseService";

export class EventQueryService extends EventBaseService {
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
}
