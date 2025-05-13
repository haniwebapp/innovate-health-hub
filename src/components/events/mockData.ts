
import { Event } from "@/types/events";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Healthcare Innovation Summit",
    description: "Annual gathering of healthcare innovators and industry leaders to discuss emerging trends and solutions for the Saudi healthcare system.",
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
    status: "upcoming",
    maxAttendees: 500,
    tags: ["innovation", "leadership", "digital health"]
  },
  {
    id: "2",
    title: "Digital Health Webinar Series",
    description: "Weekly webinar focusing on digital transformation in healthcare with expert speakers from around the globe.",
    eventType: "webinar",
    startDate: new Date(2025, 4, 20),
    endDate: new Date(2025, 4, 20),
    isVirtual: true,
    eventUrl: "https://example.com/webinar",
    presenter: "Sarah Johnson",
    presenterTitle: "Digital Health Expert",
    presenterOrganization: "Global Health Tech",
    category: "Digital Health",
    status: "upcoming",
    maxAttendees: 1000,
    tags: ["digital health", "telemedicine", "health tech"]
  },
  {
    id: "3",
    title: "Regulatory Compliance Workshop",
    description: "Hands-on workshop for healthcare innovators on regulatory requirements and how to navigate approval processes.",
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
    recordingUrl: "https://example.com/recordings/regulatory-workshop",
    maxAttendees: 50,
    tags: ["regulatory", "compliance", "medical devices"]
  },
  {
    id: "4",
    title: "Investment Roundtable for Healthcare Startups",
    description: "Exclusive roundtable connecting healthcare innovators with potential investors and venture capital firms.",
    eventType: "networking",
    startDate: new Date(2025, 6, 5),
    endDate: new Date(2025, 6, 5),
    location: "King Abdullah Financial District, Riyadh",
    isVirtual: false,
    presenter: "Khalid Al-Saud",
    presenterTitle: "Managing Partner",
    presenterOrganization: "Saudi Health Ventures",
    category: "Investment",
    status: "upcoming",
    maxAttendees: 30,
    tags: ["investment", "venture capital", "startups"]
  },
  {
    id: "5",
    title: "AI in Healthcare Symposium",
    description: "Comprehensive overview of artificial intelligence applications in healthcare diagnostics, treatment, and operations.",
    eventType: "symposium",
    startDate: new Date(2025, 7, 12),
    endDate: new Date(2025, 7, 13),
    location: "King Fahd Medical City, Riyadh",
    isVirtual: false,
    featured: true,
    presenter: "Dr. Fatima Al-Otaibi",
    presenterTitle: "AI Research Director",
    presenterOrganization: "Saudi Health AI Institute",
    category: "Technology",
    status: "upcoming",
    maxAttendees: 200,
    tags: ["AI", "machine learning", "diagnostics"]
  },
  {
    id: "6",
    title: "Telehealth Implementation Masterclass",
    description: "Practical masterclass on implementing telehealth solutions in healthcare organizations across the Kingdom.",
    eventType: "masterclass",
    startDate: new Date(2025, 4, 5),
    endDate: new Date(2025, 4, 6),
    location: "Online",
    isVirtual: true,
    eventUrl: "https://example.com/telehealth-masterclass",
    presenter: "Dr. Noor Hassan",
    presenterTitle: "Telehealth Program Lead",
    presenterOrganization: "National Digital Health Center",
    category: "Digital Health",
    status: "upcoming",
    maxAttendees: 100,
    tags: ["telehealth", "implementation", "healthcare delivery"]
  }
];

// You can add more mock data structures as needed
export const mockEventRegistrations = [
  {
    eventId: "1",
    userId: "user-123",
    registrationDate: new Date(2025, 5, 1),
    attended: false
  },
  {
    eventId: "3",
    userId: "user-456",
    registrationDate: new Date(2025, 3, 1),
    attended: true,
    feedback: "Excellent workshop with practical insights",
    rating: 5
  }
];
