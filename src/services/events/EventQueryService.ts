
import { Event } from "@/types/events";
import { EventBaseService } from "./EventBaseService";
import { mockEvents } from "@/components/events/mockData";

export class EventQueryService extends EventBaseService {
  /**
   * Get all events
   */
  static async getAllEvents(): Promise<Event[]> {
    try {
      // In a real implementation, this would fetch from Supabase
      return mockEvents.map(event => this.mapDbEventToClient(event));
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }

  /**
   * Get upcoming events
   */
  static async getUpcomingEvents(limit?: number): Promise<Event[]> {
    try {
      const now = new Date();
      const upcomingEvents = mockEvents
        .filter(event => new Date(event.startDate) > now)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .map(event => this.mapDbEventToClient(event));
        
      if (limit) {
        return upcomingEvents.slice(0, limit);
      }
      
      return upcomingEvents;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      return [];
    }
  }

  /**
   * Get past events
   */
  static async getPastEvents(limit?: number): Promise<Event[]> {
    try {
      const now = new Date();
      const pastEvents = mockEvents
        .filter(event => new Date(event.endDate) < now)
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
        .map(event => this.mapDbEventToClient(event));
        
      if (limit) {
        return pastEvents.slice(0, limit);
      }
      
      return pastEvents;
    } catch (error) {
      console.error("Error fetching past events:", error);
      return [];
    }
  }

  /**
   * Get featured events
   */
  static async getFeaturedEvents(limit: number = 3): Promise<Event[]> {
    try {
      const featuredEvents = mockEvents
        .filter(event => event.featured)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .map(event => this.mapDbEventToClient(event))
        .slice(0, limit);
        
      return featuredEvents;
    } catch (error) {
      console.error("Error fetching featured events:", error);
      return [];
    }
  }

  /**
   * Get event by ID
   */
  static async getEventById(id: string): Promise<Event | null> {
    try {
      const event = mockEvents.find(event => event.id === id);
      if (!event) return null;
      
      return this.mapDbEventToClient(event);
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      return null;
    }
  }
}
