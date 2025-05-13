
import { AIService } from "./AIService";
import { AIServiceStaticReferences } from "./types/AIServiceTypes";

export { AIService }; // Export AIService from this file as well

export enum AIServiceType {
  Investment = "investment",
  Regulatory = "regulatory",
  Innovation = "innovation",
  Knowledge = "knowledge",
  Policy = "policy",
  Challenge = "challenge",
  Support = "support",
  Clinical = "clinical",
  Events = "events",
  Admin = "admin",
  Compliance = "compliance",
  Community = "community",
  Quotation = "quotation"
}

export enum AIOperationType {
  Analysis = "analysis",
  Generation = "generation",
  Recommendation = "recommendation",
  Prediction = "prediction",
  Classification = "classification",
  Scoring = "scoring",
  Matching = "matching",
  Search = "search",
  Translation = "translation"
}

export class AIServiceRegistry {
  private static services: Map<AIServiceType, AIService> = new Map();
  
  static registerService(service: AIService): void {
    this.services.set(service.serviceType, service);
  }
  
  static getService(type: AIServiceType): AIService | undefined {
    return this.services.get(type);
  }
  
  static getAllServices(): Map<AIServiceType, AIService> {
    return this.services;
  }
  
  static async checkServiceHealth(): Promise<{ [key in AIServiceType]?: boolean }> {
    const health: { [key in AIServiceType]?: boolean } = {};
    
    for (const [type, service] of this.services.entries()) {
      try {
        health[type] = await service.isAvailable();
      } catch (error) {
        console.error(`Error checking service health for ${type}:`, error);
        health[type] = false;
      }
    }
    
    return health;
  }
  
  static getStaticReferences(): AIServiceStaticReferences {
    const references: AIServiceStaticReferences = {};
    
    for (const [type, service] of this.services.entries()) {
      const serviceRefs = service.getStaticReferences();
      if (Object.keys(serviceRefs).length > 0) {
        references[type] = serviceRefs;
      }
    }
    
    return references;
  }
}
