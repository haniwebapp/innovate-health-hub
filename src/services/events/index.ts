
import { EventQueryService } from "./EventQueryService";

export class EventService {
  // Re-expose methods from EventQueryService
  static async getAllEvents() {
    return EventQueryService.getAllEvents();
  }

  static async getUpcomingEvents(limit?: number) {
    return EventQueryService.getUpcomingEvents(limit);
  }

  static async getPastEvents(limit?: number) {
    return EventQueryService.getPastEvents(limit);
  }

  static async getFeaturedEvents(limit: number = 3) {
    return EventQueryService.getFeaturedEvents(limit);
  }

  static async getEventById(id: string) {
    return EventQueryService.getEventById(id);
  }
}
