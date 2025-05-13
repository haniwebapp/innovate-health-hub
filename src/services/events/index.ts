
export * from "./EventBaseService";
export * from "./EventQueryService";
export * from "./EventRegistrationService";

// For backward compatibility, re-export as EventService
import { EventQueryService } from "./EventQueryService";
import { EventRegistrationService } from "./EventRegistrationService";

export class EventService {
  // Re-export methods from EventQueryService
  static getAllEvents = EventQueryService.getAllEvents;
  static getUpcomingEvents = EventQueryService.getUpcomingEvents;
  static getPastEvents = EventQueryService.getPastEvents;
  static getFeaturedEvents = EventQueryService.getFeaturedEvents;
  static getEventById = EventQueryService.getEventById;
  
  // Re-export methods from EventRegistrationService
  static registerForEvent = EventRegistrationService.registerForEvent;
  static isUserRegisteredForEvent = EventRegistrationService.isUserRegisteredForEvent;
  static submitEventFeedback = EventRegistrationService.submitEventFeedback;
  static getUserEventRegistrations = EventRegistrationService.getUserEventRegistrations;
  
  // Re-export protected methods via static methods for backward compatibility
  static mapDbEventsToClient = EventQueryService.mapDbEventsToClient.bind(EventQueryService);
  static mapDbEventToClient = EventQueryService.mapDbEventToClient.bind(EventQueryService);
  static mapDbRegistrationToClient = EventQueryService.mapDbRegistrationToClient.bind(EventQueryService);
}
