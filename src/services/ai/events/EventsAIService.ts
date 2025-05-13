
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';
import { EventRecommendation } from '@/types/eventTypes';

export class EventsAIService implements AIService {
  serviceType = AIServiceType.Events;

  constructor() {}

  static getInstance(): EventsAIService {
    return new EventsAIService();
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Events AI Service call recorded:', trace);
  }

  static async getEventRecommendations(
    userId: string,
    interests: string[],
    pastEvents: string[]
  ): Promise<EventRecommendation[]> {
    console.log(`Getting event recommendations for user ${userId} with interests:`, interests);
    
    // Mock implementation
    return [
      {
        eventId: '1',
        eventTitle: 'Healthcare Innovation Summit',
        matchScore: 95,
        matchReason: 'Based on your interest in healthcare innovation',
        eventDate: new Date().toISOString()
      },
      {
        eventId: '2',
        eventTitle: 'AI in Medical Diagnostics Workshop',
        matchScore: 87,
        matchReason: 'Aligned with your interests in AI and healthcare',
        eventDate: new Date(Date.now() + 86400000).toISOString()
      },
      {
        eventId: '3',
        eventTitle: 'Digital Health Transformation Webinar',
        matchScore: 82,
        matchReason: 'Similar to events you attended previously',
        eventDate: new Date(Date.now() + 172800000).toISOString()
      }
    ];
  }
}
