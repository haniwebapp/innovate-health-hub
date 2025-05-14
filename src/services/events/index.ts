
import { EventQueryService } from "./EventQueryService";
import { EventRegistrationService } from "./EventRegistrationService";

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
  
  // Re-expose methods from EventRegistrationService
  static async registerForEvent(eventId: string) {
    return EventRegistrationService.registerForEvent(eventId);
  }
  
  static async isUserRegisteredForEvent(eventId: string) {
    return EventRegistrationService.isUserRegisteredForEvent(eventId);
  }
  
  static async submitEventFeedback(eventId: string, feedback: string, rating?: number) {
    return EventRegistrationService.submitEventFeedback(eventId, feedback, rating);
  }
  
  static async getUserEventRegistrations() {
    return EventRegistrationService.getUserEventRegistrations();
  }
}
