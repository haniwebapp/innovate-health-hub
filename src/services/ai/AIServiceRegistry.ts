
import { AIService, AIServiceType } from './AIService';

// Registry to store and retrieve AI services
export class AIServiceRegistry {
  private static services: Map<AIServiceType, AIService> = new Map();

  // Register a service
  static registerService(service: AIService): void {
    AIServiceRegistry.services.set(service.serviceType, service);
  }

  // Get a service by type
  static getService<T extends AIService>(type: AIServiceType): T | undefined {
    return AIServiceRegistry.services.get(type) as T | undefined;
  }

  // Check if a service is registered
  static hasService(type: AIServiceType): boolean {
    return AIServiceRegistry.services.has(type);
  }

  // Get all registered service types
  static getAvailableServices(): AIServiceType[] {
    return Array.from(AIServiceRegistry.services.keys());
  }
}

// Re-export AIServiceType for consistency
export { AIServiceType } from './AIService';
