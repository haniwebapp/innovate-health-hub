
import { AIServiceType } from '../AIService';
import { AIServiceHealth as AIServiceHealthType } from '../types/AIServiceTypes';

/**
 * Service for monitoring the health of AI services
 */
export class AIServiceHealthMonitor {
  private static healthStatus: AIServiceHealthType = {
    investment: true,
    regulatory: true,
    innovation: true,
    knowledge: true,
    policy: true,
    challenge: true,
    support: true,
    clinical: true,
    events: true,
    admin: true,
    compliance: true,
    community: true,
    overall: true
  };

  static getServiceHealth(): AIServiceHealthType {
    return { ...this.healthStatus };
  }

  static updateServiceHealth(
    service: keyof AIServiceHealthType,
    isHealthy: boolean
  ): void {
    this.healthStatus[service] = isHealthy;
    this.recalculateOverallHealth();
  }

  private static recalculateOverallHealth(): void {
    const serviceKeys = Object.keys(this.healthStatus).filter(
      key => key !== 'overall'
    ) as (keyof AIServiceHealthType)[];
    
    const unhealthyServices = serviceKeys.filter(
      key => !this.healthStatus[key]
    );
    
    // If 30% or more services are unhealthy, mark overall as unhealthy
    this.healthStatus.overall = unhealthyServices.length / serviceKeys.length < 0.3;
  }

  static async checkHealth(): Promise<AIServiceHealthType> {
    // In a real implementation, we would ping each service
    // For now, just return the current status
    return this.getServiceHealth();
  }
}
