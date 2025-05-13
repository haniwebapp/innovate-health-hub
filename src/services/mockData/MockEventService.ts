
import { toast } from "sonner";

// Sample event data
const mockEvents = [
  {
    id: "1",
    title: "Healthcare Innovation Summit",
    description: "Annual gathering of healthcare innovators and industry leaders",
    eventType: "conference",
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 17),
    location: "Riyadh International Convention Center",
    isVirtual: false,
    featured: true,
    presenter: "Dr. Mohammed Al-Zahrani",
    presenterTitle: "Director of Health Innovation",
    presenterOrganization: "Ministry of Health",
    category: "Innovation",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Digital Health Webinar Series",
    description: "Weekly webinar focusing on digital transformation in healthcare",
    eventType: "webinar",
    startDate: new Date(2025, 4, 20),
    endDate: new Date(2025, 4, 20),
    isVirtual: true,
    eventUrl: "https://example.com/webinar",
    presenter: "Sarah Johnson",
    presenterTitle: "Digital Health Expert",
    presenterOrganization: "Global Health Tech",
    category: "Digital Health",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Regulatory Compliance Workshop",
    description: "Hands-on workshop for healthcare innovators on regulatory requirements",
    eventType: "workshop",
    startDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 3, 10),
    location: "Innovation Hub, Jeddah",
    isVirtual: false,
    presenter: "Ahmad Khalid",
    presenterTitle: "Regulatory Affairs Director",
    presenterOrganization: "Healthcare Regulatory Authority",
    category: "Regulatory",
    status: "completed",
    recordingUrl: "https://example.com/recordings/regulatory-workshop"
  }
];

export class MockEventService {
  /**
   * Generates mock event data
   */
  static async generateMockEvents(): Promise<number> {
    // In a real app, this would save to a database
    return mockEvents.length;
  }
}
