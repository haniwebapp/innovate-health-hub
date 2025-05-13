
import { AIServiceStaticReferences, CallTrace } from "./types/AIServiceTypes";
import { createTrace, logAIOperation, recordFeedback } from "./utils/AIServiceTracing";
import { handleError } from "./utils/AIServiceErrors";
import { checkAIServices } from "./utils/AIServiceHealth";

export enum AIServiceType {
  INVESTMENT = "investment",
  REGULATORY = "regulatory",
  INNOVATION = "innovation",
  KNOWLEDGE = "knowledge",
  POLICY = "policy",
  CHALLENGE = "challenge",
  SUPPORT = "support",
  CLINICAL = "clinical",
  EVENTS = "events",
  ADMIN = "admin",
  COMPLIANCE = "compliance",
  COMMUNITY = "community",
  QUOTATION = "quotation" // Add the new service type
}

export class AIService {
  // Define services container to avoid circular dependencies
  private static services: AIServiceStaticReferences = {
    investment: null,
    regulatory: null,
    innovation: null,
    knowledge: null,
    policy: null,
    challenge: null,
    support: null,
    clinical: null,
    events: null,
    admin: null,
    compliance: null,
    community: null,
    quotation: null // Add quotation service
  };
  
  // Getters for service access
  static get investment() { return this.services.investment; }
  static get regulatory() { return this.services.regulatory; }
  static get innovation() { return this.services.innovation; }
  static get knowledge() { return this.services.knowledge; }
  static get policy() { return this.services.policy; }
  static get challenge() { return this.services.challenge; }
  static get support() { return this.services.support; }
  static get clinical() { return this.services.clinical; }
  static get events() { return this.services.events; }
  static get admin() { return this.services.admin; }
  static get compliance() { return this.services.compliance; }
  static get community() { return this.services.community; }
  static get quotation() { return this.services.quotation; } // Getter for quotation service
  
  // Setters for service initialization
  static set investment(service: any) { this.services.investment = service; }
  static set regulatory(service: any) { this.services.regulatory = service; }
  static set innovation(service: any) { this.services.innovation = service; }
  static set knowledge(service: any) { this.services.knowledge = service; }
  static set policy(service: any) { this.services.policy = service; }
  static set challenge(service: any) { this.services.challenge = service; }
  static set support(service: any) { this.services.support = service; }
  static set clinical(service: any) { this.services.clinical = service; }
  static set events(service: any) { this.services.events = service; }
  static set admin(service: any) { this.services.admin = service; }
  static set compliance(service: any) { this.services.compliance = service; }
  static set community(service: any) { this.services.community = service; }
  static set quotation(service: any) { this.services.quotation = service; } // Setter for quotation service

  // Re-export utility methods
  static createTrace = createTrace;
  static logAIOperation = logAIOperation;
  static recordFeedback = recordFeedback;
  static handleError = handleError;
  static checkAIServices = checkAIServices;
}
