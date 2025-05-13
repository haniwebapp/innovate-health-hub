
import { AIServiceRegistry, AIServiceType } from './AIServiceRegistry';
import { AdminAIService } from './admin/AdminAIService';
import { ClinicalAIService } from './clinical/ClinicalAIService';
import { ComplianceAIService } from './compliance/ComplianceAIService';
import { CommunityAIService } from './community/CommunityAIService';
import { EventsAIService } from './events/EventsAIService';

// Initialize all AI services
export function initializeAIServices() {
  console.log('Initializing AI services...');
  
  // Register all services
  AIServiceRegistry.registerService(new AdminAIService());
  AIServiceRegistry.registerService(new ClinicalAIService());
  AIServiceRegistry.registerService(new ComplianceAIService());
  AIServiceRegistry.registerService(new CommunityAIService());
  AIServiceRegistry.registerService(new EventsAIService());
  
  console.log('AI services initialized successfully');
  console.log('Available services:', AIServiceRegistry.getAvailableServices());
}

// Helper to get a specific service with proper type casting
export function getAIService<T extends AIServiceType>(type: T) {
  return AIServiceRegistry.getService(type);
}

// Check if all AI services are available
export async function checkAIServicesAvailability() {
  const results: Record<AIServiceType, boolean> = {} as Record<AIServiceType, boolean>;
  const services = AIServiceRegistry.getAvailableServices();
  
  for (const serviceType of services) {
    const service = AIServiceRegistry.getService(serviceType);
    if (service) {
      results[serviceType] = await service.isAvailable();
    }
  }
  
  return results;
}
