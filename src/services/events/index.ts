
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
  
  // Instead of trying to re-export protected methods, create public wrapper methods
  // that internally call the protected methods from the appropriate service classes
  static mapDbEventsToClient(dbEvents: any[]): any[] {
    // Since EventQueryService inherits from EventBaseService, it has access to the protected methods
    return EventQueryService["mapDbEventsToClient"](dbEvents);
  }

  static mapDbEventToClient(dbEvent: any): any {
    return EventQueryService["mapDbEventToClient"](dbEvent);
  }

  static mapDbRegistrationToClient(dbReg: any): any {
    return EventQueryService["mapDbRegistrationToClient"](dbReg);
  }
}
